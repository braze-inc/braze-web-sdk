self.addEventListener("install", event => {
  event.stopImmediatePropagation();
});
self.importScripts("https://js.appboycdn.com/web-sdk/6.1/service-worker.js");
