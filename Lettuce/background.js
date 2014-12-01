function openPopup(url) {
  chrome.tabs.create({ url : url });
}

function tweet(text, url, selection) {
  if (selection == undefined) {
    selection = "";
  }
  var tweet_url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "%20" + encodeURIComponent(url);
  if (selection != "") {
    tweet_url += "%20%22" + encodeURIComponent(selection) + "%22";
  }
  openPopup(tweet_url);
}

chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.executeScript({code: "window.getSelection().toString();"}, function(selection) {
    chrome.tabs.getSelected(null, function(tab) {
      tweet(tab.title, tab.url, selection);
    });
  });
});
