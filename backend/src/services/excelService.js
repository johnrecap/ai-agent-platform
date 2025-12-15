/**
 * Excel Service
 * AI Agent Platform - Excel Upload & Processing
 */

const XLSX = require('xlsx');

class ExcelService {
    /**
     * Parse Excel file
     * @param {Buffer} fileBuffer - Excel file buffer
     * @returns {Array} - Parsed data
     */
    parseExcelFile(fileBuffer) {
        try {
            const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            return data;
        } catch (error) {
            throw new Error(`Failed to parse Excel file: ${error.message}`);
        }
    }

    /**
     * Validate Excel data structure
     * @param {Array} data - Parsed Excel data
     * @returns {Object} - Validation result
     */
    validateExcelData(data) {
        const errors = [];
        const requiredColumns = ['title', 'messages'];

        if (!data || data.length === 0) {
            return {
                valid: false,
                errors: ['Excel file is empty']
            };
        }

        // Check required columns
        const firstRow = data[0];
        const columns = Object.keys(firstRow);

        requiredColumns.forEach(col => {
            if (!columns.includes(col)) {
                errors.push(`Missing required column: ${col}`);
            }
        });

        // Validate each row
        data.forEach((row, index) => {
            if (!row.title || row.title.trim() === '') {
                errors.push(`Row ${index + 1}: Title is required`);
            }
            if (!row.messages) {
                errors.push(`Row ${index + 1}: Messages are required`);
            }
        });

        return {
            valid: errors.length === 0,
            errors,
            rowCount: data.length
        };
    }

    /**
     * Import conversations from Excel data
     * @param {Array} data - Validated Excel data
     * @param {Number} userId - User ID
     * @param {Number} agentId - Agent ID (optional)
     * @returns {Object} - Import results
     */
    async importConversations(data, userId, agentId = null) {
        const { Conversation, Message } = require('../models');
        const imported = [];
        const failed = [];

        for (let i = 0; i < data.length; i++) {
            const row = data[i];

            try {
                // Parse messages (could be JSON string or text)
                let messages = [];
                if (typeof row.messages === 'string') {
                    try {
                        messages = JSON.parse(row.messages);
                    } catch {
                        // If not JSON, treat as single message
                        messages = [{ role: 'user', content: row.messages }];
                    }
                } else if (Array.isArray(row.messages)) {
                    messages = row.messages;
                }

                // Create conversation
                const conversation = await Conversation.create({
                    user_id: userId,
                    agent_id: agentId,
                    title: row.title,
                    conversation_type: 'excel',
                    message_count: messages.length,
                    metadata: {
                        source: 'excel_upload',
                        row_number: i + 1
                    }
                });

                // Create messages
                for (const msg of messages) {
                    await Message.create({
                        conversation_id: conversation.id,
                        role: msg.role || 'user',
                        content: msg.content,
                        created_at: new Date()
                    });
                }

                imported.push(conversation.id);
            } catch (error) {
                failed.push({
                    row: i + 1,
                    title: row.title,
                    error: error.message
                });
            }
        }

        return {
            success: true,
            imported: imported.length,
            failed: failed.length,
            failedRows: failed,
            totalRows: data.length
        };
    }

    /**
     * Generate Excel template
     * @returns {Buffer} - Excel file buffer
     */
    generateTemplate() {
        const templateData = [
            {
                title: 'Sample Conversation 1',
                messages: JSON.stringify([
                    { role: 'user', content: 'Hello!' },
                    { role: 'assistant', content: 'Hi! How can I help you?' }
                ]),
                agent_id: ''
            },
            {
                title: 'Sample Conversation 2',
                messages: JSON.stringify([
                    { role: 'user', content: 'What is your name?' },
                    { role: 'assistant', content: 'I am an AI assistant.' }
                ]),
                agent_id: ''
            }
        ];

        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Conversations');

        return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    }
}

module.exports = new ExcelService();
