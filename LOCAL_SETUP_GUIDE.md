# 🏠 Local Setup Guide - SEO Codex

This guide shows you how to load and work with show data on your local machine.

## 📂 Project Structure

```
seo-codex/
├── data/                          # Your local data files
│   ├── shows-sample.json          # Sample data (provided)
│   └── shows.json                 # Your production data (add this)
├── code/loaders/                  # The loader scripts
│   ├── universal_show_loader_v1.6_optimized.html
│   ├── universal_tag_page_loader_v1.9.html
│   └── offerings_grid_v2.3.1.html
├── examples/                      # Interactive examples
│   └── data-loading-guide.html    # Visual data loading tool
└── .env                           # Environment configuration
```

## 🚀 Quick Start (3 Steps)

### Step 1: Add Your Data

You have three options:

**Option A: Use the Sample Data** (Already done! ✓)
```bash
# The sample file is already created at:
# data/shows-sample.json
```

**Option B: Add Your Own Data**
```bash
# Copy your shows data file to the data folder:
cp /path/to/your/shows.json data/shows.json
```

**Option C: Export from Google Sheets**
1. Open your Google Sheet
2. File → Download → JSON (.json)
3. Save as `data/shows.json`

### Step 2: Start Local Server

```bash
# Option A: Using npm (recommended)
npm run serve

# Option B: Using Python 3
python3 -m http.server 8000

# Option C: Using Python 2
python -m SimpleHTTPServer 8000
```

Your server will start at: **http://localhost:8000**

### Step 3: Test the Data Loading

Open in your browser:
```
http://localhost:8000/examples/data-loading-guide.html
```

This interactive tool lets you:
- ✅ Load from local files
- ✅ Load from URLs (GitHub, Google Sheets)
- ✅ Preview your data
- ✅ Test all three loading methods

## 📝 Configuration Methods

### Method 1: Using .env File (Recommended)

Create `.env` in your project root:

```env
# Local Development
SHOWS_DATA_URL=http://localhost:8000/data/shows-sample.json

# Or use your own file
# SHOWS_DATA_URL=http://localhost:8000/data/shows.json

# Site Configuration
SITE_BASE_URL=http://localhost:8000
TAG_PAGE_BASE=/filtered-shows?tag=
SHOW_PAGE_BASE=/stage-shows/

# Contact Info
BOOKING_EMAIL=booking@vrcreative.com
BOOKING_PHONE=+1-615-555-1234
```

### Method 2: Direct in HTML

Add this to your HTML page **before** loading the loader script:

```html
<!-- Set data source -->
<script>
  window.SHOW_DATA_URL = "http://localhost:8000/data/shows-sample.json";
</script>

<!-- Include loader -->
<script src="/code/loaders/universal_show_loader_v1.6_optimized.html"></script>
```

### Method 3: Pre-load Data (No Server Needed)

Embed data directly in your HTML:

```html
<script>
  // Load data from file synchronously (if using build process)
  // Or paste your JSON directly:
  window.SHOW_DATA = {
    "shows": [
      {
        "title": "Your Show",
        "meta_title": "Your Show Title",
        // ... rest of your data
      }
    ]
  };
</script>

<!-- Loader will use window.SHOW_DATA automatically -->
<script src="/code/loaders/universal_show_loader_v1.6_optimized.html"></script>
```

## 🧪 Testing Your Setup

### Test 1: Validate Your Data

```bash
# Install dependencies if you haven't
npm install

# Run validation on sample data
npm run validate

# Or validate your own file
node scripts/validate-data.js data/shows.json
```

Expected output:
```
✓ Validating data/shows.json
✓ Found 5 shows
✓ All shows passed validation
✓ All tags are in registry
✓ All slugs are unique
```

### Test 2: View Individual Show Page

Create a test file `test-show-page.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Show Page</title>
</head>
<body>
  <div id="show-container"></div>

  <script>
    // Point to your local data
    window.SHOW_DATA_URL = "http://localhost:8000/data/shows-sample.json";

    // Simulate show page URL parameter
    window.location.search = "?show=ai-dj-experience";
  </script>

  <script src="/code/loaders/universal_show_loader_v1.6_optimized.html"></script>
</body>
</html>
```

