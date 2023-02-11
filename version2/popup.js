var number = document.querySelector("#number");
var disable = document.querySelector("#disable");
var bigger = document.querySelector("#bigger");
var smaller = document.querySelector("#smaller");
var right = document.querySelector("#right");
var left = document.querySelector("#left");
var ok = document.querySelector("#ok");

var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var enableClick = 0;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  ok.addEventListener("click", () => {
    sendMessage({
      idx: 1,
      accelerator: number.value,
      disable: enableClick,
      size: "",
      pos: "",
    });
    console.log(number.value);
  });
  disable.addEventListener("click", () => {
    enableClick = 1;
    sendMessage({
      idx: 2,
      accelerator: number.value,
      disable: enableClick,
      size: "",
      pos: "",
    });
  });
  bigger.addEventListener("click", () => {
    sendMessage({
      idx: 3,
      accelerator: number.value,
      disable: enableClick,
      size: "bigger",
      pos: "",
    });
  });
  smaller.addEventListener("click", () => {
    sendMessage({
      idx: 3,
      accelerator: number.value,
      disable: enableClick,
      size: "smaller",
      pos: "",
    });
  });
  left.addEventListener("click", () => {
    sendMessage({
      idx: 4,
      accelerator: number.value,
      disable: enableClick,
      size: "",
      pos: "left",
    });
  });
  right.addEventListener("click", () => {
    sendMessage({
      idx: 4,
      accelerator: number.value,
      disable: enableClick,
      size: "",
      pos: "right",
    });
  });
};
chrome.tabs.getSelected(null, getSelectedTab);
