function save() {
  var data = {};
  data["Lettuce.hashtag"] = document.getElementsByName("hashtag")[0].value;
  localStorage.setItem("Lettuce", JSON.stringify(data));
  chrome.storage.local.set({ "Lettuce": JSON.stringify(data) }, () => {
    console.log("Settings saved");
  });
}
function restore() {
  chrome.storage.local.get(["Lettuce"], (result) => {
    if (result.Lettuce) {
      var data = JSON.parse(result.Lettuce);
      document.getElementsByName("hashtag")[0].value = data["Lettuce.hashtag"];
    }
  });
}
function del() {
  chrome.storage.local.remove("Lettuce", () => {
    console.log("Settings deleted");
  });
  document.getElementsByName("hashtag")[0].value = "";
}

window.onload = function() {
  document.getElementsByName("ok")[0].addEventListener("click", save);
  document.getElementsByName("del")[0].addEventListener("click", del);
  restore();
};
