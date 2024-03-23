// This function will send a message to content.js when a tab loads, so that it can run the HideCookies function. 
function sendLoadedMessage(tabId) {
    chrome.tabs.sendMessage(tabId, { message: "loaded" });
}
  
// This will call a function to send a message to content.js when a tab is loaded. Documentation: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onCompleted
chrome.webNavigation.onCompleted.addListener(function(details) {
    sendLoadedMessage(details.tabId);
});
  