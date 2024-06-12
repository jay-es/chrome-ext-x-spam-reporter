// @ts-check

chrome.runtime.onMessage.addListener(async (message) => {
  if (message !== "chrome-ext-x-spam-reporter") return;

  console.log("OK");
});
