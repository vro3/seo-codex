**Purpose:** Explain how schema is used across shows, tags, blogs, and the site identity.

General rules:

* Use JSON-LD format for all schema blocks.
* Shows use event-based schema; blogs use `Article`/`BlogPosting`.
* Required fields: `name`, `description`, `image`, `url`, and `performer` (for shows).

### Show Schema (Event)
* Use for general session openers and productions that center on event delivery.
* Include performer name(s), instrumentation, duration, and production notes.
* Specify `eventAttendanceMode`, `startDate` (if relevant), and `location` when available.

### Show Schema (PerformingArtsEvent)
* Use for music, drumming, DJ, and hybrid shows.
* Include instrumentation, group_size, and any special tech requirements.
* Link `performer` to Organization schema when it represents VR Creative-owned acts.

### Organization Schema
* Define VR Creative Group identity with logo, URL, sameAs social links, and contact info (NAP).
* Reference this schema from show and blog pages via `publisher`.

### Breadcrumb Schema
* Provide the navigation trail for show pages, tag hubs, and blog posts.
* Use canonical URLs without query parameters except on tag pages where `?tag=` is required.

### Integration Instructions
* Paste schema blocks into the Show Loader and Tag Loader code blocks in Squarespace 7.1.
* Update schema items whenever titles, metadata, or performer details change.
* Align OG tags, canonical URLs, and schema URLs to avoid duplication or mismatch.
