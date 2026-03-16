# Quick Start - n8n Workflow Templates

## Prerequisites
- n8n installed: `npm install -g n8n` (or Docker)
- API keys for AI services (OpenAI, Mistral, etc.)
- Vector database setup (optional, for RAG workflows)
- Data storage credentials (Baserow, NocoDB, etc.)

## Setup
```bash
# Install n8n
npm install -g n8n

# Start n8n
n8n start

# Open browser at http://localhost:5678
```

## Import Workflow
1. Open n8n editor
2. Click "+" → "Import from File" (or paste JSON)
3. Copy content from any `.txt` workflow file
4. Paste into n8n import dialog
5. Configure credentials (API keys)
6. Test workflow
7. Activate

## First Workflow
1. Start with simple workflow: "Summarize SERPBear data"
2. Add API credentials in n8n settings
3. Test with sample data
4. Review output
5. Activate for automation

## Important
- Each workflow requires specific API credentials
- Vector database workflows need Qdrant or Pinecone setup
- Some workflows require data storage (Baserow, NocoDB)
- Test before activating for production
