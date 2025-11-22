**Title:** Metadata Templates
**Version:** 1.0
**Purpose:** Provide ready-to-use metadata patterns for all content types.

## Show Page Metadata Template

* SEO title format: `{Show Title} | Corporate Entertainment in Nashville`
* Meta description format: `{Show Title} — {tagline}. Book for {event_type} in {city/venue}.`
* Canonical link: `https://[domain]/stage-shows/{slug}` (no trailing slash)
* Required tags: Nashville, Ryman, Opryland, Music City Center, America’s Got Talent
* Include JSON-LD schema matching the show type (see Schema Master)

## Tag Page Metadata Template

* Title structure: `{Tag Label} Entertainment | VR Creative`
* Description structure: `Browse {tag} shows with live search, filters, and booking support.`
* Canonical link: `https://[domain]/filtered-shows?tag={tag}`
* JSON-LD: WebPage with breadcrumb and, when relevant, a list of PerformingArtsEvent items.
* Open Graph: use the tag hub hero image and ensure `og:type` is `website`.

## Blog Metadata Template

* Excerpt: 1–2 sentences summarizing the thesis.
* SEO title: `{Blog Title} | VR Creative Insights`
* SEO description: 140–160 characters, incorporating primary keyword and location.
* Taglist: include all required global tags plus topic-specific tags.
* Schema: JSON-LD `BlogPosting` with author, datePublished, image, and canonical URL.

## YouTube Metadata Template

* Video title formula: `{Show/Topic} | VR Creative` with the primary keyword front-loaded.
* Description block: 2–3 sentences, booking CTA, and site link.
* Playlist linking: add to the matching tag-based playlist and the corporate entertainment master playlist.
* Hashtag rules: use 3–5 hashtags including `#corporateentertainment`, `#nashville`, and the primary tag.
* Pinned comment: booking CTA + link to the canonical show or tag page.
