# AEO Playbook: Action Plan for Manual & Periodic Tasks

**Updated:** January 27, 2025  
**Version:** 1.0

---

## 🎯 Overview

This action plan outlines the manual actions (主动actions) and periodic maintenance tasks required to maintain and improve your website's AEO (Answer Engine Optimization) performance. These tasks complement the automated technical implementations and require human oversight for optimal results.

---

## 🚀 Immediate Setup Actions (One-time)

### Week 1: Foundation Setup

#### Day 1-2: Technical Infrastructure
- [ ] **Update robots.txt** - Add AI crawler permissions (OAI-SearchBot, GPTBot, PerplexityBot)
- [ ] **Create/update sitemap.xml** - Include all key pages with accurate lastmod timestamps
- [ ] **Implement schema markup** - Add Organization and FAQPage structured data
- [ ] **Set up analytics tracking** - Configure UTM parameters for AI referral traffic
- [ ] **Verify mobile responsiveness** - Test all pages on mobile devices
- [ ] **Performance audit** - Ensure TTFB <200ms and LCP <2.5s

#### Day 3-5: Content Optimization
- [ ] **Audit existing content** - Identify pages that need AEO optimization
- [ ] **Add answer-first summaries** - Create 2-4 sentence summaries for key pages
- [ ] **Create key facts sections** - Add 5-8 specific data points per page
- [ ] **Update timestamps** - Add visible "Updated: YYYY-MM-DD" to all pages
- [ ] **Generate atomic Q&A blocks** - Create 2-3 Q&A sections per page (≤120 words each)
- [ ] **Add stable anchor IDs** - Create #setup, #pricing, #limits anchors

#### Day 6-7: Indexing and Submission
- [ ] **Submit to search consoles** - Google Search Console, Bing Webmaster Tools
- [ ] **Request indexing** - Use Search Console's URL Inspection tool
- [ ] **IndexNow submission** - Ping IndexNow API for immediate crawling
- [ ] **Monitor initial crawls** - Check server logs for AI bot activity
- [ ] **Social media setup** - Configure Open Graph and Twitter Card metadata

---

## 📅 Weekly Actions (Every Monday)

### Content Maintenance (30 minutes)
- [ ] **Publish 2-3 new atomic Q&A sections** based on recent user questions
- [ ] **Update 1-2 existing pages** with fresh information and new timestamps
- [ ] **Review and respond to community questions** that could become FAQ content
- [ ] **Check for trending topics** in your industry for new content opportunities

### Technical Monitoring (15 minutes)
- [ ] **Review server logs** for AI crawler activity (OAI-SearchBot, GPTBot, PerplexityBot)
- [ ] **Check for crawl errors** or blocked requests from AI bots
- [ ] **Verify sitemap accessibility** and recent crawling
- [ ] **Monitor site performance** - Any degradation in load times or core web vitals

### Analytics Review (15 minutes)
- [ ] **Track AI referral traffic** from chat.openai.com, perplexity.ai, copilot.microsoft.com
- [ ] **Log new AI citations** discovered through Google Alerts or manual searches
- [ ] **Update citation tracking spreadsheet** with new mentions
- [ ] **Monitor competitor citations** for gap analysis

---

## 🗓️ Monthly Actions (First Monday of Each Month)

### Comprehensive LLM Panel Test (2 hours)
- [ ] **Prepare test query list** - 30-50 target queries relevant to your domain
- [ ] **Test across AI platforms:**
  - ChatGPT (OpenAI)
  - Perplexity AI
  - Microsoft Copilot
  - Claude (Anthropic)
  - DeepSeek Chat
  - Google AI Overviews (when available)
- [ ] **Record results:**
  - Were you cited? (Yes/No)
  - Citation position (1st, 2nd, 3rd source)
  - Link destination accuracy
  - Quote accuracy and context
- [ ] **Calculate Share of Voice (SOV)** - (Cited queries / Total test queries) × 100
- [ ] **Identify content gaps** where competitors are cited instead

### Content Strategy Review (1 hour)
- [ ] **Analyze top-performing content** - Which pages get the most AI citations?
- [ ] **Review timestamp freshness** - Update content that's >30 days old
- [ ] **Plan new atomic Q&A sections** based on gap analysis
- [ ] **Evaluate content format performance** - Tables vs. lists vs. paragraphs

### Technical Health Check (45 minutes)
- [ ] **Validate schema markup** across all pages using Google's Rich Results Test
- [ ] **Check for broken internal links** and anchor references
- [ ] **Review site performance metrics** - Core Web Vitals report
- [ ] **Audit crawl logs** for any unusual AI bot behavior
- [ ] **Update sitemap lastmod dates** for all modified content

### Competitive Intelligence (30 minutes)
- [ ] **Research competitor citations** in your target queries
- [ ] **Analyze competitor content patterns** that win citations
- [ ] **Identify new citation opportunities** based on competitor success
- [ ] **Update competitive tracking spreadsheet**

---

