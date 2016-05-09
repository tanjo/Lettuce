function save() {
  var data = {};
  data["Lettuce.hashtag"] = document.getElementsByName("hashtag")[0].value;
  localStorage.setItem("Lettuce", JSON.stringify(data));
}
function restore() {
  var data = JSON.parse(localStorage.getItem("Lettuce"));
  if (data !== null) {
    document.getElementsByName("hashtag")[0].value = data["Lettuce.hashtag"];
  }
}
function del() {
  localStorage.removeItem("Lettuce");
  document.getElementsByName("hashtag")[0].value = "";
}

window.onload = function() {
  document.getElementsByName("ok")[0].addEventListener("click", save);
  document.getElementsByName("del")[0].addEventListener("click", del);
  restore();
};
