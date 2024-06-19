chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url.includes("youtube.com/watch")) {
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: resumeVideo
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes("youtube.com/watch") && changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: checkAndPauseVideo
      });
    }
  });
  
  chrome.tabs.onRemoved.addListener((tabId) => {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: pauseVideo
    });
  });
  
  chrome.windows.onFocusChanged.addListener(async (windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
      const tabs = await chrome.tabs.query({ active: true });
      tabs.forEach((tab) => {
        if (tab.url.includes("youtube.com/watch")) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: pauseVideo
          });
        }
      });
    }
  });
  
  function resumeVideo() {
    const video = document.querySelector('video');
    if (video) {
      const title = document.title.toLowerCase();
      if (!(title.includes('song') || title.includes('music') || title.includes('podcast'))) {
        video.play();
      }
    }
  }
  
  function pauseVideo() {
    const video = document.querySelector('video');
    if (video) {
      video.pause();
    }
  }
  
  function checkAndPauseVideo() {
    const video = document.querySelector('video');
    const title = document.title.toLowerCase();
    if (video && !(title.includes('song') || title.includes('music') || title.includes('podcast'))) {
      video.pause();
    }
  }
  