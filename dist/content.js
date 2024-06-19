// @ts-check

/**
 * @param {() => Element | null | undefined} getter
 * @returns {Promise<void>}
 */
const click = async (getter) =>
  new Promise((resolve, reject) => {
    const timerId = setInterval(() => {
      const el = getter();
      if (el instanceof HTMLElement) {
        clearInterval(timerId);
        el.click();
        resolve();
      }
    }, 300);

    setTimeout(() => {
      clearInterval(timerId);
      reject(`要素が見つかりませんでした: ${getter}`);
    }, 1_000);
  });

/**
 * @param {string} testId
 */
const getByTestId = (testId) =>
  document.querySelector(`[data-testid="${testId}"]`);

/**
 * @param {string} tag
 * @param {string} text
 */
const getByTagAndText = (tag, text) =>
  Array.from(document.querySelectorAll(tag)).find((el) =>
    el.textContent?.includes(text)
  );

chrome.runtime.onMessage.addListener(async (message) => {
  if (message !== "chrome-ext-x-spam-reporter") return;

  const tweet =
    document.activeElement?.getAttribute("data-test-id") === "tweet"
      ? document.activeElement
      : document.activeElement?.closest('[data-testid="tweet"]');

  if (!tweet) {
    return alert("対象のツイートがない");
  }

  try {
    await click(() => tweet.querySelector('[aria-label="もっと見る"]'));
    await click(() => getByTestId("report"));
    await click(() => getByTagAndText("label", "スパム"));
    await click(() => getByTestId("ChoiceSelectionNextButton"));
    await click(() => getByTagAndText("button", "さんをミュート"));

    await click(() => tweet.querySelector('[aria-label="もっと見る"]'));
    await click(() => getByTestId("report"));
    await click(() => getByTagAndText("label", "スパム"));
    await click(() => getByTestId("ChoiceSelectionNextButton"));
    await click(() => getByTagAndText("button", "さんをブロック"));

    tweet.remove();
  } catch (error) {
    alert(error);
  }
});
