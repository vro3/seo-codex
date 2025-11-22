#!/usr/bin/env node

/**
 * Data Validation Script
 * Validates Shows_Master data against the schema rules defined in sheets/shows-master-spec.md
 */

const fs = require('fs');
const path = require('path');

// Load tag registry
const TAG_REGISTRY_PATH = path.join(__dirname, '..', 'tag-system', 'tag-registry.md');

function loadTagRegistry() {
  try {
    const content = fs.readFileSync(TAG_REGISTRY_PATH, 'utf8');
    const tags = [];
    const lines = content.split('\n');
    let inTagList = false;

    for (const line of lines) {
      if (line.startsWith('* ') && inTagList) {
        tags.push(line.substring(2).trim());
      }
      if (line.includes('Approved tags')) {
        inTagList = true;
      }
      if (inTagList && line.startsWith('Usage rules:')) {
        break;
      }
    }

    return tags;
  } catch (error) {
    console.error('Error loading tag registry:', error.message);
    return [];
  }
}

// Validation rules based on sheets/validation-rules.md
const VALIDATION_RULES = {
  title: {
    required: true,
    maxLength: 60,
    validate: (value) => typeof value === 'string' && value.length > 0
  },
  meta_title: {
    required: true,
    maxLength: 60,
    validate: (value) => typeof value === 'string' && value.length > 0
  },
  meta_description: {
    required: true,
    minLength: 140,
    maxLength: 160,
    validate: (value) => typeof value === 'string' && value.length >= 140 && value.length <= 160
  },
  page_slug: {
    required: true,
    pattern: /^[a-z0-9-]+$/,
    validate: (value) => typeof value === 'string' && /^[a-z0-9-]+$/.test(value)
  },
  tags: {
    required: true,
    minCount: 5,
    maxCount: 12,
    validate: (value, approvedTags) => {
      if (!Array.isArray(value)) return false;
      if (value.length < 5 || value.length > 12) return false;
      return value.every(tag => approvedTags.includes(tag));
    }
  },
  imageurl: {
    required: true,
    validate: (value) => typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))
  }
};

function validateShow(show, approvedTags, index) {
  const errors = [];
  const warnings = [];

  // Validate title
  if (!show.title || show.title.trim().length === 0) {
    errors.push(`Show ${index}: Missing title`);
  } else if (show.title.length > 60) {
    errors.push(`Show ${index} (${show.title}): Title exceeds 60 characters (${show.title.length})`);
  }

  // Validate meta_title
  if (!show.meta_title || show.meta_title.trim().length === 0) {
    errors.push(`Show ${index} (${show.title}): Missing meta_title`);
  } else if (show.meta_title.length > 60) {
    errors.push(`Show ${index} (${show.title}): meta_title exceeds 60 characters`);
  }

  // Validate meta_description
  if (!show.meta_description) {
    errors.push(`Show ${index} (${show.title}): Missing meta_description`);
  } else if (show.meta_description.length < 140 || show.meta_description.length > 160) {
    errors.push(`Show ${index} (${show.title}): meta_description must be 140-160 chars (current: ${show.meta_description.length})`);
  }

  // Validate page_slug
  if (!show.page_slug) {
    errors.push(`Show ${index} (${show.title}): Missing page_slug`);
  } else if (!/^[a-z0-9-]+$/.test(show.page_slug)) {
    errors.push(`Show ${index} (${show.title}): page_slug must be lowercase with hyphens only (current: ${show.page_slug})`);
  }

  // Validate tags
  if (!show.tags || !Array.isArray(show.tags)) {
    errors.push(`Show ${index} (${show.title}): Missing or invalid tags array`);
  } else {
    if (show.tags.length < 5) {
      warnings.push(`Show ${index} (${show.title}): Only ${show.tags.length} tags (recommended: 5-12)`);
    } else if (show.tags.length > 12) {
      warnings.push(`Show ${index} (${show.title}): ${show.tags.length} tags exceeds recommended maximum of 12`);
    }

    // Check if tags are in registry
    show.tags.forEach(tag => {
      if (!approvedTags.includes(tag)) {
        errors.push(`Show ${index} (${show.title}): Tag "${tag}" not in tag registry`);
      }
    });
  }

  // Validate imageurl
  if (!show.imageurl) {
    warnings.push(`Show ${index} (${show.title}): Missing imageurl`);
  } else if (!show.imageurl.startsWith('http://') && !show.imageurl.startsWith('https://')) {
    errors.push(`Show ${index} (${show.title}): imageurl must be a valid URL`);
  }

  // Check for duplicate meta content
  if (show.meta_title === show.title) {
    warnings.push(`Show ${index} (${show.title}): meta_title is identical to title (should be optimized differently)`);
  }

  // Validate other recommended fields
  if (!show.tagline) {
    warnings.push(`Show ${index} (${show.title}): Missing tagline`);
  }
  if (!show.full_bio) {
    warnings.push(`Show ${index} (${show.title}): Missing full_bio`);
  }

  return { errors, warnings };
}

