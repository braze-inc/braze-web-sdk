self.addEventListener("install", event => {
  event.stopImmediatePropagation();
});
self.importScripts("https://js.appboycdn.com/web-sdk/6.2/service-worker.js");
