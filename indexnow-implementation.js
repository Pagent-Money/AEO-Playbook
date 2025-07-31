/**
 * IndexNow Implementation for Immediate Content Indexing
 * Based on IndexNow.org documentation: https://www.indexnow.org/documentation
 * 
 * Usage:
 * 1. Generate and host your IndexNow key
 * 2. Initialize: const indexNow = new IndexNowManager('your-key', 'yourdomain.com');
 * 3. Submit URLs: indexNow.submitURL('https://yourdomain.com/new-page.html');
 */

class IndexNowManager {
  constructor(key, host, options = {}) {
    this.key = key;
    this.host = host;
    this.options = {
      batchDelay: options.batchDelay || 5000,      // 5 second batch delay
      maxBatchSize: options.maxBatchSize || 100,    // Max URLs per batch
      retryDelay: options.retryDelay || 30000,      // 30 second retry delay
      maxRetries: options.maxRetries || 3,          // Max retry attempts
      logLevel: options.logLevel || 'info'          // Log level: 'debug', 'info', 'error'
    };
    
    this.queue = new Set();
    this.retryCount = new Map();
    this.stats = {
      submitted: 0,
      succeeded: 0,
      failed: 0,
      retried: 0
    };
    
    // IndexNow endpoints (automatically share with all participating engines)
    this.endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://search.seznam.cz/indexnow'
    ];
    
