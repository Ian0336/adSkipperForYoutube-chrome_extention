var video = document.createElement("iframe");
var accelerator = 2;
video.setAttribute("src", "https://www.youtube.com/embed/");
video.setAttribute("id", "NoAddMyvideo");
video.setAttribute("width", "560");
video.setAttribute("height", "315");
video.setAttribute("title", "YouTube video player");
video.setAttribute("frameborder", "0");
video.setAttribute(
  "style",
  " z-index : 5000; position: fixed; margin-top: 19%; "
);
video.setAttribute("alt", "Please drag the video");

video.setAttribute(
  "allow",
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
);
video.setAttribute("allowfullscreen", "");
document.querySelector("body").appendChild(video);

function change_url() {
  str = this.href.split("=");
  newUrl = "https://www.youtube.com/embed/" + str[1] + "?autoplay=1";
  video.setAttribute("src", newUrl);
}
function catch_a() {
  var a = document.querySelector('iframe[id="NoAddMyvideo"]');
  var b = a.contentWindow.document;
  b.querySelector('video[class="video-stream html5-main-video"]').playbackRate =
    accelerator;

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
const onMessage = (message) => {
  accelerator = message.accelerator;
  console.log(accelerator);
  var a = document.querySelector('iframe[id="NoAddMyvideo"]');
  var b = a.contentWindow.document;
  b.querySelector('video[class="video-stream html5-main-video"]').playbackRate =
    accelerator;
};
loop = setInterval(catch_a, 2000);
chrome.runtime.onMessage.addListener(onMessage);