## 📊 Quarterly Actions (Every 3 Months)

### Comprehensive Content Audit (4 hours)
- [ ] **Review all published content** for accuracy and relevance
- [ ] **Update outdated statistics** and data points
- [ ] **Refresh timestamps** on all evergreen content
- [ ] **Add new atomic Q&A sections** based on 3 months of user questions
- [ ] **Prune underperforming content** that doesn't attract citations
- [ ] **Enhance top-performing pages** with additional detail and sources

### Technical Architecture Review (2 hours)
- [ ] **Schema markup audit** - Implement new relevant schema types
- [ ] **URL structure evaluation** - Consider reorganization for better AI understanding
- [ ] **Anchor strategy review** - Add new stable IDs for important sections
- [ ] **Performance optimization** - Address any speed or accessibility issues
- [ ] **Mobile experience audit** - Ensure optimal mobile AI crawler experience

### Strategy and Planning (3 hours)
- [ ] **Analyze 90-day citation trends** - Growth, decline, or plateaus
- [ ] **Evaluate ROI of AEO efforts** - Traffic, engagement, conversions from AI referrals
- [ ] **Plan content roadmap** for next quarter
- [ ] **Research emerging AI platforms** for optimization opportunities
- [ ] **Update target query list** based on business goals and market changes

### Programmatic Content Scaling (2 hours)
- [ ] **Generate new integration pages** from updated tool lists
- [ ] **Create comparison pages** for new competitors or features
- [ ] **Expand glossary** with new industry terms and definitions
- [ ] **Automate changelog generation** from development releases

---

## 🔧 Manual Indexing Actions

### IndexNow Submissions (As Needed)
When you publish new content or make significant updates:

```bash
# Example IndexNow submission
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "your-domain.com",
    "key": "your-indexnow-key",
    "urlList": [
      "https://your-domain.com/new-page",
      "https://your-domain.com/updated-page"
    ]
  }'
```

### Search Console Submissions
- [ ] **Submit new URLs** via Google Search Console URL Inspection
- [ ] **Request re-crawling** for updated pages
- [ ] **Monitor index coverage** reports for issues

### Direct AI Platform Engagement
- [ ] **Share content on relevant social platforms** where AI systems might discover it
- [ ] **Engage with AI-generated responses** citing your content (when appropriate)
- [ ] **Monitor and respond to** community discussions about your topic area

---

## 📈 Measurement and Tracking Setup

### Analytics Configuration (One-time)
- [ ] **Set up custom UTM parameters:**
  - `utm_source=assistant`
  - `utm_medium=ai_citation`
  - `utm_campaign=aeo_strategy`
- [ ] **Create custom segments** for AI referral traffic
- [ ] **Set up goal tracking** for AI-driven conversions
- [ ] **Configure custom dimensions** for citation tracking

### Citation Monitoring Tools
- [ ] **Google Alerts** for brand mentions in AI contexts
- [ ] **Mention tracking tools** (Mention.com, Brand24) for AI platform citations
- [ ] **Social listening** for discussions about your content in AI contexts
- [ ] **Manual periodic searches** across major AI platforms

---

## 🚨 Emergency Response Actions

### When Citations Drop
- [ ] **Immediate content audit** - Check for outdated information
- [ ] **Verify technical issues** - Crawl errors, site downtime, robot.txt problems
- [ ] **Update timestamps** on affected pages
- [ ] **Re-submit to indexing services**
- [ ] **Review competitor activity** for new content that might be outperforming yours

### When AI Platforms Change Algorithms
- [ ] **Monitor industry news** for algorithm updates
- [ ] **Test content performance** across all platforms
- [ ] **Adjust content strategy** based on new ranking factors
- [ ] **Update technical implementation** as needed

---

## 📋 Team Responsibilities

### Content Team
- Weekly Q&A creation and content updates
- Monthly LLM panel testing
- Quarterly content audits and strategy reviews

### Technical Team  
- Weekly crawler monitoring and technical health checks
- Monthly schema and performance audits
- Quarterly architecture reviews and optimization

### Analytics Team
- Weekly citation tracking and traffic analysis
- Monthly SOV calculations and reporting
- Quarterly ROI analysis and strategic recommendations

### Management
- Monthly strategy review meetings
- Quarterly goal setting and resource allocation
- Annual AEO program evaluation and planning

---

## 🎯 Success Metrics Tracking

### Weekly KPIs
- AI referral traffic volume
- New citations discovered
- Content freshness percentage
- Technical health score

### Monthly KPIs
- Share of Voice (SOV) across target queries
- Top-3 citation rate
- Average citation position
- Freshness lead time (publication to first citation)

### Quarterly KPIs
- Total AI referral traffic growth
- Citation-to-conversion rate
- Content ROI from AI channels
- Competitive citation market share

---

**Note:** This action plan should be customized based on your specific industry, resources, and business goals. Regular review and adjustment of these tasks will ensure continued AEO success as AI platforms and algorithms evolve.