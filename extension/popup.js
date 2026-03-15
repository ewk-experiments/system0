// System 0 — Popup Script

document.addEventListener('DOMContentLoaded', () => {
  // Get state from background
  chrome.runtime.sendMessage({ type: 'GET_STATE' }, (response) => {
    if (chrome.runtime.lastError || !response) {
      document.getElementById('metrics').innerHTML = '<div class="empty">Collecting data...</div>';
      return;
    }

    const state = response.cognitiveState;
    if (state) {
      document.getElementById('focus').textContent = state.focusScore;
      document.getElementById('focus-bar').style.width = state.focusScore + '%';
      
      document.getElementById('novelty').textContent = Math.round(state.noveltyIndex * 100) + '%';
      document.getElementById('novelty-bar').style.width = (state.noveltyIndex * 100) + '%';
      
      const echoEl = document.getElementById('echo');
      echoEl.textContent = Math.round(state.echoRisk * 100) + '%';
      echoEl.className = 'metric-value ' + (state.echoRisk > 0.7 ? 'red' : 'amber');
      document.getElementById('echo-bar').style.width = (state.echoRisk * 100) + '%';
      document.getElementById('echo-bar').style.background = state.echoRisk > 0.7 ? '#f87171' : '#fbbf24';
      
      document.getElementById('load').textContent = Math.round(state.cognitiveLoad * 100) + '%';
      document.getElementById('load-bar').style.width = (state.cognitiveLoad * 100) + '%';
    }

    // Recent activity
    const recentData = response.recentData || [];
    const listEl = document.getElementById('recent-list');
    
    if (recentData.length === 0) {
      listEl.innerHTML = '<div style="font-size:10px;color:#4a5c7a;padding:8px 0">Browse some pages to see activity</div>';
    } else {
      const unique = {};
      for (const d of recentData.reverse()) {
        if (!unique[d.domain]) unique[d.domain] = d;
      }
      const items = Object.values(unique).slice(0, 5);
      listEl.innerHTML = items.map(d => `
        <div class="recent-item">
          <span class="recent-domain">${d.domain}</span>
          <span class="recent-time">${d.timeSpent || 0}s</span>
        </div>
      `).join('');
    }
  });

  // Perspective shift button
  document.getElementById('perspective-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const domain = new URL(tabs[0].url).hostname;
        chrome.runtime.sendMessage({ type: 'TRIGGER_PERSPECTIVE_SHIFT', domain });
        
        const btn = document.getElementById('perspective-btn');
        btn.textContent = '✓ Shift triggered';
        btn.style.opacity = '0.7';
        setTimeout(() => {
          btn.textContent = '⚡ Trigger Perspective Shift';
          btn.style.opacity = '1';
        }, 2000);
      }
    });
  });

  // Dashboard button
  document.getElementById('dashboard-btn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://ewk-experiments.github.io/system0/dashboard' });
  });
});
