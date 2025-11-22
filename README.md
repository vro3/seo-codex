# SEO Codex

**Master SEO via Codex** - VR Creative Group's comprehensive SEO and web presence documentation system.

## 🎯 What is SEO Codex?

SEO Codex is a complete documentation repository and loader system for managing corporate entertainment shows, their metadata, tags, and web presentation. It serves as the single source of truth for VR Creative Group's online presence.

## ✨ Features

- 📚 **Comprehensive Documentation** - Complete SEO strategy, brand guidelines, and technical specs
- 🚀 **Dynamic Loaders** - Production-ready HTML/CSS/JS for show pages, tag pages, and offerings grids
- 🏷️ **Tag-Based Architecture** - Scalable taxonomy system for content organization
- ✅ **Data Validation** - Automated validation scripts for data quality
- 🎨 **Brand System** - Complete visual identity documentation
- 🤖 **AI Prompts** - Automation prompts for system generation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Access to VR Creative Group's Google Sheets (Shows_Master)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd seo-codex

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your actual configuration
```

### Development

```bash
# Start local server
npm run serve

# Run validation
npm run validate

# Run tests
npm test

# Format code
npm run format
```

## 📖 Documentation

### Core Documentation

- **[MASTER_INDEX.md](MASTER_INDEX.md)** - High-level overview of all domains
- **[INDEX.md](INDEX.md)** - Quick navigation to major sections
- **[SETUP.md](SETUP.md)** - Detailed setup and installation guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions for various platforms
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributing
- **[FEEDBACK_AND_RECOMMENDATIONS.md](FEEDBACK_AND_RECOMMENDATIONS.md)** - Comprehensive analysis and roadmap

### Key Sections

#### 📋 SEO Strategy
- `/gospel/` - Foundational SEO principles and modern strategy
- `/metadata/` - SEO metadata templates and rules
- `/tag-system/` - Complete tagging infrastructure and registry
- `/redirects/` - URL canonicalization and 301 redirects

#### 💻 Production Code
- `/code/loaders/` - Production HTML loaders (show pages, tag pages, offerings grid)
- Optimized with error handling, accessibility, and XSS protection

#### 🎨 Brand Identity
- `/brand/` - Complete brand system (colors, typography, logos)
- Master brand (VRCG) + individual show brands
- Merchandise system documentation

#### 📊 Data Management
- `/sheets/` - Google Sheets specifications and validation rules
- `/scripts/` - Validation and build scripts

#### 🔄 Workflow
- `/workflow/` - Daily processes and update protocols
- `/blog-framework/` - Blog publishing system

#### 🤖 Automation
- `/prompts/` - Master AI prompts for system generation

## 🏗️ Project Structure

```
seo-codex/
├── code/loaders/              # Production HTML loaders
├── gospel/                    # SEO strategy foundation
├── tag-system/                # Tag taxonomy and rules
├── metadata/                  # SEO metadata templates
├── brand/                     # Brand identity system
│   ├── vrcg_brand/           # Master brand
│   ├── show_brands/          # Individual show identities
│   └── merch/                # Merchandise system
├── redirects/                 # URL canonicalization
├── blog-framework/            # Blog publishing system
├── sheets/                    # Google Sheets specs
├── workflow/                  # Operational processes
├── prompts/                   # AI automation prompts
├── scripts/                   # Validation and build scripts
├── tests/                     # Test suite
├── archive/                   # Deprecated versions
├── SETUP.md                   # Setup guide
├── DEPLOYMENT.md              # Deployment guide
├── CONTRIBUTING.md            # Contributing guidelines
└── FEEDBACK_AND_RECOMMENDATIONS.md  # Analysis & roadmap
```

## 🎯 Use Cases

### For Developers
- Deploy production show loaders to Squarespace
- Validate Shows_Master data before publishing
- Build new features using documented architecture
- Create automated systems using AI prompts

### For Content Managers
- Follow SEO best practices from gospel docs
- Use metadata templates for new shows
- Apply tags from the registry
- Follow daily workflow processes

### For Designers
- Reference brand guidelines for visual consistency
- Use color palettes and typography specs
- Follow logo usage guidelines
- Design merchandise using brand system

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data Source**: Google Sheets (Shows_Master)
- **CMS**: Squarespace 7.1 (primary deployment)
- **Testing**: Jest
- **Validation**: Node.js scripts
- **Version Control**: Git

## 📊 Recent Improvements (v1.0.6)

✅ **Development Infrastructure**
- Added .gitignore for security
- Created package.json for dependency management
- Added .env.example for configuration

✅ **Optimized Loaders**
- Error handling with retry logic
- XSS protection and input sanitization
- Improved accessibility (ARIA labels, keyboard support)
- Loading states and error messages
- Comprehensive inline documentation

✅ **Testing & Validation**
- Jest test structure
- Data validation scripts
- Component tests for loaders

✅ **Documentation**
- SETUP.md for getting started
- DEPLOYMENT.md for production deployment
- CONTRIBUTING.md for contribution guidelines
- FEEDBACK_AND_RECOMMENDATIONS.md with roadmap

## 🚀 Deployment

### Squarespace
```bash
# See DEPLOYMENT.md for detailed instructions
# Copy loader files to Page Header Code Injection
```

### Netlify / Vercel
```bash
npm run build
netlify deploy --prod
# Or: vercel --prod
```

### AWS S3 + CloudFront
```bash
npm run build
aws s3 sync code/loaders s3://your-bucket/
```

Full deployment instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

## ✅ Validation

Validate your Shows_Master data:

```bash
npm run validate

# Or with a JSON file
node scripts/validate-data.js path/to/shows.json
```

Validation checks:
- Title length (≤ 60 chars)
- Meta description (140-160 chars)
- Page slug format (lowercase, hyphenated)
- Tags (5-12 from registry)
- Required fields present
- No duplicate slugs

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test loader.test.js
```

## 📈 Performance

Current loader metrics:
- **Size**: ~15KB (HTML+CSS+JS combined)
- **Dependencies**: Google Sheets JSON, Inter font
- **Target FCP**: < 1.8s
- **Target LCP**: < 2.5s

## 🔒 Security

- XSS protection via input sanitization
- Environment variables for sensitive data
- No hardcoded credentials
- HTTPS enforced in production
- Regular dependency audits

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run validation: `npm run validate`
5. Run tests: `npm test`
6. Commit: `git commit -m "Add: your feature"`
7. Push: `git push origin feature/your-feature`
8. Create a Pull Request

## 📝 Version History

See [version-history.md](version-history.md) for changelog.

Current version: **1.0.6** (Optimized & Production-Ready)

## 📧 Contact

**VR Creative Group**
- Booking: booking@vrcreative.com
- Phone: +1 (615) 555-1234
- Website: vrcreative.com

## 📄 License

This project is proprietary to VR Creative Group. All rights reserved.

---

## 🎓 Learning Path

New to the project? Follow this path:

1. **Start here**: Read this README
2. **Understand the system**: Read [MASTER_INDEX.md](MASTER_INDEX.md)
3. **Set up locally**: Follow [SETUP.md](SETUP.md)
4. **Learn SEO strategy**: Read `/gospel/gospel-3.md`
5. **Explore loaders**: Check `/code/loaders/`
6. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)

## 🌟 Project Status

✅ **Production Ready**
- Core loaders optimized and tested
- Comprehensive documentation
- Validation tooling in place
- Deployment guides complete

📈 **Active Development**
- CI/CD pipeline (planned)
- Admin dashboard (planned)
- Advanced analytics (planned)

---

**Master SEO via Codex** - Built with ❤️ by VR Creative Group
