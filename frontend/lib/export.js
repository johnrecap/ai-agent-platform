/**
 * Data Export Utilities
 * AI Agent Platform
 */

// Export to CSV
export function exportToCSV(data, filename = 'export') {
    if (!data || data.length === 0) {
        console.warn('No data to export');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                let cell = row[header];
                if (cell === null || cell === undefined) return '';
                if (typeof cell === 'object') cell = JSON.stringify(cell);
                // Escape quotes and wrap in quotes if contains comma
                cell = String(cell).replace(/"/g, '""');
                if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(',')
        )
    ].join('\n');

    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

// Export to JSON
export function exportToJSON(data, filename = 'export') {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
}

// Export conversations to formatted text
export function exportConversations(conversations, format = 'csv') {
    const formattedData = conversations.map(conv => ({
        id: conv.id,
        title: conv.title || `Conversation ${conv.id}`,
        type: conv.conversation_type || 'general',
        messages_count: conv.messages?.length || 0,
        created_at: conv.created_at,
        messages: conv.messages?.map(m => `${m.role}: ${m.content}`).join(' | ') || ''
    }));

    if (format === 'json') {
        exportToJSON(conversations, 'conversations');
    } else {
        exportToCSV(formattedData, 'conversations');
    }
}

// Download file helper
function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: `${type};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Bulk export with progress
export async function bulkExport(fetchFunction, format = 'csv', onProgress) {
    let allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        try {
            const result = await fetchFunction(page);
            allData = [...allData, ...result.data];
            hasMore = result.hasMore;
            page++;
            onProgress?.((allData.length / result.total) * 100);
        } catch (error) {
            console.error('Export error:', error);
            hasMore = false;
        }
    }

    if (format === 'json') {
        exportToJSON(allData, 'bulk_export');
    } else {
        exportToCSV(allData, 'bulk_export');
    }

    return allData.length;
}

export default {
    exportToCSV,
    exportToJSON,
    exportConversations,
    bulkExport,
};
