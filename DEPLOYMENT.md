# Deployment Guide

This guide covers deploying the SEO Codex loaders and documentation to various platforms.

## Table of Contents

- [Squarespace Deployment](#squarespace-deployment)
- [Standalone Deployment](#standalone-deployment)
- [Google Sheets Setup](#google-sheets-setup)
- [Testing Before Production](#testing-before-production)
- [Rollback Procedures](#rollback-procedures)

---

## Squarespace Deployment

### Prerequisites

- Squarespace account with admin access
- Access to VR Creative Group Shows_Master spreadsheet
- Updated loader files from `/code/loaders/`

### Step 1: Prepare the Loader

1. Choose the appropriate loader:
   - **Show pages**: `universal_show_loader_v1.6_optimized.html`
   - **Tag pages**: `universal_tag_page_loader_v1.9.html`
   - **Offerings grid**: `offerings_grid_v2.3.1.html`

2. Open the loader file and locate the configuration section

3. Update the configuration:
```javascript
window.SHOW_DATA_URL = "YOUR_PRODUCTION_GOOGLE_SHEETS_URL";
window.SHOW_SLUG = "specific-show-slug"; // For show pages only
window.BOOKING_EMAIL = "booking@vrcreative.com";
window.BOOKING_PHONE = "+16155551234";
```

### Step 2: Inject Code into Squarespace

#### For Individual Show Pages

1. In Squarespace, navigate to the specific show page
2. Click **Settings** → **Advanced** → **Page Header Code Injection**
3. Paste the **entire HTML file contents** (including `<style>` and `<script>` tags)
4. Save and preview

#### For Tag Pages

1. Create a new page or use an existing filtered shows page
2. Settings → Advanced → Page Header Code Injection
3. Paste the tag loader code
4. Configure the page to accept `?tag=` query parameters

#### For Offerings Grid

1. Create a main offerings page
2. Inject the offerings grid loader
3. This will display all shows in a sortable grid

### Step 3: Configure Page Settings

1. **URL Slug**: Set according to `redirects/canonical-rules.md`
   - Shows: `/stage-shows/show-name`
   - Tags: `/filtered-shows?tag=tag-name`

2. **SEO Settings**: Leave blank - the loader injects these dynamically

3. **Page Title**: Use a temporary title; will be replaced by loader

### Step 4: Test

1. Visit the page in an incognito browser
2. Check browser console for errors
3. Verify:
   - ✅ Show data loads
   - ✅ Images display
   - ✅ Tags link correctly
   - ✅ CTAs work (email, phone)
   - ✅ Related shows appear
   - ✅ Meta tags injected (view page source)

---

## Standalone Deployment

For hosting on Netlify, Vercel, AWS S3, or similar platforms.

### Option A: Netlify

1. **Build the project**:
```bash
npm run build
```

2. **Create `netlify.toml`** (if not exists):
```toml
[build]
  publish = "code/loaders"
  command = "echo 'No build needed'"

[[redirects]]
  from = "/stage-shows/:slug"
  to = "/universal_show_loader_latest.html?slug=:slug"
  status = 200

[[redirects]]
  from = "/filtered-shows"
  to = "/universal_tag_page_loader_v1.9.html"
  status = 200
```

3. **Deploy**:
```bash
netlify deploy --prod
```

4. **Set environment variables** in Netlify dashboard:
   - `SHOWS_DATA_URL`
   - `BOOKING_EMAIL`
   - `BOOKING_PHONE`

### Option B: Vercel

1. **Create `vercel.json`**:
```json
{
  "routes": [
    {
      "src": "/stage-shows/(.*)",
      "dest": "/code/loaders/universal_show_loader_latest.html"
    },
    {
      "src": "/filtered-shows",
      "dest": "/code/loaders/universal_tag_page_loader_v1.9.html"
    }
  ]
}
```

2. **Deploy**:
```bash
vercel --prod
```

3. **Configure environment variables** in Vercel dashboard

### Option C: AWS S3 + CloudFront

1. **Build and optimize**:
```bash
npm run build
```

2. **Upload to S3**:
```bash
aws s3 sync code/loaders s3://your-bucket-name/ --acl public-read
```

3. **Configure CloudFront** for:
   - Query string forwarding (for `?slug=` and `?tag=`)
   - Custom error pages
   - HTTPS certificate

4. **Set up CloudFront Functions** for URL rewriting

---

## Google Sheets Setup

### Option A: Publish to Web (Quick Start)

1. Open Shows_Master spreadsheet
2. **File** → **Share** → **Publish to web**
3. Select **Shows_Master** sheet
4. Choose format: **Web page** or **CSV**
5. Click **Publish**
6. Copy the URL

**Note**: This makes the data public. For sensitive data, use Option B.

### Option B: Google Sheets API (Production)

#### 1. Create Google Cloud Project

```bash
# Visit https://console.cloud.google.com
# Create a new project: "VR-Creative-SEO"
```

#### 2. Enable APIs

1. Navigate to **APIs & Services** → **Library**
2. Enable:
   - Google Sheets API
   - Google Drive API (if needed)

#### 3. Create Credentials

**For server-side access**:

1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **Service Account**
3. Name it: `seo-loader-service-account`
4. Grant role: **Viewer** (or **Editor** if updating)
5. Create and download **JSON key file**

**IMPORTANT**: Keep this file secure! Add to `.gitignore`.

#### 4. Share Spreadsheet

1. Copy the service account email from the JSON file
2. Share Shows_Master spreadsheet with this email (Viewer access)

#### 5. Configure Application

Add to `.env`:
```
GOOGLE_SHEETS_API_KEY=<your-api-key>
GOOGLE_SHEETS_SPREADSHEET_ID=<your-spreadsheet-id>
```

Or for service account:
```
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

#### 6. Create API Endpoint

If using Google Sheets API, you'll need a backend endpoint to fetch data:

```javascript
// Example Node.js endpoint
const { google } = require('googleapis');

async function getShows() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: 'Shows_Master!A:Z',
  });

  // Transform rows to JSON
  const [headers, ...rows] = response.data.values;
  return rows.map(row => {
    const show = {};
    headers.forEach((header, i) => {
      show[header] = row[i];
    });
    return show;
  });
}
```

---

## Testing Before Production

### Pre-Deployment Checklist

- [ ] Run validation: `npm run validate`
- [ ] Test loaders locally: `npm run serve`
- [ ] Check all links work
- [ ] Verify meta tags inject correctly
- [ ] Test on mobile devices
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Check console for errors
- [ ] Verify CORS settings for data source
- [ ] Test with slow network (throttling)
- [ ] Validate Schema.org markup: https://validator.schema.org/
- [ ] Check Google PageSpeed Insights
- [ ] Test with screen reader (basic accessibility check)

### Staging Environment

1. Deploy to staging URL first
2. Test all show pages
3. Test all tag pages
4. Verify analytics tracking
5. Get stakeholder approval
6. Then deploy to production

---

## Rollback Procedures

### Squarespace Rollback

1. Go to Settings → Advanced → Page Header Code Injection
2. Click **Revisions** (if available)
3. Revert to previous version
4. Or: Paste the backup code from `/archive/`

### Netlify/Vercel Rollback

```bash
# Netlify
netlify rollback

# Vercel
vercel rollback <deployment-url>
```

### Emergency Rollback

If loaders fail catastrophically:

1. Remove code injection entirely
2. Add a static HTML fallback page
3. Display: "Shows temporarily unavailable. Email booking@vrcreative.com"

---

## Monitoring and Maintenance

### Post-Deployment Monitoring

- Check error logs daily (first week)
- Monitor Google Search Console for crawl errors
- Track Core Web Vitals
- Set up alerts for downtime
- Monitor Google Sheets API quota usage

### Regular Maintenance

- **Weekly**: Validate Shows_Master data
- **Monthly**: Review and update tags in registry
- **Quarterly**: Audit SEO performance
- **Annually**: Review and update loaders for new web standards

---

## Support

For deployment issues:
- Check browser console for JavaScript errors
- Verify CORS settings on data source
- Ensure Google Sheets are shared correctly
- Test data URL directly in browser
- Review Squarespace code injection limits

For urgent production issues, contact VR Creative Group technical team.
