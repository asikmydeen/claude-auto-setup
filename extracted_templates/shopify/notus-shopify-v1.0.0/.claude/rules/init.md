# Quick Start - Notus Shopify Theme

## Prerequisites
- Shopify store (partner account for development)
- Shopify CLI: `npm install -g @shopify/cli @shopify/theme`
- Node.js and npm

## Setup
```bash
shopify theme dev --store=your-store.myshopify.com
# Opens local dev server with hot reload
```

## Deploy to Shopify
```bash
shopify theme push
# Or push to specific theme: shopify theme push --theme=THEME_ID
```

## First Run
1. Install Shopify CLI globally
2. Connect to your Shopify store
3. Run `shopify theme dev` for local development
4. Edit files - changes sync automatically
5. Push to production: `shopify theme push`

## Important
- Requires Shopify store
- Liquid templating engine
- 34 language translations included
- Tailwind CSS for styling
- Customizable via Shopify admin theme editor
