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

chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.executeScript({code: "window.getSelection().toString();"}, function(selection) {
    chrome.tabs.getSelected(null, function(tab) {
      var hashtag = "";
      var json = localStorage.getItem("Lettuce");
      if (json !== null) {
        var jsonObject = JSON.parse(json);
        hashtag = jsonObject["Lettuce.hashtag"];
      }
      tweet(tab.title, tab.url, selection[0], hashtag);
    });
  });
});
