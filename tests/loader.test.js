/**
 * Tests for Show Loader functionality
 * Run with: npm test
 */

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Universal Show Loader', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    // Load the HTML file
    const html = fs.readFileSync(
      path.join(__dirname, '../code/loaders/universal_show_loader_v1.6_optimized.html'),
      'utf8'
    );

    // Create a JSDOM instance
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable'
    });

    window = dom.window;
    document = window.document;

    // Mock fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Configuration', () => {
    test('should use default configuration when window globals not set', () => {
      expect(window.CONFIG).toBeDefined();
      expect(window.CONFIG.tagLinkBase).toBe('/filtered-shows?tag=');
    });

    test('should allow overriding configuration via window globals', () => {
      window.SHOW_DATA_URL = 'https://custom.com/data.json';
      window.TAG_LINK_BASE = '/custom-tags?tag=';

      // Reload config
      expect(window.SHOW_DATA_URL).toBe('https://custom.com/data.json');
    });
  });

  describe('Sanitization', () => {
    test('sanitizeText should escape HTML entities', () => {
      const result = window.sanitizeText('<script>alert("xss")</script>');
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;');
    });

    test('sanitizeHTML should remove script tags', () => {
      const html = '<p>Hello</p><script>alert("xss")</script>';
      const result = window.sanitizeHTML(html);
      expect(result).toContain('<p>Hello</p>');
      expect(result).not.toContain('<script>');
    });

    test('sanitizeHTML should remove event handlers', () => {
      const html = '<button onclick="alert(1)">Click</button>';
      const result = window.sanitizeHTML(html);
      expect(result).not.toContain('onclick');
    });
  });

  describe('Data Fetching', () => {
    test('should use cached data if available', async () => {
      const mockData = [{ title: 'Test Show', page_slug: 'test-show' }];
      window.SHOW_DATA = mockData;

      const data = await window.fetchShows();
      expect(data).toEqual(mockData);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    test('should fetch data from API', async () => {
      const mockData = [{ title: 'Test Show', page_slug: 'test-show' }];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const data = await window.fetchShows();
      expect(data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { 'Accept': 'application/json' }
        })
      );
    });

    test('should retry on failure', async () => {
      const mockData = [{ title: 'Test Show' }];

      // Fail twice, then succeed
      global.fetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData
        });

      const data = await window.fetchShows();
      expect(data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    test('should throw after max retries', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      await expect(window.fetchShows()).rejects.toThrow('Failed to load show data');
      expect(global.fetch).toHaveBeenCalledTimes(4); // Initial + 3 retries
    });
  });

  describe('Component Building', () => {
    test('createTagPill should create a link element', () => {
      const pill = window.createTagPill('drums');

      expect(pill.tagName).toBe('A');
      expect(pill.className).toBe('tag-pill');
      expect(pill.href).toContain('drums');
      expect(pill.textContent).toBe('drums');
    });

    test('buildHero should create hero section with show data', () => {
      const show = {
        title: 'Test Show',
        tagline: 'Amazing performance',
        tags: ['drums', 'led'],
        imageurl: 'https://example.com/image.jpg'
      };

      const hero = window.buildHero(show);

      expect(hero.className).toBe('hero');
      expect(hero.textContent).toContain('Test Show');
      expect(hero.textContent).toContain('Amazing performance');
      expect(hero.querySelectorAll('.tag-pill').length).toBe(2);
    });

    test('buildRelated should filter shows by matching tags', () => {
      const shows = [
        { page_slug: 'show-1', title: 'Show 1', tags: ['drums', 'led'] },
        { page_slug: 'show-2', title: 'Show 2', tags: ['dj', 'remix'] },
        { page_slug: 'show-3', title: 'Show 3', tags: ['drums', 'dj'] }
      ];

      const currentShow = shows[0];
      const related = window.buildRelated(shows, currentShow);

      expect(related).toBeTruthy();
      const cards = related.querySelectorAll('.card');
      expect(cards.length).toBe(1); // Only show-3 shares tags
    });

    test('buildRelated should return null if no related shows', () => {
      const shows = [
        { page_slug: 'show-1', title: 'Show 1', tags: ['drums'] },
        { page_slug: 'show-2', title: 'Show 2', tags: ['dj'] }
      ];

      const related = window.buildRelated(shows, shows[0]);
      expect(related).toBeNull();
    });
  });

  describe('SEO Metadata', () => {
    test('should inject title and meta tags', () => {
      const show = {
        title: 'Test Show',
        meta_title: 'Test Show - VR Creative',
        meta_description: 'This is a test show description for SEO purposes',
        imageurl: 'https://example.com/image.jpg'
      };

      window.injectMeta(show);

      expect(document.title).toBe('Test Show - VR Creative');

      const description = document.querySelector('meta[name="description"]');
      expect(description.content).toBe('This is a test show description for SEO purposes');

      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle.content).toBe('Test Show - VR Creative');
    });
  });

  describe('Error Handling', () => {
    test('showError should display error message', () => {
      window.showError('Test error message');

      const root = document.getElementById('show-root');
      expect(root.textContent).toContain('Unable to Load Show');
      expect(root.textContent).toContain('Test error message');
    });
  });
});

describe('Data Validation', () => {
  const { validateShow } = require('../scripts/validate-data');

  test('should pass validation for valid show data', () => {
    const show = {
      title: 'Test Show',
      meta_title: 'Test Show Meta',
      meta_description: 'This is a valid meta description that is exactly one hundred and fifty characters long to meet the SEO requirements for meta description length.',
      page_slug: 'test-show',
      tags: ['drums', 'led', 'interactive', 'high-energy', 'performance', 'corporate-entertainment'],
      imageurl: 'https://example.com/image.jpg',
      tagline: 'Test tagline',
      full_bio: 'Full bio here'
    };

    const approvedTags = ['drums', 'led', 'interactive', 'high-energy', 'performance', 'corporate-entertainment'];
    const { errors, warnings } = validateShow(show, approvedTags, 1);

    expect(errors.length).toBe(0);
  });

  test('should fail validation for invalid slug', () => {
    const show = {
      title: 'Test Show',
      page_slug: 'Test_Show!',
      tags: ['drums'],
      meta_title: 'Test',
      meta_description: 'A'.repeat(150)
    };

    const { errors } = validateShow(show, ['drums'], 1);
    expect(errors.some(e => e.includes('page_slug'))).toBe(true);
  });

  test('should warn for insufficient tags', () => {
    const show = {
      title: 'Test Show',
      meta_title: 'Test',
      meta_description: 'A'.repeat(150),
      page_slug: 'test-show',
      tags: ['drums', 'led'], // Only 2 tags
      imageurl: 'https://example.com/image.jpg'
    };

    const { warnings } = validateShow(show, ['drums', 'led'], 1);
    expect(warnings.some(w => w.includes('tags'))).toBe(true);
  });
});
