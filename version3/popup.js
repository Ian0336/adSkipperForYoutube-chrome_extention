var disable = document.querySelector("#disable");
var reset = document.querySelector("#reset");

var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var enableClick = 0;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);

  disable.addEventListener("click", () => {
    enableClick = 1;
    sendMessage({
      func: "disable",
    });
  });
  reset.addEventListener("click", () => {
    enableClick = 1;
    sendMessage({
      func: "reset",
    });
  });
};
chrome.tabs.getSelected(null, getSelectedTab);
