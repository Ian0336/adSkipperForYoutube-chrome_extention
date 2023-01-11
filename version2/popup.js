var number = document.querySelector("#number");
var ok = document.querySelector("#ok");

var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  ok.addEventListener("click", () => {
    sendMessage({ accelerator: number.value });
    console.log(number.value);
  });
};
chrome.tabs.getSelected(null, getSelectedTab);
