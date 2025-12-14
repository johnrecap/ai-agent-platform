/**
 * Agent Models Configuration
 * Available AI models for agents
 */

export const AGENT_MODELS = [
    {
        value: 'gemini-2.5-flash',
        label: 'Gemini 2.5 Flash (سريع وفعال)',
        labelEn: 'Gemini 2.5 Flash (Fast & Efficient)'
    },
    {
        value: 'gemini-2.5-flash-thinking',
        label: 'Gemini 2.5 Flash Thinking (تفكير)',
        labelEn: 'Gemini 2.5 Flash Thinking'
    },
    {
        value: 'gemini-pro',
        label: 'Gemini Pro (مهام معقدة)',
        labelEn: 'Gemini Pro (Complex Tasks)'
    }
];

export const DEFAULT_MODEL = 'gemini-2.5-flash';
export const DEFAULT_TEMPERATURE = 0.7;
