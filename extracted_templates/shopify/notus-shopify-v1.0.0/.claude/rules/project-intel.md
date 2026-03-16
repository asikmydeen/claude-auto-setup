# Notus Shopify Theme

## Overview
Premium Shopify theme based on Notus Design System by Creative Tim. Modern e-commerce theme with Tailwind CSS styling and Liquid templating.

## Tech Stack
- **Platform**: Shopify (Liquid template engine)
- **Styling**: Tailwind CSS (utility-first CSS)
- **JavaScript**: Vanilla JS for interactions
- **Structure**: Shopify theme architecture

## Directory Structure
```
/
├── assets/          # CSS, JS, images, fonts (33 files)
├── config/          # Theme settings schema
├── layout/          # Base layouts (theme.liquid)
├── sections/        # Reusable sections (25+ sections)
├── snippets/        # Reusable components (28 snippets)
├── templates/       # Page templates (18 templates)
└── locales/         # Translation files (34 languages)
```

## Key Components
### Sections (25+)
- Header, footer, hero, featured collections
- Product grids, blog posts, testimonials
- Newsletter, contact forms
- Image galleries, video sections

### Snippets (28)
- Product cards, collection grids
- Social sharing, meta tags
- Search bar, drawer menu
- SVG definitions, onboarding

### Templates (18)
- Homepage, collection, product, cart
- Blog, article, account pages
- 404, password, gift card, search

## Configuration
- `config/settings_schema.json` - Theme customizer settings
- `config/settings_data.json` - Current theme configuration
- Liquid variables for theme customization
- Localization support (34 languages)

## Development Workflow
1. Install Shopify CLI: `npm install -g @shopify/cli @shopify/theme`
2. Connect to store: `shopify theme dev --store=your-store.myshopify.com`
3. Edit files locally (hot reload)
4. Push to Shopify: `shopify theme push`

## Key Files
- `layout/theme.liquid` - Base HTML structure
- `sections/header.liquid` - Site header
- `sections/footer.liquid` - Site footer
- `templates/*.liquid` - Page-specific templates
- `assets/application.css` - Tailwind CSS styles
- `assets/application.js` - JavaScript functionality

## Design System
- Notus Design System components
- Tailwind CSS utility classes
- Responsive mobile-first design
- Customizable via Shopify theme editor

## Features
- Multi-language support (34 locales)
- Responsive design
- Product collections and filtering
- Blog and article pages
- Customer accounts
- Cart and checkout integration
- SEO-optimized meta tags
- Social sharing

## Shopify Theme Commands
```bash
shopify theme dev         # Start local dev server
shopify theme push        # Deploy to Shopify
shopify theme pull        # Download from Shopify
shopify theme check       # Validate theme
```

## Customization
- Theme editor in Shopify admin
- Liquid variables in templates
- CSS in assets/application.css
- Settings in config/settings_schema.json
