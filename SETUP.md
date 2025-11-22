# SEO Codex Setup Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Git
- Access to VR Creative Group's Google Sheets (Shows_Master)
- Text editor (VS Code recommended)

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd seo-codex
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your actual configuration:
- **SHOWS_DATA_URL**: Your Google Sheets JSON endpoint
- **GOOGLE_SHEETS_API_KEY**: API key for Google Sheets (if using API)
- **SITE_BASE_URL**: Your production domain

### 4. Google Sheets Setup

#### Option A: Publish to Web (Recommended for testing)

1. Open your Shows_Master spreadsheet
2. File → Share → Publish to web
3. Choose "Shows_Master" sheet
4. Format: CSV or JSON (if available via Google Visualization API)
5. Copy the URL and add to `.env` as `SHOWS_DATA_URL`

#### Option B: Google Sheets API (Production)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create credentials (API Key or Service Account)
5. Add credentials to `.env`

### 5. Verify Setup

```bash
npm test
npm run validate
```

## Project Structure

```
seo-codex/
├── code/loaders/          # Production HTML loaders
├── tag-system/            # Tag taxonomy and rules
├── metadata/              # SEO metadata templates
├── brand/                 # Brand identity system
├── gospel/                # SEO strategy foundation
├── workflow/              # Operational processes
├── prompts/               # AI automation prompts
├── scripts/               # Validation and build scripts
└── tests/                 # Test suite
```

## Development Workflow

### Local Testing

1. Start a local server:
```bash
npm run serve
```

2. Open `http://localhost:8000` in your browser
3. Navigate to `/code/loaders/universal_show_loader_latest.html?slug=your-show-slug`

### Data Validation

Validate your Shows_Master data against the schema:

```bash
npm run validate
```

### Code Quality

Format all files:
```bash
npm run format
```

Run linter:
```bash
npm run lint
```

## Deployment

### Squarespace Integration

1. Copy the contents of the loader HTML files
2. In Squarespace: Settings → Advanced → Code Injection
3. Paste into the appropriate page's Header or Footer code injection
4. Update `window.SHOW_DATA_URL` with your production data source
5. Update `window.SHOW_SLUG` with the page's show slug

### Standalone Deployment

For standalone pages (Netlify, Vercel, etc.):

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider

3. Configure environment variables in your hosting dashboard

## Troubleshooting

### Shows not loading

- Check browser console for errors
- Verify `SHOWS_DATA_URL` is accessible
- Check CORS headers on your data source
- Ensure Shows_Master sheet structure matches `sheets/shows-master-spec.md`

### Tags not working

- Verify tags are in `tag-system/tag-registry.md`
- Check tag formatting (lowercase, hyphenated)
- Ensure 301 redirects in `tag-system/tag-map.md`

### Styling issues

- Check CSS variables in loader files
- Verify Inter font is loading
- Check browser compatibility (need modern browsers for CSS Grid)

## Next Steps

- Read `MASTER_INDEX.md` for complete system overview
- Review `gospel/gospel-3.md` for SEO strategy
- Check `workflow/daily-process.md` for operational procedures
- Explore `prompts/master-prompts.md` for automation capabilities

## Support

For questions or issues, contact the VR Creative Group technical team.
