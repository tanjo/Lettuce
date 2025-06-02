class Lettuce {
  static openPopup(url) {
    chrome.tabs.create({ url });
  }

  static tweet(text, url, selection = "", hashtag = "") {
    const tweetUrl = new URL("https://twitter.com/intent/tweet");
    tweetUrl.searchParams.set("text", `${text} ${url}`);
    if (selection) {
      tweetUrl.searchParams.set("text", `${tweetUrl.searchParams.get("text")} "${selection}"`);
    }
    if (hashtag) {
      tweetUrl.searchParams.set("text", `${tweetUrl.searchParams.get("text")} #${hashtag}`);
    }
    this.openPopup(tweetUrl.toString());
  }

  static async getSelection(tabId) {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => window.getSelection().toString(),
    });
    return result.result;
  }

  static async getHashtag() {
    const storageKey = "Lettuce";
    const hashtagKey = "Lettuce.hashtag";
    const data = await chrome.storage.local.get([storageKey]);
    if (data[storageKey]) {
      const json = JSON.parse(data[storageKey]);
      return json?.[hashtagKey] || "";
    }
    return "";
  }

  static async handleActionClick(activeTab) {
    try {
      const selection = await this.getSelection(activeTab.id);
      const hashtag = await this.getHashtag();
      this.tweet(activeTab.title, activeTab.url, selection, hashtag);
    } catch (error) {
      console.error("Error handling action click:", error);
    }
  }
}

chrome.action.onClicked.addListener((activeTab) => Lettuce.handleActionClick(activeTab));
