**Purpose:** Ensure one URL per topic.

Rules:

* Every show has one canonical: `/stage-shows/[slug]`.
* All old slugs 301 to the new one.
* All tag pages 301 to `/filtered-shows`.
* No trailing slash.
* No uppercase.
* No query parameters except `?tag=`.
