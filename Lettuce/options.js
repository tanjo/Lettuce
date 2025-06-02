class LettuceOptions {
  static STORAGE_KEY = "Lettuce";
  static HASHTAG_KEY = "Lettuce.hashtag";

  constructor() {
    this.init();
  }

  save() {
    const hashtag = document.querySelector("[name='hashtag']").value;
    const data = { [LettuceOptions.HASHTAG_KEY]: hashtag };

    localStorage.setItem(LettuceOptions.STORAGE_KEY, JSON.stringify(data));
    chrome.storage.local.set({ [LettuceOptions.STORAGE_KEY]: JSON.stringify(data) })
      .then(() => console.log("Settings saved"))
      .catch(console.error);
  }

  async restore() {
    try {
      const result = await chrome.storage.local.get(LettuceOptions.STORAGE_KEY);
      if (result[LettuceOptions.STORAGE_KEY]) {
        const data = JSON.parse(result[LettuceOptions.STORAGE_KEY]);
        document.querySelector("[name='hashtag']").value = data[LettuceOptions.HASHTAG_KEY] || "";
      }
    } catch (error) {
      console.error("Error restoring settings:", error);
    }
  }

  async del() {
    try {
      await chrome.storage.local.remove(LettuceOptions.STORAGE_KEY);
      console.log("Settings deleted");
      document.querySelector("[name='hashtag']").value = "";
    } catch (error) {
      console.error("Error deleting settings:", error);
    }
  }

  init() {
    window.addEventListener("load", () => {
      document.querySelector("[name='ok']").addEventListener("click", () => this.save());
      document.querySelector("[name='del']").addEventListener("click", () => this.del());
      this.restore();
    });
  }
}

new LettuceOptions();
