-- Migration: Add Dify Integration Fields to Agents Table
-- Date: 2025-12-15
-- Description: Add Dify API Key, App ID, Provider Type, and Provider Config fields

-- Add new columns
ALTER TABLE agents 
ADD COLUMN IF NOT EXISTS dify_api_key VARCHAR(500) DEFAULT NULL COMMENT 'Dify Backend Service API Key (encrypted)',
ADD COLUMN IF NOT EXISTS dify_app_id VARCHAR(200) DEFAULT NULL COMMENT 'Dify Application ID',
ADD COLUMN IF NOT EXISTS provider_type VARCHAR(50) DEFAULT 'custom' COMMENT 'AI Provider Type (dify, openai, custom)',
ADD COLUMN IF NOT EXISTS provider_config JSONB DEFAULT '{}' COMMENT 'Provider-specific configuration';

-- Verify columns were added
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    column_default
FROM information_schema.columns 
WHERE table_name = 'agents' 
AND column_name IN ('dify_api_key', 'dify_app_id', 'provider_type', 'provider_config')
ORDER BY ordinal_position;

-- Optional: Add index for provider_type for faster queries
CREATE INDEX IF NOT EXISTS idx_agents_provider_type ON agents(provider_type);

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE 'Added: dify_api_key, dify_app_id, provider_type, provider_config';
END $$;
