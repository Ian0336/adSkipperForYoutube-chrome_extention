var disable = document.querySelector("#disable");
var reset = document.querySelector("#reset");

// Update button text based on localStorage
function updateButtonState() {
  // Check if localStorage has the display state
  if (localStorage.getItem('adSkipper_display') !== null) {
    const isDisplayed = localStorage.getItem('adSkipper_display') === 'true';
    disable.textContent = isDisplayed ? 'Hide iframe' : 'Show iframe';
  }
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  updateButtonState();
  
  // Get active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs.length === 0) return;
    
    const tab = tabs[0];
    const tabId = tab.id;
    const sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);

    disable.addEventListener("click", () => {
      sendMessage({
        func: "disable",
      });
      
      // Toggle the stored value
      const currentState = localStorage.getItem('adSkipper_display') === 'true';
      localStorage.setItem('adSkipper_display', (!currentState).toString());
      
      // Update button text
      disable.textContent = currentState ? 'Show iframe' : 'Hide iframe';
    });
    
    reset.addEventListener("click", () => {
      sendMessage({
        func: "reset",
      });
      
      // After reset, the iframe should be visible
      localStorage.setItem('adSkipper_display', 'true');
      disable.textContent = 'Hide iframe';
    });
  });
});
