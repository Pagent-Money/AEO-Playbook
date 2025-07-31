# AEO-Friendly Website Construct Guide
**Goal:** Launch an independent site that is **indexable by AI products early** and frequently cited.

## 0) Architecture & Stack
- **Framework:** Next.js (SSR) or Astro (hybrid).  
- **Content:** Markdown/MDX in a repo; programmatic pages generated from YAML/JSON.  
- **Build hooks:** on publish, update sitemap + ping indexing.  
- **CDN:** enable compression, HTTP/2/3, caching.

## 1) URL & IA (Information Architecture)
/ # Homepage (Organization schema)
/quickstart
/pricing
/security
/limits
/changelog
/docs/... # Guides & How-Tos (FAQPage/HowTo)
/integrations/{tool}
/compare/{you}-vs-{competitor}
/faq
/glossary/{term}

markdown
Copy
Edit
**Conventions:** kebab-case slugs; short, stable URLs; add anchors (`#setup`, `#pricing`, `#limits`).

## 2) robots.txt & Sitemaps
**robots.txt**
User-agent: OAI-SearchBot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: https://<domain>/sitemap.xml

markdown
Copy
Edit
**Sitemap:** include `lastmod` for all key URLs; auto-regenerate at build.

## 3) Schema.org (JSON-LD Components)
- **Organization** on `/`  
- **SoftwareApplication/Product** on product pages  
- **FAQPage** for FAQs, **HowTo** for step-by-step docs  
- Implement as reusable components injected in `<Head>`.

## 4) Content Blocks (liftable by AIs)
Each key page starts with:
- **2–4 sentence summary**  
- **Key Facts** (numbers, limits, integrations, pricing pointer)  
- “**Updated:** YYYY-MM-DD”  
Add **atomic Q&A** (≤120 words) for common queries.

## 5) Freshness & Change Management
- Maintain `/changelog` with dated entries.  
- Add visible “Updated” stamps at top of pages.  
- On deploy: update sitemap `lastmod` and **trigger indexing** (e.g., IndexNow/host integration).

## 6) Performance & HTML Hygiene
- Ship clean semantic HTML (proper headings, lists, tables).  
- Budget: TTFB < 200ms (cached), LCP < 2.5s, CLS ~ 0.  
- Avoid rendering key info as images only; provide HTML equivalents.

## 7) Anchors & Deep Links
- Provide stable IDs for sections you want cited (e.g., `id="pricing"`).  
- Add a small “copy link” UI next to H2s.

## 8) Programmatic Pages
- **Integrations:** generate from a list of tools (name, logo, steps, limits).  
- **Compare:** generate from a matrix of criteria and metrics.  
- **Glossary:** terms with 60–100 word definitions + one source link.

## 9) Analytics & Bot Observability
- **Segments:** track referrals from `chat.openai.com`, `copilot.microsoft.com`, `perplexity.ai`.  
- **UTMs:** standardize `utm_source=assistant&utm_medium=organic`.  
- **Logs:** store user-agents; alert on changes in **OAI/GPT/Perplexity** crawl rates.

## 10) Security & Trust Surfaces
- `/security`: encryption, compliance status, data handling.  
- `/privacy`, `/terms`, `/status` (link to status page).  
- Keep these pages indexable and updated.

## 11) Pre-Launch Checklist
- [ ] robots.txt allows AI crawlers  
- [ ] Sitemap valid with `lastmod`  
- [ ] Schema valid on all key templates  
- [ ] Answer-first headers + Key Facts on key pages  
- [ ] Anchors present (`#setup`, `#pricing`, `#limits`)  
- [ ] Changelog live and dated  
- [ ] Perf budget met on mobile  
- [ ] Analytics + bot logs verified

## 12) Post-Launch Routine
- **Weekly:** ship/refresh 2 atomic Q&A sections; review bot logs.  
- **Biweekly:** add/refresh one integration or compare page.  
- **Monthly:** run LLM panel test on 30 queries; update SOV dashboard.  
- **Quarterly:** schema/anchors/perf audit; prune stale content.

---

### Snippets

**SoftwareApplication JSON-LD**
```html
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"SoftwareApplication",
  "name":"<Your Product>",
  "applicationCategory":"AIApplication",
  "operatingSystem":"Web",
  "url":"https://<domain>/",
  "description":"<value prop>",
  "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
  "brand":{"@type":"Brand","name":"<Your Brand>"},
  "sameAs":["https://github.com/<org>","https://www.wikidata.org/wiki/<QID>"]
}
</script>
FAQPage JSON-LD (fragment)

html
Copy
Edit
<script type="application/ld+json">
{
 "@context":"https://schema.org",
 "@type":"FAQPage",
 "mainEntity":[
  {"@type":"Question","name":"What does <Product> do?",
   "acceptedAnswer":{"@type":"Answer","text":"<90–120 words>"}}
 ]
}
</script>
robots.txt (copy/paste)

makefile
Copy
Edit
User-agent: OAI-SearchBot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /
Sitemap: https://<domain>/sitemap.xml
Sitemap URL block

xml
Copy
Edit
<url>
  <loc>https://<domain>/integrations/<tool></loc>
  <lastmod>2025-07-31</lastmod>
  <changefreq>weekly</changefreq>
</url>
yaml
Copy
Edit

---

If you want, I can tailor both files to your product (names, target queries, integration list) and generate stubs for `/integrations`, `/compare`, and `/quickstart` that you can expand directly in Cursor.
::contentReference[oaicite:0]{index=0}