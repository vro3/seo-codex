**Title:** Legacy Slug Redirects
**Version:** 1.0
**Purpose:** Capture all legacy and mistyped show URLs and route them to the correct canonical pages.

Rules:

* Include old show names, outdated slugs, and common misspellings.
* Redirect each legacy URL to `/stage-shows/[slug]` using 301 status.
* Mirror the approved Tag Registry for any tag-style legacy paths.
* Keep a changelog when new slugs are added or retired.

Process:

1. Audit analytics and logs monthly for 404s tied to show content.
2. Add any new legacy URLs to this list and deploy redirects.
3. Confirm the destination slug matches the canonical defined in `canonical-rules.md`.
4. Retest filtered tag pages after changes to ensure tag redirects still resolve correctly.
