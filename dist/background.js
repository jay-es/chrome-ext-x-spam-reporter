// @ts-check

const id = "chromeExtXSpamReporter";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id,
    title: "スパムとして報告する",
    contexts: ["page"],
    documentUrlPatterns: ["https://x.com/*"],
    // Unchecked runtime.lastError: Extensions using event pages or Service Workers cannot pass an onclick parameter to chrome.contextMenus.create. Instead, use the chrome.contextMenus.onClicked event.
    // onclick(info, tab) {
    //   chrome.tabs.sendMessage(tab.id ?? 0, "chrome-ext-x-spam-reporter");
    // },
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === id && tab?.id !== undefined) {
    chrome.tabs.sendMessage(tab.id, "chrome-ext-x-spam-reporter");
  }
});
