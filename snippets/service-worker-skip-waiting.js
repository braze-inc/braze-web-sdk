self.addEventListener("install", event => {
  event.stopImmediatePropagation();
});
self.importScripts("https://js.appboycdn.com/web-sdk/4.6/service-worker.js");
