function openPopup(url) {
  chrome.tabs.create({ url : url });
}

function tweet(text, url, selection) {
  if (selection == undefined) {
    selection = "";
  }
  var tweet_url = "https://twitter.com/intent/tweet?text=" + text + " " + url + " " + selection;
  openPopup(tweet_url);
}

chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.executeScript({code: "window.getSelection().toString();"}, function(selection) {
    chrome.tabs.getSelected(null, function(tab) {
      tweet(tab.title, tab.url, selection);
    });
  });
});
