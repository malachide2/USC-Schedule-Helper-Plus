chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    // Check if URL includes "ratemyprof"
    if (details.url.includes("ratemyprof")) {
      console.log("URL updated on Rate My Professors:", details.url);
  
      // Send message to content script with URL details
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { url: details.url });
      });
    }
  });
  