Open: `http://localhost:8000/test-show-page.html`

### Test 3: View All Shows Grid

Create `test-offerings-grid.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Offerings Grid</title>
</head>
<body>
  <div id="offerings-container"></div>

  <script>
    window.SHOW_DATA_URL = "http://localhost:8000/data/shows-sample.json";
  </script>

  <script src="/code/loaders/offerings_grid_v2.3.1.html"></script>
</body>
</html>
```

Open: `http://localhost:8000/test-offerings-grid.html`

### Test 4: View Tag Filter Page

Create `test-tag-page.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Tag Page</title>
</head>
<body>
  <div id="tag-page-container"></div>

  <script>
    window.SHOW_DATA_URL = "http://localhost:8000/data/shows-sample.json";

    // Filter by tag (e.g., ?tag=ai)
    window.location.search = "?tag=led";
  </script>

  <script src="/code/loaders/universal_tag_page_loader_v1.9.html"></script>
</body>
</html>
```

Open: `http://localhost:8000/test-tag-page.html?tag=led`

## 📊 Working with Your Own Data

### Data File Format

Your `shows.json` must follow this structure:

```json
{
  "shows": [
    {
      "title": "Show Name",                    // Required, max 60 chars
      "meta_title": "SEO Title",               // Required, max 60 chars
      "meta_description": "150 char desc...",  // Required, 140-160 chars
      "page_slug": "url-friendly-slug",        // Required, lowercase-hyphenated
      "tags": ["tag1", "tag2", "tag3"],        // Required, 5-12 tags from registry
      "tagline": "Short tagline",
      "short_description": "Brief description",
      "full_bio": "Full description...",
      "imageurl": "https://...",               // Required, HTTPS
      "imageurl2": "https://...",
      "imageurl3": "https://...",
      "videourl": "https://youtube.com/...",
      "event_type": "performance",
      "experience_type": "interactive",
      "featured": true                          // Optional boolean
    }
  ]
}
```

### Required Tags (from tag-registry.md)

Your tags must be from this approved list:
```
ai, artificial-intelligence, comedy, corporate-entertainment,
drum-performance, drums, drumline, dj, focal-opener, high-energy,
immersive, innovation, interactive, karaoke, led, live-music,
performance, remix, roaming, tech, visual
```

## 🔧 Troubleshooting

### Problem: "Failed to load show data"

**Solutions:**
1. Check that your local server is running
2. Verify the file path in `SHOW_DATA_URL`
3. Open browser console (F12) to see specific error
4. Check CORS - file must be served via HTTP, not `file://`

### Problem: "CORS policy blocked"

**Solutions:**
1. Use a local server (not opening files directly)
2. Or add data directly: `window.SHOW_DATA = {...}`

### Problem: "Invalid data format"

**Solutions:**
1. Run validation: `npm run validate`
2. Check JSON syntax with JSONLint
3. Ensure structure matches: `{ "shows": [...] }`

### Problem: Images not loading

**Solutions:**
1. Use HTTPS URLs (not HTTP)
2. Use absolute URLs (not relative paths)
3. Test URLs in browser first

## 🎯 Next Steps

1. ✅ Start your local server: `npm run serve`
2. ✅ Open the interactive guide: `http://localhost:8000/examples/data-loading-guide.html`
3. ✅ Load your data using one of the three methods
4. ✅ Validate your data: `npm run validate`
5. ✅ Create test pages to preview your shows
6. ✅ Deploy to production when ready

## 📚 Additional Resources

- **Data Spec**: `sheets/shows-master-spec.md`
- **Validation Rules**: `sheets/validation-rules.md`
- **Tag Registry**: `tag-system/tag-registry.md`
- **Loader Documentation**: Check individual loader files

## 💡 Pro Tips

1. **Use sample data first** - Test with `shows-sample.json` before using your own data
2. **Validate early** - Run `npm run validate` before testing in browser
3. **Check console** - Browser console (F12) shows helpful error messages
4. **Test incrementally** - Start with one show, then add more
5. **Keep backups** - Always keep a copy of working data files

---

Need help? Check the main README.md or open an issue on GitHub.
