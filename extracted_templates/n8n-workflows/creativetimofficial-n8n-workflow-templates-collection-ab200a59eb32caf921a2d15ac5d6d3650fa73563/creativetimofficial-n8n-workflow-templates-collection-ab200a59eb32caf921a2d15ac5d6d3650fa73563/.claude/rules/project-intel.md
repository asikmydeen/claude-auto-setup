# n8n Workflow Templates Collection

## Overview
Collection of 40+ ready-to-use n8n workflow templates by Creative Tim. Focus on AI, research, RAG (Retrieval-Augmented Generation), and data analysis workflows.

## Tech Stack
- **Platform**: n8n (workflow automation)
- **AI Integration**: OpenAI, Mistral.ai, Hugging Face
- **Vector Databases**: Qdrant, Pinecone
- **Data Storage**: Baserow, NocoDB, MongoDB
- **APIs**: Google Analytics, GitHub, YouTube, TradingView, SERPBear

## Workflow Category
### AI Research, RAG & Data Analysis (40+ workflows)
- RAG chatbots with vector databases
- Document analysis and summarization
- Data extraction and insights
- Financial and tax code assistants
- YouTube comment analysis
- Trading chart analysis
- Research automation
- GitHub documentation chatbots
- Movie recommendation systems
- Web scraping with AI summarization

## Key Workflows
1. **RAG Chatbots**
   - Financial Documents Assistant (Qdrant + Mistral)
   - Tax Code Assistant (Qdrant + OpenAI)
   - Movie Recommendations (Qdrant + OpenAI)
   - GitHub API Documentation Chat (Pinecone + OpenAI)

2. **Data Analysis**
   - Google Analytics data to AI analysis → Baserow
   - SERPBear data summarization → Baserow
   - YouTube comment insights via AI
   - TradingView chart analysis

3. **Research & Automation**
   - Open Deep Research workflow
   - Autonomous AI crawler
   - Hugging Face paper summaries
   - News site scraping + summarization

4. **Vector Database Tools**
   - Big Data Analysis with vectors
   - KNN (K-Nearest Neighbors) workflows
   - Anomaly detection

## Directory Structure
```
/
└── AI_Research_RAG_and_Data_Analysis/
    ├── Build a Financial Documents Assistant.txt
    ├── Build a Tax Code Assistant.txt
    ├── Chat with GitHub API Documentation.txt
    ├── Extract insights from YouTube comments.txt
    ├── Send Google analytics data to AI.txt
    ├── Autonomous AI crawler.txt
    └── [34 more workflow files...]
```

## File Format
- Workflow files: `.txt` (n8n JSON format)
- Each file contains complete n8n workflow definition
- Import directly into n8n

## Key Technologies
### AI Models
- OpenAI GPT models
- Mistral.ai
- Hugging Face models
- OpenRouter (multi-model)

### Vector Databases
- Qdrant (vector similarity search)
- Pinecone (vector database)

### Data Storage
- Baserow (no-code database)
- NocoDB (Airtable alternative)
- MongoDB

### APIs & Services
- Google Analytics
- GitHub API
- YouTube API
- TradingView
- SERPBear
- Chrome extensions

## Usage Workflow
1. Install n8n: `npm install -g n8n` or use Docker
2. Start n8n: `n8n start`
3. Open n8n editor (http://localhost:5678)
4. Import workflow: Copy content from .txt file → Paste in n8n
5. Configure credentials (API keys, database connections)
6. Test workflow
7. Activate for production use

## Prerequisites
- n8n installation
- API keys for services (OpenAI, Mistral, etc.)
- Vector database setup (if using RAG)
- Data storage credentials (Baserow, NocoDB, etc.)

## Common Use Cases
- Customer support chatbots with RAG
- Document Q&A systems
- Data analysis automation
- Research paper summarization
- Web scraping with AI insights
- Social media analytics
- Financial data analysis
- E-commerce automation

## Integration Points
- AI APIs for natural language processing
- Vector databases for semantic search
- Web scraping for data collection
- Database storage for results
- Scheduling for automated runs
- Webhooks for real-time triggers

## Workflow Categories by Complexity
### Beginner
- Simple AI summarization
- Single API integration
- Basic data extraction

### Intermediate
- RAG chatbots
- Multi-step data analysis
- API chaining

### Advanced
- Autonomous research agents
- Vector database analytics
- Multi-model AI workflows
