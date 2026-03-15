// System 0 — Background Service Worker

// Track domain visit counts
const domainVisits = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PAGE_VISIT') {
    domainVisits[message.domain] = (domainVisits[message.domain] || 0) + 1;
    updateCognitiveState();
  }
  
  if (message.type === 'BROWSING_DATA') {
    updateCognitiveState();
  }

  if (message.type === 'GET_STATE') {
    chrome.storage.local.get(['cognitiveState', 'browsingData'], (result) => {
      sendResponse({
        cognitiveState: result.cognitiveState || null,
        recentData: (result.browsingData || []).slice(-20),
        domainVisits,
      });
    });
    return true; // async response
  }

  if (message.type === 'TRIGGER_PERSPECTIVE_SHIFT') {
    // Store request for popup to handle
    chrome.storage.local.set({ perspectiveRequest: { domain: message.domain, timestamp: Date.now() } });
    sendResponse({ ok: true });
  }
});

async function updateCognitiveState() {
  const result = await chrome.storage.local.get(['browsingData']);
  const data = result.browsingData || [];
  const recent = data.slice(-30);
  
  if (recent.length === 0) return;

  // Calculate metrics
  const domains = recent.map(d => d.domain);
  const uniqueDomains = new Set(domains).size;
  const switches = domains.filter((d, i) => i > 0 && d !== domains[i - 1]).length;
  
  const focusScore = Math.max(10, Math.min(100, 100 - (switches / Math.max(1, domains.length - 1)) * 100));
  const noveltyIndex = Math.min(1, uniqueDomains / Math.max(1, recent.length) * 3);
  
  // Echo risk from domain concentration
  const domainCounts = {};
  for (const d of domains) domainCounts[d] = (domainCounts[d] || 0) + 1;
  const maxCount = Math.max(...Object.values(domainCounts));
  const echoRisk = Math.min(1, (maxCount / domains.length) * 1.5);
  
  // Cognitive load from scroll depth and time
  const avgScroll = recent.reduce((s, d) => s + (d.scrollDepth || 0), 0) / recent.length;
  const avgTime = recent.reduce((s, d) => s + (d.timeSpent || 0), 0) / recent.length;
  const cognitiveLoad = Math.min(1, avgScroll * 0.4 + Math.min(1, avgTime / 600) * 0.6);

  const state = {
    focusScore: Math.round(focusScore),
    noveltyIndex: Math.round(noveltyIndex * 100) / 100,
    echoRisk: Math.round(echoRisk * 100) / 100,
    cognitiveLoad: Math.round(cognitiveLoad * 100) / 100,
    timestamp: new Date().toISOString(),
    dataPoints: recent.length,
  };

  await chrome.storage.local.set({ cognitiveState: state });
  
  // Update badge
  const badgeColor = focusScore > 80 ? '#34d399' : focusScore > 50 ? '#fbbf24' : '#f87171';
  chrome.action.setBadgeBackgroundColor({ color: badgeColor });
  chrome.action.setBadgeText({ text: String(Math.round(focusScore)) });
}

// Periodic cleanup
chrome.alarms.create('cleanup', { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'cleanup') {
    chrome.storage.local.get(['browsingData'], (result) => {
      const data = result.browsingData || [];
      if (data.length > 500) {
        chrome.storage.local.set({ browsingData: data.slice(-500) });
      }
    });
  }
});
