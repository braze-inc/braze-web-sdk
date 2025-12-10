import { useEffect } from "react";

import {
  initialize,
  automaticallyShowInAppMessages,
  openSession,
  getUser
} from "@braze/web-sdk";

function App() {
  useEffect(() => {
    initialize("e491231d-c4ae-466d-8f7f-ba8ad308f12a", {
      enableLogging: true,
      baseUrl: "sdk.iad-01.braze.com",
      // Warning: Using the serviceWorkerLocation option limits the scope of push notifications on your site. See
      // https://js.appboycdn.com/web-sdk/6.4/doc/module-appboy.html#initialize for more details.
      // If in doubt, omit this option and use the default location of /service-worker.js
      serviceWorkerLocation: "/service-worker.js",
      safariWebsitePushId: "web.com.braze.sample-build"
    });
    automaticallyShowInAppMessages();
    openSession();
    getUser()?.setCustomUserAttribute("visited sample-build", new Date());
  }, []);

  const handleRegisterPushClick = async () => {
    // use webpackExports magic comment to dynamically import while still getting the benefits of tree-shaking
    const {
      requestPushPermission,
      logCustomEvent,
      requestImmediateDataFlush
    } = await import(
      /* webpackExports: ["requestPushPermission", "logCustomEvent", "requestImmediateDataFlush"] */
      "@braze/web-sdk"
    );
    requestPushPermission(() => {
      logCustomEvent("send me push");
      requestImmediateDataFlush();
    });
  };

  return (
    <div>
      This is a sample integration of the Braze Web SDK, with web push
      integrated.
      <br />
      <br />
      <button onClick={handleRegisterPushClick}>Send Me A Sample Push</button>
    </div>
  );
}

export default App;
