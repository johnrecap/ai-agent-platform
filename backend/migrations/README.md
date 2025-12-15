# Database Migrations

This folder contains SQL migration scripts for database schema changes.

## Migration Files

### `add_dify_fields.sql`

**Date:** 2025-12-15  
**Description:** Adds Dify integration fields to the agents table

**Fields Added:**

- `dify_api_key` (VARCHAR 500) - Dify Backend Service API Key
- `dify_app_id` (VARCHAR 200) - Dify Application ID  
- `provider_type` (VARCHAR 50) - AI Provider Type (dify, openai, custom)
- `provider_config` (JSONB) - Provider-specific configuration

**How to Run:**

```bash
# On Neon Database (via Neon SQL Editor or psql)
psql -h <neon-host> -U <username> -d <database> -f add_dify_fields.sql
```

**Or via Neon Dashboard:**

1. Go to Neon Dashboard
2. Select your database
3. Open SQL Editor
4. Copy and paste the migration script
5. Run the query

## Migration Checklist

- [ ] Backup database before migration
- [ ] Review migration script
- [ ] Test on development database first
- [ ] Run on production (Neon)
- [ ] Verify columns were added
- [ ] Update application code
- [ ] Deploy backend
- [ ] Monitor for errors

## Rollback

To rollback this migration:

```sql
ALTER TABLE agents 
DROP COLUMN IF EXISTS dify_api_key,
DROP COLUMN IF EXISTS dify_app_id,
DROP COLUMN IF EXISTS provider_type,
DROP COLUMN IF EXISTS provider_config;

DROP INDEX IF EXISTS idx_agents_provider_type;
```
