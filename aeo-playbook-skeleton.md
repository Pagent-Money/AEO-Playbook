---
title: "The AEO Playbook: Answer Engine Optimization for AI Answers"
subtitle: "How to earn citations and traffic from ChatGPT, DeepSeek, Copilot, Perplexity, and AI Overviews"
author: "AEO Playbook Community"
date: "2025-01-27"
description: "A comprehensive framework for optimizing content and websites to be selected, cited, and linked by AI answer engines like ChatGPT, DeepSeek, Claude, and others."
tags: ["AEO", "Answer Engine Optimization", "SEO", "LLM", "AI Content Strategy", "ChatGPT", "DeepSeek"]
keywords: "AEO, Answer Engine Optimization, AI SEO, ChatGPT optimization, DeepSeek indexing, AI citations, generative search"
---

> **TL;DR**  
> - Optimize **passages**, not just pages.  
> - Make content **answer-first, recent, verifiable**.  
> - Ensure **AI crawlers** can index you.  
> - **Measure citations** and iterate monthly.

---

## Table of Contents
- [1. What is AEO?](#1-what-is-aeo)
- [2. How Generative Answers are Built](#2-how-generative-answers-are-built)
- [3. AEO vs Conventional SEO](#3-aeo-vs-conventional-seo)
- [4. Metrics & Measurement](#4-metrics--measurement)
- [5. Content Patterns That Win Citations](#5-content-patterns-that-win-citations)
- [6. Technical AEO (Crawlability, Schema, Anchors)](#6-technical-aeo-crawlability-schema-anchors)
- [7. Programmatic Pages & Templates](#7-programmatic-pages--templates)
- [8. Team Workflow & Cadence](#8-team-workflow--cadence)
- [9. Playbooks by Intent](#9-playbooks-by-intent)
- [10. Pre-Publish AEO Checklist](#10-pre-publish-aeo-checklist)
- [11. Appendices: Snippets & Templates](#11-appendices-snippets--templates)

---

## 1) What is AEO?
**Answer Engine Optimization (AEO)** is the practice of making your content the **best candidate** to be **selected, cited, and linked** inside AI-generated answers.

### Mental Model
```mermaid
flowchart LR
Q[User question] --> R[Retrieve candidates]
R --> S[Select liftable passages]
S --> G[Generate answer]
G --> C[Cite & link sources]
C --> U[User visits your site]
Key Principles: liftability • freshness • verifiability • entity clarity

Prompt for Cursor: “Expand this section with one paragraph explaining why each principle matters, plus one real example for our domain.”

2) How Generative Answers are Built
Retrieval: Assistants pull from web indexes + their own crawlers.

Selection: Short, specific, well-structured passages outperform long prose.

Synthesis: LLM composes; citations chosen from the most trusted, recent, clear sources.

Feedback loop: Pages that consistently help users become preferred sources.

Add a subsection: “How our competitors are being cited today” (insert findings/screenshots).

3) AEO vs Conventional SEO
Dimension	Conventional SEO	AEO
Goal	Rank pages for clicks	Get passages cited inside AI answers
Query Type	Short keywords	Conversational/multi-intent
Ranking Unit	Page	Claim/paragraph/table
Content Style	Comprehensive	Answer-first + atomic Q&A
Signals	Links, E-E-A-T	Same + freshness, schema, sourcing
Crawl Targets	Google/Bing	+ AI crawlers (OpenAI, Perplexity)
KPIs	Impressions, CTR	Citations, assistant referrals, SOV

Prompt for Cursor: “For each row, provide one tactical implication and an example sentence/block to model.”

4) Metrics & Measurement
Outcome KPIs
AI Citations/Referrals: sessions from chat.openai.com, copilot.microsoft.com, perplexity.ai, etc.

Share of Voice (SOV): For N target queries, SOV = cited_queries / N.

Top-3 Citation Rate: % of queries where we appear among first 3 sources.

Freshness Lead Time: Publish/update → first AI citation (days).

Leading Indicators
Bot Crawl Health: hits from OAI/GPT/Perplexity/Bing in logs.

Schema Coverage: % key pages with valid JSON-LD.

Liftable Sections: count of atomic Q&A, tables, and definition boxes.

Measurement Cadence
Monthly LLM Panel Test (20–50 queries)

Quarterly Content Audit (update timestamps, add anchors, prune fluff)

TODO: Define our 30 “money queries” and set baseline SOV.

5) Content Patterns That Win Citations
5.1 Answer-First Header (per page)
2–4 sentence summary

5–8 Key Facts (numbers, limits, integrations, pricing pointer)

“Updated: YYYY-MM-DD”

5.2 Atomic Q&A Blocks
H2 question as users ask it; ≤120-word answer; one number and one link.

5.3 Integration Pages (/integrations/{tool})
What you can do • 3-step setup • limits • FAQ

5.4 Compare Pages (/compare/you-vs-alt)
Evidence table (latency, caps, price) + one-sentence bottom line.

5.5 Trust Surfaces
/security, /compliance, /privacy, /status, /changelog

Prompt for Cursor: “Generate one example page for each pattern using our product.”

6) Technical AEO (Crawlability, Schema, Anchors)
robots.txt: allow reputable AI crawlers; declare sitemap.

Sitemaps: valid XML, correct lastmod, auto-updated on deploy.

Schema.org: Organization, SoftwareApplication/Product, FAQPage, HowTo.

Anchors: stable section IDs (#setup, #pricing, #limits).

Performance: fast TTFB/LCP; mobile-friendly; clean HTML.

Action: Add “AI crawlers allowed” check to CI.

7) Programmatic Pages & Templates
Integrations: generate from a YAML list of tools.

Compare: from a competitor matrix.

Glossary: from a CSV of terms + 80-word definitions.

Changelog: from release feed.

Prompt for Cursor: “Create Next.js/Astro scripts to generate these from data sources.”

8) Team Workflow & Cadence
Weekly: ship/refresh 2–3 atomic sections; verify bot crawls.

Monthly: LLM panel test; update SOV dashboard; fix gaps.

Quarterly: architecture review (schema/anchors/perf), prune stale pages.

Roles: Content Lead • Tech SEO/AEO • Analyst/PM • Engineer

9) Playbooks by Intent
Informational: definition boxes, FAQPage schema, glossary links.

Commercial: compare tables, pricing clarity, integration steps.

Transactional: quickstart, limits, security assurances.

10) Pre-Publish AEO Checklist
 Summary + Key Facts present

 At least 2 atomic Q&A blocks

 Schema valid (JSON-LD)

 Anchors added (setup/pricing/limits)

 “Updated” stamp + changelog entry

 Internal links to related pages

 One outbound source for claims

11) Appendices: Snippets & Templates
A) robots.txt
makefile
Copy
Edit
User-agent: OAI-SearchBot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
B) SoftwareApplication JSON-LD
html
Copy
Edit
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"SoftwareApplication",
  "name":"<Your Product>",
  "applicationCategory":"AIApplication",
  "operatingSystem":"Web",
  "url":"https://yourdomain.com/",
  "description":"<crisp user-focused value prop>",
  "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
  "brand":{"@type":"Brand","name":"<Your Brand>"},
  "sameAs":["https://github.com/<org>","https://www.wikidata.org/wiki/<QID>"]
}
</script>
C) Sitemap (fragment)
xml
Copy
Edit
<url>
  <loc>https://yourdomain.com/quickstart</loc>
  <lastmod>2025-07-31</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
D) AEO-Friendly Section Header (MD)
md
Copy
Edit
**Key Facts**
- Works with: <tools/APIs>
- Setup time: <n minutes>
- Pricing: see [#pricing]
- Limits: <caps/rate limits>
- Security: <brief>
- Updated: 2025-07-31
E) LLM Panel Test Protocol
Define 30–50 target queries.

Ask them in ChatGPT, Copilot, Perplexity (neutral prompts).

Record: were we cited? link target? position?

Log gaps → create/update content → retest in 14 days.