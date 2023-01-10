var video = document.querySelector("#iframe_video");
var url = document.querySelector("#input_url");
var body = document.querySelector("body");
var youtube = "https://www.youtube.com/embed/";
var chr = "=";
var str = "";
video.addEventListener("mouseover", (e) => {
  console.log(video);
  str = url.value.split(chr);
  console.log(str[1]);
  video.src = youtube + str[1];
});
