var video = document.createElement("iframe");
var accelerator = 2;
var past_url = "";
var ppp;
function delete_other_player() {
  var players = document.querySelectorAll(
    'video[class="video-stream html5-main-video"]'
  );
  for (elt of players) {
    elt.remove();
  }
}
function if_change_url_or_not() {
  var url = location.href;

  if (url != past_url) {
    var str = url.split("=");
    if (str.length > 1) {
      str = str[1].split("&")[0];

      var newUrl = "https://www.youtube.com/embed/" + str + "?autoplay=1";
      video.setAttribute("src", newUrl);
    }
  }
  past_url = url;
}
function build_iframe() {
  video.setAttribute("src", "https://www.youtube.com/embed/");
  video.setAttribute("id", "NoAddMyvideo");
  video.setAttribute("width", "560");
  video.setAttribute("height", "315");
  video.setAttribute("title", "YouTube video player");
  video.setAttribute("frameborder", "0");
  video.setAttribute(
    "style",
    " z-index : 5000; position: fixed; margin-top: 13%; margin-left: 10%; "
  );
  video.setAttribute("alt", "Please drag the video");

  video.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  video.setAttribute("allowfullscreen", "");
  document.querySelector("body").appendChild(video);
}
function change_url() {
  var str = this.href.split("=")[1].split("&")[0];
  var newUrl = "https://www.youtube.com/embed/" + str + "?autoplay=1";
  video.setAttribute("src", newUrl);
}
function catch_a() {
  var a = document.querySelector('iframe[id="NoAddMyvideo"]');
  var b = a.contentWindow.document;
  b.querySelector('video[class="video-stream html5-main-video"]').playbackRate =
    accelerator;

  var lists = document.querySelectorAll("ytd-thumbnail");
  var all_a = [];
  for (elt of lists) {
    var aa = elt.querySelectorAll("a[tabindex][rel]");
    for (s of aa) {
      all_a.push(s);
    }
  }
  for (elt of all_a) {
    elt.removeEventListener("dragstart", change_url);
    elt.addEventListener("dragstart", change_url);
  }
}
const onMessage = (message) => {
  var a = document.querySelector('iframe[id="NoAddMyvideo"]');
  var b = a.contentWindow.document;
  if (message.idx == 1) {
    accelerator = message.accelerator;
    console.log(accelerator);
    b.querySelector(
      'video[class="video-stream html5-main-video"]'
    ).playbackRate = accelerator;
  } else if (message.idx == 2) {
    if (message.disable) {
      if (video.style["z-index"] == 5000) video.style["z-index"] = -5000;
      else video.style["z-index"] = 5000;
    }
  } else if (message.idx == 3) {
    var w_r = 560 / 35;
    var h_r = 315 / 35;
    console.log(message.size);
    if (message.size == "bigger") {
      if (
        parseInt(video.width, 10) < 560 + w_r * 30 &&
        parseInt(video.height, 10) < 315 + h_r * 30
      ) {
        video.width = parseInt(video.width, 10) + w_r * 6;
        video.height = parseInt(video.height, 10) + h_r * 6;
        console.log(video.width);
      }
    }
    if (message.size == "smaller") {
      if (
        parseInt(video.width, 10) > 560 - w_r * 12 &&
        parseInt(video.height, 10) > 315 - h_r * 12
      ) {
        video.width = parseInt(video.width, 10) - w_r * 6;
        video.height = parseInt(video.height, 10) - h_r * 6;
      }
    }
  } else if (message.idx == 4) {
    var cur_margin = parseInt(video.style["margin-left"].split("%")[0], 10);
    if (message.pos == "left") {
      console.log(cur_margin);
      if (cur_margin > 0) video.style["margin-left"] = cur_margin - 5 + "%";
    }
    if (message.pos == "right") {
      console.log(cur_margin);
      if (cur_margin < 90) video.style["margin-left"] = cur_margin + 5 + "%";
    }
  }
};
function do_something() {
  catch_a();
  delete_other_player();
  if_change_url_or_not();
}
build_iframe();

loop2 = setInterval(do_something, 2000);

chrome.runtime.onMessage.addListener(onMessage);
