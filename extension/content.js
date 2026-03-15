// System 0 — Content Script
// Tracks: time on page, scroll depth, domain visits

(function() {
  'use strict';

  const startTime = Date.now();
  let maxScrollDepth = 0;
  let isActive = true;

  // Track scroll depth
  function updateScrollDepth() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const depth = Math.min(1, scrollTop / scrollHeight);
      if (depth > maxScrollDepth) maxScrollDepth = depth;
    }
  }

  window.addEventListener('scroll', updateScrollDepth, { passive: true });

  // Track focus/blur for accurate time
  document.addEventListener('visibilitychange', () => {
    isActive = !document.hidden;
  });

  // Send data on page unload
  function sendData() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const url = window.location.href;
    const domain = window.location.hostname;
    
    const data = {
      type: 'BROWSING_DATA',
      url,
      domain,
      timeSpent,
      scrollDepth: Math.round(maxScrollDepth * 100) / 100,
      timestamp: new Date().toISOString(),
      title: document.title,
    };

    // Send to background script
    chrome.runtime.sendMessage(data).catch(() => {});
    
    // Also store locally
    chrome.storage.local.get(['browsingData'], (result) => {
      const existing = result.browsingData || [];
      existing.push(data);
      // Keep last 500
      if (existing.length > 500) existing.splice(0, existing.length - 500);
      chrome.storage.local.set({ browsingData: existing });
    });
  }

  // Send data periodically (every 30s) and on unload
  setInterval(sendData, 30000);
  window.addEventListener('beforeunload', sendData);

  // Send initial visit notification
  chrome.runtime.sendMessage({
    type: 'PAGE_VISIT',
    url: window.location.href,
    domain: window.location.hostname,
    title: document.title,
    timestamp: new Date().toISOString(),
  }).catch(() => {});
})();
