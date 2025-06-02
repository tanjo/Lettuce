function openPopup(url) {
  chrome.tabs.create({ url : url });
}

function tweet(text, url, selection, hashtag) {
  if (selection === undefined) {
    selection = "";
  }
  if (hashtag === undefined) {
    hashtag = "";
  }
  var tweet_url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "%20" + encodeURIComponent(url);
  if (selection !== "") {
    tweet_url += "%20%22" + encodeURIComponent(selection) + "%22";
  }
  if (hashtag !== "") {
    tweet_url += "%20%23" + encodeURIComponent(hashtag);
  }
  openPopup(tweet_url);
}

function getSelection() {
  return window.getSelection().toString();
}

chrome.action.onClicked.addListener((activeTab) => {
  chrome.scripting.executeScript({ 
    target: { tabId: activeTab.id },
    func:getSelection 
  }, (selection) => {
    chrome.storage.local.get(["Lettuce"], (data) => {
      var hashtag = "";
      if (data.Lettuce) {
        var json = JSON.parse(data.Lettuce);
        if (json !== null) {
          hashtag = json["Lettuce.hashtag"];
        }
      }
      tweet(activeTab.title, activeTab.url, selection[0].result, hashtag);
    });
  });
});
