/**
 * Excel Upload Controller
 * AI Agent Platform
 */

const excelService = require('../services/excelService');

/**
 * Upload and process Excel file
 * @route POST /api/conversations/upload-excel
 * @access Private
 */
const uploadExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const { agentId } = req.body;
        const userId = req.user.id;

        // Parse Excel file
        const data = excelService.parseExcelFile(req.file.buffer);

        // Validate data
        const validation = excelService.validateExcelData(data);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Excel format',
                errors: validation.errors
            });
        }

        // Import conversations
        const result = await excelService.importConversations(
            data,
            userId,
            agentId
        );

        res.json({
            success: true,
            message: 'Excel uploaded successfully',
            data: result
        });
    } catch (error) {
        console.error('Excel upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload Excel',
            error: error.message
        });
    }
};

/**
 * Download Excel template
 * @route GET /api/conversations/excel-template
 * @access Private
 */
const downloadTemplate = async (req, res) => {
    try {
        const buffer = excelService.generateTemplate();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=conversations_template.xlsx');

        res.send(buffer);
    } catch (error) {
        console.error('Template download error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate template',
            error: error.message
        });
    }
};

module.exports = {
    uploadExcel,
    downloadTemplate
};
