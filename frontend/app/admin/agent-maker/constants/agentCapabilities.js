import { Globe, Terminal, FileText } from 'lucide-react';

/**
 * Agent Capabilities Configuration
 * Available capabilities for AI agents
 */

export const AGENT_CAPABILITIES = [
    {
        key: 'webSearch',
        icon: Globe,
        label: 'بحث الويب',
        labelEn: 'Web Search',
        description: 'يسمح للـ Agent بتصفح الإنترنت للحصول على معلومات فورية',
        descriptionEn: 'Allows the agent to browse the internet for real-time information'
    },
    {
        key: 'codeInterpreter',
        icon: Terminal,
        label: 'مفسر الكود',
        labelEn: 'Code Interpreter',
        description: 'تنفيذ Python لتحليل البيانات أو إنشاء الرسوم البيانية أو حل المسائل',
        descriptionEn: 'Execute Python for data analysis, chart creation, or solving problems'
    },
    {
        key: 'fileAnalysis',
        icon: FileText,
        label: 'تحليل الملفات',
        labelEn: 'File Analysis',
        description: 'رفع PDF و CSV والصور ليقوم الـ Agent بمعالجتها',
        descriptionEn: 'Upload PDF, CSV, and images for agent processing'
    }
];

export const DEFAULT_CAPABILITIES = {
    webSearch: true,
    codeInterpreter: false,
    fileAnalysis: false
};
