/**
 * Excel Upload Controller
 * AI Agent Hosting Platform
 * 
 * Handles Excel file upload and conversation import
 */

const XLSX = require('xlsx');
const { Conversation, User, Agent } = require('../models');
const { ApiError } = require('../middleware/errorHandler');

/**
 * @route   POST /api/conversations/upload-excel
 * @desc    Upload Excel file and import conversations
 * @access  Private/Admin
 */
const uploadExcel = async (req, res, next) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            throw new ApiError(400, 'No Excel file uploaded');
        }

        const { userId, agentId, conversationType = 'general' } = req.body;

        if (!userId) {
            throw new ApiError(400, 'User ID is required');
        }

        // Verify user exists
        const user = await User.findByPk(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Detect file type
        const isCSV = req.file.originalname.toLowerCase().endsWith('.csv');

        let jsonData;

        if (isCSV) {
            // Try different encodings for CSV
            let csvContent;
            const buffer = req.file.buffer;

            // Check for BOM (Byte Order Mark) to detect encoding
            if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
                // UTF-16 LE
                csvContent = buffer.toString('utf16le').substring(1); // Skip BOM
            } else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
                // UTF-16 BE
                csvContent = buffer.slice(2).swap16().toString('utf16le');
            } else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                // UTF-8 with BOM
                csvContent = buffer.toString('utf8').substring(1);
            } else {
                // Try UTF-8 first, if fails try Windows-1256 (Arabic)
                csvContent = buffer.toString('utf8');
            }

            const workbook = XLSX.read(csvContent, { type: 'string' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });
        } else {
            // Read Excel file from buffer with codepage support for Arabic
            const workbook = XLSX.read(req.file.buffer, {
                type: 'buffer',
                codepage: 65001,  // UTF-8
                cellDates: true,
                cellNF: false,
                cellText: true
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });
        }

        if (jsonData.length === 0) {
            throw new ApiError(400, 'Excel file is empty or has no data rows');
        }

        console.log('Excel columns:', Object.keys(jsonData[0]));
        console.log('Total rows:', jsonData.length);

        const importedConversations = [];
        const errors = [];

        // Process each row
        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];

            try {
                // Find the Conversation column (last column usually, or column with JSON)
                let messagesJson = null;
                let title = `Conversation ${i + 1}`;

                // Look for conversation/messages column
                for (const [key, value] of Object.entries(row)) {
                    const keyLower = key.toLowerCase();

                    // Check for title columns
                    if (keyLower.includes('thread_id') || keyLower === 'thread' || keyLower === 'id') {
                        if (value && String(value).length < 100) {
                            title = String(value);
                        }
                    }

                    // Check for conversation/messages column
                    if (keyLower.includes('conversation') || keyLower.includes('messages')) {
                        messagesJson = value;
                    }
                }

                // If still no messages, look for the column with JSON array
                if (!messagesJson) {
                    for (const [key, value] of Object.entries(row)) {
                        const strValue = String(value);
                        if (strValue.startsWith('[{') && strValue.includes('"role"')) {
                            messagesJson = value;
                            break;
                        }
                    }
                }

                // Skip rows without messages
                if (!messagesJson) {
                    errors.push({ row: i + 2, error: 'No messages/conversation column found' });
                    continue;
                }

                // Parse messages JSON
                let messages = [];
                try {
                    messages = JSON.parse(messagesJson);

                    if (!Array.isArray(messages)) {
                        messages = [messages];
                    }

                    // Validate and clean messages
                    messages = messages.filter(msg => msg && (msg.content || msg.text))
                        .map(msg => ({
                            role: msg.role || 'user',
                            content: msg.content || msg.text || '',
                            timestamp: msg.timestamp || new Date().toISOString()
                        }));

                } catch (parseError) {
                    errors.push({ row: i + 2, error: `JSON parse error: ${parseError.message}` });
                    continue;
                }

                if (messages.length === 0) {
                    errors.push({ row: i + 2, error: 'No valid messages after parsing' });
                    continue;
                }

                // Create conversation
                const conversation = await Conversation.create({
                    user_id: parseInt(userId),
                    agent_id: agentId ? parseInt(agentId) : null,
                    title: title,
                    conversation_type: conversationType,
                    messages: messages,
                    message_count: messages.length,
                    status: 'active'
                });

                importedConversations.push({
                    id: conversation.id,
                    title: title,
                    messageCount: messages.length
                });

            } catch (rowError) {
                errors.push({ row: i + 2, error: rowError.message });
            }
        }

        res.json({
            success: true,
            message: `Successfully imported ${importedConversations.length} conversations`,
            data: {
                imported: importedConversations.length,
                failed: errors.length,
                conversations: importedConversations,
                errors: errors.slice(0, 10)
            }
        });

    } catch (error) {
        console.error('Excel upload error:', error);
        next(error);
    }
};

/**
 * @route   DELETE /api/conversations/:id
 * @desc    Delete a conversation
 * @access  Private
 */
const deleteConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findByPk(req.params.id);

        if (!conversation) {
            throw new ApiError(404, 'Conversation not found');
        }

        // Check access rights (admin or owner)
        if (req.user.role !== 'admin' && req.user.id !== conversation.user_id) {
            throw new ApiError(403, 'Access denied');
        }

        await conversation.destroy();

        res.json({
            success: true,
            message: 'Conversation deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/conversations/bulk
 * @desc    Delete multiple conversations
 * @access  Private/Admin
 */
const bulkDeleteConversations = async (req, res, next) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new ApiError(400, 'Please provide an array of conversation IDs');
        }

        // Admin only
        if (req.user.role !== 'admin') {
            throw new ApiError(403, 'Admin access required');
        }

        const deleted = await Conversation.destroy({
            where: { id: ids }
        });

        res.json({
            success: true,
            message: `Successfully deleted ${deleted} conversations`,
            deletedCount: deleted
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadExcel,
    deleteConversation,
    bulkDeleteConversations
};

