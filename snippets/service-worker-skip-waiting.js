self.addEventListener("install", event => {
  event.stopImmediatePropagation();
});
self.importScripts("https://js.appboycdn.com/web-sdk/5.7/service-worker.js");