    this.log('IndexNow manager initialized', 'info', { key: this.key, host: this.host });
  }
  
  /**
   * Generate a random IndexNow key
   * @param {number} length - Key length (8-128 characters)
   * @returns {string} Hexadecimal key
   */
  static generateKey(length = 64) {
    const chars = '0123456789abcdefABCDEF';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    return key;
  }
  
  /**
   * Log messages based on log level
   */
  log(message, level = 'info', data = null) {
    if (this.options.logLevel === 'debug' || 
        (this.options.logLevel === 'info' && level !== 'debug') ||
        (this.options.logLevel === 'error' && level === 'error')) {
      const prefix = level === 'error' ? '❌' : level === 'info' ? 'ℹ️' : '🔍';
      console.log(`${prefix} [IndexNow] ${message}`, data || '');
    }
  }
  
  /**
   * Submit a single URL immediately
   * @param {string} url - URL to submit
   * @returns {Promise<Object>} Submission results
   */
  async submitURL(url) {
    this.log(`Submitting URL: ${url}`, 'info');
    return this.submitSingleURL(url);
  }
  
  /**
   * Queue URL for batch submission
   * @param {string} url - URL to queue
   */
  queueURL(url) {
    this.queue.add(url);
    this.log(`Queued URL: ${url} (queue size: ${this.queue.size})`, 'debug');
    this.scheduleSubmission();
  }
  
  /**
   * Submit multiple URLs immediately
   * @param {Array<string>} urls - URLs to submit
   * @returns {Promise<Object>} Submission results
   */
  async submitBatch(urls) {
    if (urls.length === 0) return { success: true, results: [] };
    
    if (urls.length === 1) {
      return this.submitSingleURL(urls[0]);
    }
    
    return this.submitBatchURLs(urls);
  }
  
  /**
   * Internal method: Submit single URL to all endpoints
   */
  async submitSingleURL(url) {
    const results = [];
    this.stats.submitted++;
    
    for (const endpoint of this.endpoints) {
      try {
        const response = await fetch(
          `${endpoint}?url=${encodeURIComponent(url)}&key=${this.key}`,
          { 
            method: 'GET',
            headers: {
              'User-Agent': 'AEO-IndexNow/1.0'
            }
          }
        );
        
        const result = {
          endpoint,
          url,
          status: response.status,
          success: response.status === 200 || response.status === 202,
          timestamp: new Date().toISOString()
        };
        
        if (response.status === 200) {
          this.log(`✅ ${endpoint}: URL submitted successfully`, 'info');
          this.stats.succeeded++;
        } else if (response.status === 202) {
          this.log(`⏳ ${endpoint}: URL received, validation pending`, 'info');
          this.stats.succeeded++;
        } else if (response.status === 400) {
          this.log(`❌ ${endpoint}: Bad request - check URL format`, 'error');
          this.stats.failed++;
        } else if (response.status === 403) {
          this.log(`❌ ${endpoint}: Forbidden - key validation failed`, 'error');
          this.stats.failed++;
        } else if (response.status === 422) {
          this.log(`❌ ${endpoint}: Unprocessable entity - URL doesn't belong to host`, 'error');
          this.stats.failed++;
        } else if (response.status === 429) {
          this.log(`⚠️ ${endpoint}: Too many requests - retry later`, 'error');
          this.stats.failed++;
        }
        
        results.push(result);
        
      } catch (error) {
        this.log(`❌ ${endpoint}: Network error`, 'error', error);
        this.stats.failed++;
        results.push({ 
          endpoint, 
          url, 
          error: error.message, 
          success: false,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return { success: results.some(r => r.success), results, stats: { ...this.stats } };
  }
  
  /**
   * Internal method: Submit batch of URLs
   */
  async submitBatchURLs(urls) {
    const payload = {
      host: this.host,
      key: this.key,
      urlList: urls.slice(0, 10000) // Max 10,000 URLs per request
    };
    
    const results = [];
    this.stats.submitted += urls.length;
    
    // Only use endpoints that support POST requests
    const batchEndpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow'
    ];
    
    for (const endpoint of batchEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'AEO-IndexNow/1.0'
          },
          body: JSON.stringify(payload)
        });
        
        const result = {
          endpoint,
          urlCount: urls.length,
          status: response.status,
          success: response.status === 200 || response.status === 202,
          timestamp: new Date().toISOString()
        };
        
        if (response.status === 200) {
          this.log(`✅ ${endpoint}: ${urls.length} URLs submitted successfully`, 'info');
          this.stats.succeeded += urls.length;
        } else if (response.status === 202) {
          this.log(`⏳ ${endpoint}: ${urls.length} URLs received, validation pending`, 'info');
          this.stats.succeeded += urls.length;
        } else {
          this.log(`❌ ${endpoint}: Batch submission failed (${response.status})`, 'error');
          this.stats.failed += urls.length;
        }
        
        results.push(result);
        
      } catch (error) {
        this.log(`❌ ${endpoint}: Batch submission error`, 'error', error);
        this.stats.failed += urls.length;
        results.push({ 
          endpoint, 
          urlCount: urls.length,
          error: error.message, 
          success: false,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return { success: results.some(r => r.success), results, stats: { ...this.stats } };
  }
  
  /**
   * Schedule batch submission with delay
   */
  scheduleSubmission() {
    clearTimeout(this.submitTimer);
    this.submitTimer = setTimeout(() => {
      this.processBatch();
    }, this.options.batchDelay);
  }
  
  /**
   * Process queued URLs
   */
  async processBatch() {
    if (this.queue.size === 0) return;
    
    const urls = Array.from(this.queue).slice(0, this.options.maxBatchSize);
    this.queue.clear();
    
    this.log(`Processing batch of ${urls.length} URLs`, 'info');
    
    try {
      const result = await this.submitBatch(urls);
      
      if (result.success) {
        // Clear retry counts for successful submissions
        urls.forEach(url => this.retryCount.delete(url));
      } else {
        // Handle retries for failed submissions
        this.handleRetries(urls);
      }
      
      return result;
      
    } catch (error) {
      this.log('Batch processing failed', 'error', error);
      this.handleRetries(urls);
    }
  }
  
  /**
   * Handle failed submissions with retry logic
   */
  handleRetries(urls) {
    urls.forEach(url => {
      const retries = this.retryCount.get(url) || 0;
      if (retries < this.options.maxRetries) {
        this.retryCount.set(url, retries + 1);
        this.stats.retried++;
        
        const delay = this.options.retryDelay * Math.pow(2, retries); // Exponential backoff
        this.log(`Scheduling retry ${retries + 1} for ${url} in ${delay}ms`, 'debug');
        
        setTimeout(() => {
          this.queueURL(url);
        }, delay);
      } else {
        this.log(`Max retries exceeded for URL: ${url}`, 'error');
        this.retryCount.delete(url);
      }
    });
  }
  
  /**
   * Submit changelog updates (important for AEO)
   */
  submitChangelog(changelogURL = `https://${this.host}/changelog.html`) {
    this.log('📝 Submitting changelog update', 'info');
    return this.submitURL(changelogURL);
  }
  
  /**
   * Submit sitemap updates
   */
  submitSitemap(sitemapURL = `https://${this.host}/sitemap.xml`) {
    this.log('🗺️ Submitting sitemap update', 'info');
    return this.submitURL(sitemapURL);
  }
  
  /**
   * Get submission statistics
   */
  getStats() {
    return {
      ...this.stats,
      queueSize: this.queue.size,
      retryQueue: this.retryCount.size,
      successRate: this.stats.submitted > 0 ? 
        (this.stats.succeeded / this.stats.submitted * 100).toFixed(2) + '%' : '0%'
    };
  }
  
  /**
   * Clear all queues and reset stats
   */
  reset() {
    this.queue.clear();
    this.retryCount.clear();
    clearTimeout(this.submitTimer);
    this.stats = { submitted: 0, succeeded: 0, failed: 0, retried: 0 };
    this.log('IndexNow manager reset', 'info');
  }
}

// Example usage and integration patterns

/**
 * Example 1: Basic setup and immediate submission
 */
function basicExample() {
  // Generate a key (do this once and save it)
  const key = IndexNowManager.generateKey();
  console.log(`Generated key: ${key}`);
  console.log(`Host this key at: https://yourdomain.com/${key}.txt`);
  console.log(`File content: ${key}`);
  
  // Initialize manager
  const indexNow = new IndexNowManager(key, 'yourdomain.com');
  
  // Submit a single URL immediately
  indexNow.submitURL('https://yourdomain.com/new-article.html');
  
  // Queue URLs for batch submission
  indexNow.queueURL('https://yourdomain.com/page1.html');
  indexNow.queueURL('https://yourdomain.com/page2.html');
  
  // Submit changelog update
  indexNow.submitChangelog();
}

/**
 * Example 2: WordPress/CMS integration
 */
function cmsIntegration() {
  const indexNow = new IndexNowManager('your-saved-key', 'yourdomain.com', {
    logLevel: 'info',
    batchDelay: 3000,
    maxBatchSize: 50
  });
  
  // Hook into content publishing
  function onPostPublished(postURL) {
    indexNow.queueURL(postURL);
  }
  
  function onPostUpdated(postURL) {
    indexNow.submitURL(postURL); // Immediate submission for updates
  }
  
  function onSiteUpdated() {
    // Submit both sitemap and changelog
    indexNow.submitSitemap();
    indexNow.submitChangelog();
  }
  
  // Example calls
  onPostPublished('https://yourdomain.com/new-blog-post.html');
  onPostUpdated('https://yourdomain.com/updated-page.html');
  onSiteUpdated();
}

/**
 * Example 3: Static site generator integration
 */
function staticSiteIntegration() {
  const indexNow = new IndexNowManager('your-saved-key', 'yourdomain.com');
  
  // After build process, submit all changed files
  const changedFiles = [
    'https://yourdomain.com/index.html',
    'https://yourdomain.com/about.html',
    'https://yourdomain.com/changelog.html'
  ];
  
  // Submit all changed files as batch
  indexNow.submitBatch(changedFiles).then(result => {
    console.log('Build submission result:', result);
    console.log('Final stats:', indexNow.getStats());
  });
}

/**
 * Example 4: Monitoring and analytics
 */
function monitoringExample() {
  const indexNow = new IndexNowManager('your-saved-key', 'yourdomain.com', {
    logLevel: 'debug'
  });
  
  // Submit URLs and track results
  indexNow.submitURL('https://yourdomain.com/test-page.html').then(result => {
    console.log('Submission successful:', result.success);
    console.log('Details:', result.results);
    console.log('Current stats:', indexNow.getStats());
  });
  
  // Periodic stats reporting
  setInterval(() => {
    const stats = indexNow.getStats();
    console.log('IndexNow Stats:', stats);
    
    // Send to analytics if needed
    if (typeof gtag !== 'undefined') {
      gtag('event', 'indexnow_stats', {
        'custom_parameter_submitted': stats.submitted,
        'custom_parameter_success_rate': stats.successRate
      });
    }
  }, 60000); // Report every minute
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IndexNowManager;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.IndexNowManager = IndexNowManager;
}

/* 
Quick Start Guide:

1. Generate Key:
   const key = IndexNowManager.generateKey();
   
2. Host Key File:
   Create file: https://yourdomain.com/{key}.txt
   Content: just the key string
   
3. Initialize:
   const indexNow = new IndexNowManager(key, 'yourdomain.com');
   
4. Submit URLs:
   indexNow.submitURL('https://yourdomain.com/page.html');  // Immediate
   indexNow.queueURL('https://yourdomain.com/page.html');   // Batched
   
5. Monitor:
   console.log(indexNow.getStats());
*/