function checkDuplicateSlugs(shows) {
  const slugs = new Map();
  const errors = [];

  shows.forEach((show, index) => {
    if (show.page_slug) {
      if (slugs.has(show.page_slug)) {
        errors.push(`Duplicate page_slug "${show.page_slug}" found in shows: ${slugs.get(show.page_slug)} and ${index + 1}`);
      } else {
        slugs.set(show.page_slug, index + 1);
      }
    }
  });

  return errors;
}

function validateData(showsData) {
  console.log('🔍 Starting data validation...\n');

  const approvedTags = loadTagRegistry();
  console.log(`✓ Loaded ${approvedTags.length} approved tags from registry\n`);

  let totalErrors = 0;
  let totalWarnings = 0;

  // Validate each show
  showsData.forEach((show, index) => {
    const { errors, warnings } = validateShow(show, approvedTags, index + 1);

    errors.forEach(error => console.error(`❌ ${error}`));
    warnings.forEach(warning => console.warn(`⚠️  ${warning}`));

    totalErrors += errors.length;
    totalWarnings += warnings.length;
  });

  // Check for duplicate slugs
  const slugErrors = checkDuplicateSlugs(showsData);
  slugErrors.forEach(error => console.error(`❌ ${error}`));
  totalErrors += slugErrors.length;

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total shows validated: ${showsData.length}`);
  console.log(`Errors: ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);

  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('\n✅ All validation checks passed!');
    return 0;
  } else if (totalErrors === 0) {
    console.log('\n✅ No errors found, but there are warnings to address.');
    return 0;
  } else {
    console.log('\n❌ Validation failed. Please fix the errors above.');
    return 1;
  }
}

// Main execution
if (require.main === module) {
  console.log('SEO Codex Data Validator\n');
  console.log('Note: This validator needs actual show data to validate.');
  console.log('To use: node validate-data.js <path-to-shows.json>\n');

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('ℹ️  No data file provided. Running dry-run validation test...\n');

    // Sample test data
    const testData = [
      {
        title: 'Test Show',
        meta_title: 'Test Show for Corporate Events',
        meta_description: 'Experience an amazing test show with incredible energy and world-class performers. Perfect for corporate events in Nashville and beyond for unforgettable entertainment.',
        page_slug: 'test-show',
        tags: ['corporate-entertainment', 'high-energy', 'interactive', 'live-music', 'performance', 'innovation'],
        imageurl: 'https://example.com/image.jpg',
        tagline: 'An amazing test show',
        full_bio: 'This is a full bio for the test show.'
      }
    ];

    const exitCode = validateData(testData);
    process.exit(exitCode);
  } else {
    try {
      const dataPath = path.resolve(args[0]);
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const shows = Array.isArray(data) ? data : data.shows || [];

      const exitCode = validateData(shows);
      process.exit(exitCode);
    } catch (error) {
      console.error(`❌ Error reading data file: ${error.message}`);
      process.exit(1);
    }
  }
}

module.exports = { validateData, validateShow };
