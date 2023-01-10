var vedio = document.createElement("iframe");

vedio.setAttribute("src", "https://www.youtube.com/embed/");
vedio.setAttribute("id", "NoAddMyVedio");
vedio.setAttribute("width", "560");
vedio.setAttribute("height", "315");
vedio.setAttribute("title", "YouTube video player");
vedio.setAttribute("frameborder", "0");
vedio.setAttribute(
  "style",
  " z-index : 5000; position: fixed; margin-top: 19%; "
);
vedio.setAttribute("alt", "Please drag the vedio");

vedio.setAttribute(
  "allow",
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
);
vedio.setAttribute("allowfullscreen", "");
document.querySelector("body").appendChild(vedio);

function change_url() {
  str = this.href.split("=");
  newUrl = "https://www.youtube.com/embed/" + str[1];
  vedio.setAttribute("src", newUrl);
}
function catch_a() {
  console.log("f");
  lists = document.querySelectorAll("ytd-thumbnail");
  all_a = [];
  for (elt of lists) {
    a = elt.querySelectorAll("a[tabindex][rel]");
    for (s of a) {
      all_a.push(s);
    }
  }
  for (elt of all_a) {
    elt.removeEventListener("dragstart", change_url);
    elt.addEventListener("dragstart", change_url);
  }
}

loop = setInterval(catch_a, 2000);
