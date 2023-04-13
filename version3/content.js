var video = document.createElement("iframe");
var posBtn = document.createElement("img");
var resizeBtn = document.createElement("img");
var accInput = document.createElement("input");
var accelerator = 2;
var past_url = "";
var isResize = false;
var isMove = false;
var pre_mouse = { x: 0, y: 0 };
var display = true;

function fit_settings() {
  resizeBtn.style["margin-top"] = `${
    parseInt(video.style["margin-top"].slice(0, -2)) - 20
  }px`;
  resizeBtn.style["margin-left"] = `${
    parseInt(video.style["margin-left"].slice(0, -2)) + parseInt(video.width)
  }px`;
  posBtn.style["margin-top"] = `${
    parseInt(video.style["margin-top"].slice(0, -2)) - 20
  }px`;
  posBtn.style["margin-left"] = `${
    parseInt(video.style["margin-left"].slice(0, -2)) +
    parseInt(video.width) / 2
  }px`;
  accInput.style["margin-top"] = `${
    parseInt(video.style["margin-top"].slice(0, -2)) - 20
  }px`;
  accInput.style["margin-left"] = `${parseInt(
    video.style["margin-left"].slice(0, -2)
  )}px`;
  accInput.style["width"] = `${parseInt(parseInt(video.width) / 10)}px`;
}
function build_settings() {
  let tmpSrc = chrome.runtime.getURL("resize.png");
  resizeBtn.src = tmpSrc;
  resizeBtn.setAttribute("width", "20");
  resizeBtn.setAttribute("height", "20");

  resizeBtn.setAttribute(
    "style",
    "z-index : 5000; position: fixed; opacity:0.5"
  );

  resizeBtn.setAttribute("alt", "resize");
  document.querySelector("body").appendChild(resizeBtn);

  tmpSrc = chrome.runtime.getURL("move.png");
  posBtn.src = tmpSrc;
  posBtn.setAttribute("width", "20");
  posBtn.setAttribute("height", "20");

  posBtn.setAttribute("style", "z-index : 5000; position: fixed; opacity:0.5");

  posBtn.setAttribute("alt", "move");

  document.querySelector("body").appendChild(posBtn);

  accInput.setAttribute("type", "number");
  accInput.setAttribute("step", "0.25");
  accInput.setAttribute("min", "0");
  accInput.setAttribute("max", "10");
  accInput.setAttribute("value", "2");
  accInput.setAttribute(
    "style",
    "z-index : 5000; position: fixed; opacity:0.5"
  );

  accInput.setAttribute("alt", "resize");
  fit_settings();
  document.querySelector("body").appendChild(accInput);
}

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
    " z-index : 5000; position: fixed; margin-top: 200px; margin-left: 100px; "
  );
  video.setAttribute("alt", "Please drag the video");

  video.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  video.setAttribute("allowfullscreen", "");
  video.scrollIntoView();

  document.querySelector("body").appendChild(video);
}
function change_url(e) {
  e.preventDefault();

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
    elt.style["z-index"] = 4999;
    elt.removeEventListener("dragstart", change_url);
    elt.addEventListener("dragstart", change_url);
  }
}
const onMessage = (message) => {
  if (message.func == "disable") {
    if (video.style["z-index"] == 5000) {
      video.style["z-index"] = -5000;
      accInput.style["z-index"] = -5000;
      resizeBtn.style["z-index"] = -5000;
      posBtn.style["z-index"] = -5000;

      display = false;
    } else {
      video.style["z-index"] = 5000;
      accInput.style["z-index"] = 5000;
      resizeBtn.style["z-index"] = 5000;
      posBtn.style["z-index"] = 5000;
      display = true;
    }
  } else if (message.func == "reset") {
    video.width = 560;
    video.height = 315;
    video.style["margin-top"] = "200px";
    video.style["margin-left"] = "100px";
    fit_settings();
  }
};

posBtn.addEventListener("mouseenter", () => {
  posBtn.style["opacity"] = 1;
});
posBtn.addEventListener("mouseleave", () => {
  posBtn.style["opacity"] = 0.5;
});
posBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isMove = true;
  pre_mouse.x = e.clientX;
  pre_mouse.y = e.clientY;
  document.documentElement.addEventListener("mousemove", onMouseMove);
  document.documentElement.addEventListener("mouseup", onMouseUp);
});
resizeBtn.addEventListener("mouseenter", () => {
  resizeBtn.style["opacity"] = 1;
});
resizeBtn.addEventListener("mouseleave", () => {
  resizeBtn.style["opacity"] = 0.5;
});
resizeBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isResize = true;
  pre_mouse.x = e.clientX;
  pre_mouse.y = e.clientY;
  document.documentElement.addEventListener("mousemove", onMouseMove);
  document.documentElement.addEventListener("mouseup", onMouseUp);
});
accInput.addEventListener("mouseenter", () => {
  accInput.style["opacity"] = 1;
});
accInput.addEventListener("mouseleave", () => {
  accInput.style["opacity"] = 0.5;
});
accInput.addEventListener("change", (e) => {
  let a = document.querySelector('iframe[id="NoAddMyvideo"]');
  let b = a.contentWindow.document;

  accelerator = e.target.value;

  b.querySelector('video[class="video-stream html5-main-video"]').playbackRate =
    accelerator;
});
function onMouseMove(e) {
  video.style.pointerEvents = "none";
  if (isResize) {
    let move = e.clientX - pre_mouse.x;
    video.width = parseInt(video.width) + move;
    video.height = (parseInt(video.width) / 560) * 315;
    fit_settings();
    pre_mouse.x = e.clientX;
  } else if (isMove) {
    let moveX = e.clientX - pre_mouse.x;
    let moveY = e.clientY - pre_mouse.y;
    video.style["margin-top"] = `${
      parseInt(video.style["margin-top"].slice(0, -2)) + moveY
    }px`;
    video.style["margin-left"] = `${
      parseInt(video.style["margin-left"].slice(0, -2)) + moveX
    }px`;

    fit_settings();
    pre_mouse.x = e.clientX;
    pre_mouse.y = e.clientY;
  }
}
function onMouseUp() {
  video.style.pointerEvents = "auto";
  isResize = false;
  isMove = false;
  console.log("up");
  document.documentElement.removeEventListener("mousemove", onMouseMove);
  document.documentElement.removeEventListener("mouseup", onMouseUp);
}

function do_something() {
  catch_a();
  if (display) {
    delete_other_player();
    document
      .querySelector('iframe[id="NoAddMyvideo"]')
      .contentWindow.document.querySelector(
        'video[class="video-stream html5-main-video"]'
      ).playbackRate = accelerator;
  } else {
    document
      .querySelector('iframe[id="NoAddMyvideo"]')
      .contentWindow.document.querySelector(
        'video[class="video-stream html5-main-video"]'
      ).playbackRate = 0;
  }
  if_change_url_or_not();
}

build_iframe();
build_settings();
loop2 = setInterval(do_something, 2000);

chrome.runtime.onMessage.addListener(onMessage);
