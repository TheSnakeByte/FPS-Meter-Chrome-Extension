chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
        url: "installed/installed.html"
      });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      chrome.tabs.create({
        url: "updated/updated.html"
      });
    }
  });