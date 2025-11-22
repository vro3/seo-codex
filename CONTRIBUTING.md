# Contributing to SEO Codex

Thank you for contributing to the VR Creative Group SEO Codex! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help maintain code quality and documentation standards

## Getting Started

1. Read `SETUP.md` to set up your development environment
2. Review `MASTER_INDEX.md` to understand the project structure
3. Check `gospel/gospel-3.md` for SEO principles and strategy

## Making Changes

### Before You Start

1. Create a new branch for your changes:
```bash
git checkout -b feature/your-feature-name
```

2. Make sure your environment is properly configured (see `SETUP.md`)

### Development Guidelines

#### Documentation

- All documentation files use Markdown (.md)
- Keep language clear and concise
- Include examples where helpful
- Update `version-history.md` for significant changes
- Follow existing file naming conventions (lowercase, hyphenated)

#### Code (HTML Loaders)

- Add comments for complex logic
- Include error handling for fetch operations
- Use CSS variables for theming
- Follow existing code style
- Test on multiple browsers (Chrome, Firefox, Safari)
- Ensure responsive design (mobile, tablet, desktop)

#### Tag System

- New tags must be added to `tag-system/tag-registry.md`
- Add corresponding 301 redirect to `tag-system/tag-map.md`
- Use lowercase with hyphens only
- Document tag usage in `tag-system/tag-rules.md`

#### Metadata

- Follow character limits in `metadata/metadata-core-rules.md`
- Use templates from `metadata/metadata-templates.md`
- Validate Schema.org JSON-LD with [Google's validator](https://validator.schema.org/)

### Testing Your Changes

1. **Validate data** (if you modified schemas or rules):
```bash
npm run validate
```

2. **Test loaders locally**:
```bash
npm run serve
```
Then open `http://localhost:8000/code/loaders/` in your browser

3. **Check formatting**:
```bash
npm run format
```

4. **Run linter** (if modified HTML/JS):
```bash
npm run lint
```

### Committing Changes

1. **Write clear commit messages**:
```
Add: Brief description of what you added
Fix: Brief description of what you fixed
Update: Brief description of what you updated
Docs: Brief description of documentation changes
```

2. **Commit your changes**:
```bash
git add .
git commit -m "Add: Clear description of changes"
```

### Submitting Changes

1. Push your branch:
```bash
git push origin feature/your-feature-name
```

2. Create a Pull Request with:
   - Clear description of changes
   - Why the changes were needed
   - How to test the changes
   - Screenshots (if UI changes)
   - Any breaking changes or migration notes

## Specific Contribution Areas

### Adding a New Show

1. Add show data to Shows_Master Google Sheet
2. Ensure all required fields are completed (see `sheets/shows-master-spec.md`)
3. Assign 5-12 tags from `tag-system/tag-registry.md`
4. Create a unique `page_slug` (lowercase, hyphenated)
5. Validate using `npm run validate`

### Adding a New Tag

1. Add tag to `tag-system/tag-registry.md`
2. Add 301 redirect entry to `tag-system/tag-map.md`
3. Update documentation in `tag-system/tag-rules.md` if needed
4. Apply to relevant shows in Shows_Master

### Updating Loaders

1. Modify the appropriate HTML file in `code/loaders/`
2. Update version number in file header
3. Update corresponding .md documentation in `loaders/`
4. Test with sample data
5. Document changes in `version-history.md`

### Adding Brand Assets

1. Add files to appropriate `brand/` subdirectory
2. Update `brand/brand_board.md` with references
3. Document usage in `brand/usage-guide.md`
4. Ensure SVG, PNG, and EPS formats (where applicable)

### Creating Prompts

1. Add to `prompts/master-prompts.md`
2. Include clear purpose and expected output
3. Test prompt with actual AI model
4. Document any dependencies or prerequisites

## Version Control

- We follow semantic versioning (MAJOR.MINOR.PATCH)
- Update `version-history.md` for all releases
- Tag releases in git: `git tag -a v1.0.6 -m "Release description"`

## Questions?

- Check existing documentation in the repository
- Review closed Pull Requests for similar changes
- Contact the VR Creative Group technical team

## Review Process

All contributions will be reviewed for:
- Code quality and standards compliance
- SEO best practices alignment
- Documentation completeness
- Testing and validation
- Potential conflicts with existing systems

Thank you for helping improve the SEO Codex!
