<img src="https://github.com/Appboy/appboy-web-sdk/blob/master/braze-logo.png" width="300" title="Braze Logo" />

Effective marketing automation is an essential part of successfully scaling and managing your business. Braze empowers you to build better customer relationships through a seamless, multi-channel approach that addresses all aspects of the user life cycle. Braze helps you engage your users on an ongoing basis. We'll have you up and running in no time!

- [Read the full technical documentation](https://js.appboycdn.com/web-sdk/3.5/doc/modules/appboy.html)

![lighthouse score](https://github.com/Appboy/appboy-web-sdk/blob/master/lighthouse-score.svg)

# Getting Started

If your site uses npm to manage its client-side javascript, we publish the Web SDK as an npm package, available [here](https://www.npmjs.com/package/@braze/web-sdk).

```shell
$ npm install --save @braze/web-sdk
```

You can then import the library like a standard Node.js module:

```javascript
const appboy = require('@braze/web-sdk');
// or if you prefer using import:
// import appboy from '@braze/web-sdk';

appboy.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT' });
appboy.display.automaticallyShowNewInAppMessages();
appboy.openSession();
```

If you're integrating web push, you should also install the Braze service worker:

```shell
$ npm install --save @braze/service-worker
```

In your build process, copy `node_modules/@braze/service-worker/service-worker.js` to your web application's public root directory.

Alternatively, you can skip installing the service worker from NPM and download it from our CDN.

```javascript
// service-worker.js
self.importScripts('https://js.appboycdn.com/web-sdk/3.5/service-worker.js');
```

## TypeScript Support

As of 3.0.0, the Braze Web SDK includes types with the `@braze/web-sdk` package. This includes autocomplete and documentation when using an IDE compatible with TypeScript.

## Alternative CDN installation

If you don't use npm or you prefer not to load the SDK through a package manager, you can load it through our CDN in your HTML. Put the following snippet in the `<head>` section of your page to asynchronously download https://js.appboycdn.com/web-sdk/3.5/appboy.min.js and open a Braze session:

<!--- UPDATE THESE LOADING SNIPPETS IN THE SAMPLE BUILD APP'S INDEX.HTML WHEN YOU CHANGE THEM!!
  For context, these are largely standard "load js from js" snippets - the basic approach is to create a script
  element, place it in the DOM, and the browser will do the remote fetch from the CDN. They're a little weird to
  read because they're semi-minimized to help reduce the amount of space we take up in peoples' applications.
  Specifically, all the arguments to the snippet other than the onload callback (y) are only even params to reduce
  repetition and minimize snippet size.

  The INTERFACE_STUBBING_SNIPPET block is programmatically generated and templated by the grunt build from the TypeScript declaration file,
  using generate-interface-stub.js - to see the fully templated version, `grunt`, `grunt prepare-deployment`, and look
  inside build/public-docs/README.md
--->

```html
<script type="text/javascript">
  +function(a,p,P,b,y){a.appboy={};a.appboyQueue=[];for(var s="DeviceProperties BrazeSdkMetadata BrazeSdkMetadata.GOOGLE_TAG_MANAGER BrazeSdkMetadata.MPARTICLE BrazeSdkMetadata.SEGMENT BrazeSdkMetadata.TEALIUM BrazeSdkMetadata.NPM BrazeSdkMetadata.CDN BrazeSdkMetadata.MANUAL Card Card.prototype.dismissCard Card.prototype.removeAllSubscriptions Card.prototype.removeSubscription Card.prototype.subscribeToClickedEvent Card.prototype.subscribeToDismissedEvent Card.fromContentCardsJson Banner CaptionedImage ClassicCard ControlCard ContentCards ContentCards.prototype.getUnviewedCardCount Feed Feed.prototype.getUnreadCardCount ControlMessage InAppMessage InAppMessage.SlideFrom InAppMessage.ClickAction InAppMessage.DismissType InAppMessage.OpenTarget InAppMessage.ImageStyle InAppMessage.Orientation InAppMessage.TextAlignment InAppMessage.CropType InAppMessage.prototype.closeMessage InAppMessage.prototype.removeAllSubscriptions InAppMessage.prototype.removeSubscription InAppMessage.prototype.subscribeToClickedEvent InAppMessage.prototype.subscribeToDismissedEvent InAppMessage.fromJson FullScreenMessage ModalMessage HtmlMessage SlideUpMessage User User.Genders User.NotificationSubscriptionTypes User.prototype.addAlias User.prototype.addToCustomAttributeArray User.prototype.addToSubscriptionGroup User.prototype.getUserId User.prototype.incrementCustomUserAttribute User.prototype.removeFromCustomAttributeArray User.prototype.removeFromSubscriptionGroup User.prototype.setAvatarImageUrl User.prototype.setCountry User.prototype.setCustomLocationAttribute User.prototype.setCustomUserAttribute User.prototype.setDateOfBirth User.prototype.setEmail User.prototype.setEmailNotificationSubscriptionType User.prototype.setFirstName User.prototype.setGender User.prototype.setHomeCity User.prototype.setLanguage User.prototype.setLastKnownLocation User.prototype.setLastName User.prototype.setPhoneNumber User.prototype.setPushNotificationSubscriptionType InAppMessageButton InAppMessageButton.prototype.removeAllSubscriptions InAppMessageButton.prototype.removeSubscription InAppMessageButton.prototype.subscribeToClickedEvent display display.automaticallyShowNewInAppMessages display.destroyFeed display.hideContentCards display.showContentCards display.showFeed display.showInAppMessage display.toggleContentCards display.toggleFeed changeUser destroy getDeviceId initialize isPushBlocked isPushGranted isPushPermissionGranted isPushSupported logCardClick logCardDismissal logCardImpressions logContentCardsDisplayed logCustomEvent logFeedDisplayed logInAppMessageButtonClick logInAppMessageClick logInAppMessageHtmlClick logInAppMessageImpression logPurchase openSession registerAppboyPushMessages removeAllSubscriptions removeSubscription requestContentCardsRefresh requestFeedRefresh requestImmediateDataFlush resumeWebTracking enableSDK isDisabled setLogger setSdkAuthenticationSignature addSdkMetadata stopWebTracking disableSDK subscribeToContentCardsUpdates subscribeToFeedUpdates subscribeToInAppMessage subscribeToNewInAppMessages subscribeToSdkAuthenticationFailures toggleAppboyLogging trackLocation unregisterAppboyPushMessages wipeData".split(" "),i=0;i<s.length;i++){for(var m=s[i],k=a.appboy,l=m.split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=(new Function("return function "+m.replace(/\./g,"_")+"(){window.appboyQueue.push(arguments); return true}"))()}window.appboy.getCachedContentCards=function(){return new window.appboy.ContentCards};window.appboy.getCachedFeed=function(){return new window.appboy.Feed};window.appboy.getUser=function(){return new window.appboy.User};(y=p.createElement(P)).type='text/javascript';
    y.src='https://js.appboycdn.com/web-sdk/3.5/appboy.min.js';
    y.async=1;(b=p.getElementsByTagName(P)[0]).parentNode.insertBefore(y,b)
  }(window,document,'script');

  appboy.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT' });
  appboy.display.automaticallyShowNewInAppMessages();

  /*
   * If you have a unique identifier for this user (e.g. they are logged into your site) it's a good idea to call
   * changeUser here.
   * See https://js.appboycdn.com/web-sdk/3.5/doc/modules/appboy.html#changeuser for more information.
   */
  // appboy.changeUser(userIdentifier);

  appboy.openSession();
</script>
```

**Be sure to replace "YOUR-API-KEY-HERE" with your API key!** This snippet will provide a global variable [`appboy`](https://js.appboycdn.com/web-sdk/3.5/doc/modules/appboy.html) that you can use to send data to the Braze API.

## Alternative Google Tag Manager installation

If you are using Google Tag Manager, you should use the following loading snippet to initialize our SDK on initial page load:

```html
<script type="text/javascript">
+function(a,p,P,b,y){a.appboy = {};a.appboyQueue = [];var s = ["DeviceProperties", "BrazeSdkMetadata", "BrazeSdkMetadata.GOOGLE_TAG_MANAGER", "BrazeSdkMetadata.MPARTICLE", "BrazeSdkMetadata.SEGMENT", "BrazeSdkMetadata.TEALIUM", "BrazeSdkMetadata.NPM", "BrazeSdkMetadata.CDN", "BrazeSdkMetadata.MANUAL", "Card", "Card.prototype.dismissCard", "Card.prototype.removeAllSubscriptions", "Card.prototype.removeSubscription", "Card.prototype.subscribeToClickedEvent", "Card.prototype.subscribeToDismissedEvent", "Card.fromContentCardsJson", "Banner", "CaptionedImage", "ClassicCard", "ControlCard", "ContentCards", "ContentCards.prototype.getUnviewedCardCount", "Feed", "Feed.prototype.getUnreadCardCount", "ControlMessage", "InAppMessage", "InAppMessage.SlideFrom", "InAppMessage.ClickAction", "InAppMessage.DismissType", "InAppMessage.OpenTarget", "InAppMessage.ImageStyle", "InAppMessage.Orientation", "InAppMessage.TextAlignment", "InAppMessage.CropType", "InAppMessage.prototype.closeMessage", "InAppMessage.prototype.removeAllSubscriptions", "InAppMessage.prototype.removeSubscription", "InAppMessage.prototype.subscribeToClickedEvent", "InAppMessage.prototype.subscribeToDismissedEvent", "InAppMessage.fromJson", "FullScreenMessage", "ModalMessage", "HtmlMessage", "SlideUpMessage", "User", "User.Genders", "User.NotificationSubscriptionTypes", "User.prototype.addAlias", "User.prototype.addToCustomAttributeArray", "User.prototype.addToSubscriptionGroup", "User.prototype.getUserId", "User.prototype.incrementCustomUserAttribute", "User.prototype.removeFromCustomAttributeArray", "User.prototype.removeFromSubscriptionGroup", "User.prototype.setAvatarImageUrl", "User.prototype.setCountry", "User.prototype.setCustomLocationAttribute", "User.prototype.setCustomUserAttribute", "User.prototype.setDateOfBirth", "User.prototype.setEmail", "User.prototype.setEmailNotificationSubscriptionType", "User.prototype.setFirstName", "User.prototype.setGender", "User.prototype.setHomeCity", "User.prototype.setLanguage", "User.prototype.setLastKnownLocation", "User.prototype.setLastName", "User.prototype.setPhoneNumber", "User.prototype.setPushNotificationSubscriptionType", "InAppMessageButton", "InAppMessageButton.prototype.removeAllSubscriptions", "InAppMessageButton.prototype.removeSubscription", "InAppMessageButton.prototype.subscribeToClickedEvent", "display", "display.automaticallyShowNewInAppMessages", "display.destroyFeed", "display.hideContentCards", "display.showContentCards", "display.showFeed", "display.showInAppMessage", "display.toggleContentCards", "display.toggleFeed", "changeUser", "destroy", "getDeviceId", "initialize", "isPushBlocked", "isPushGranted", "isPushPermissionGranted", "isPushSupported", "logCardClick", "logCardDismissal", "logCardImpressions", "logContentCardsDisplayed", "logCustomEvent", "logFeedDisplayed", "logInAppMessageButtonClick", "logInAppMessageClick", "logInAppMessageHtmlClick", "logInAppMessageImpression", "logPurchase", "openSession", "registerAppboyPushMessages", "removeAllSubscriptions", "removeSubscription", "requestContentCardsRefresh", "requestFeedRefresh", "requestImmediateDataFlush", "resumeWebTracking", "enableSDK", "isDisabled", "setLogger", "setSdkAuthenticationSignature", "addSdkMetadata", "stopWebTracking", "disableSDK", "subscribeToContentCardsUpdates", "subscribeToFeedUpdates", "subscribeToInAppMessage", "subscribeToNewInAppMessages", "subscribeToSdkAuthenticationFailures", "toggleAppboyLogging", "trackLocation", "unregisterAppboyPushMessages", "wipeData"];for (var i = 0; i < s.length; i++) {  var m = s[i];  var k = a.appboy;  var l = m.split(".");  for (var j = 0; j < l.length - 1; j++) {    k = k[l[j]];  }  k[l[j]] = new Function("return function " + m.replace(/\./g, "_") + "(){window.appboyQueue.push(arguments); return true}")();}window.appboy.getCachedContentCards = function() { return new window.appboy.ContentCards(); };window.appboy.getCachedFeed = function() { return new window.appboy.Feed(); };window.appboy.getUser = function() { return new window.appboy.User(); };(y=p.createElement(P)).type='text/javascript';
  y.src='https://js.appboycdn.com/web-sdk/3.5/appboy.min.js';
  y.async=1;(b=p.getElementsByTagName(P)[0]).parentNode.insertBefore(y,b)
}(window,document,'script');

window.appboy.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT' });
window.appboy.display.automaticallyShowNewInAppMessages();

/*
  * If you have a unique identifier for this user (e.g. they are logged into your site) it's a good idea to call
  * changeUser here.
  * See https://js.appboycdn.com/web-sdk/3.5/doc/modules/appboy.html#changeuser for more information.
  */
// window.appboy.changeUser(userIdentifier);

window.appboy.openSession();
</script>
```

All Braze activity on initial page view should be in this tag. Subsequent tags which fire after page load can then reference the SDK directly via window.appboy, for example: ```<script type="text/javascript">window.appboy.logCustomEvent("my event")</script>```

## Alternative RequireJS installation

Alternatively, you can use RequireJS or another AMD module-loader to load the Braze Web SDK. In this scenario, we recommend hosting a copy of https://js.appboycdn.com/web-sdk/3.5/appboy.min.js alongside your other self-hosted JavaScript resources, or utilizing your module-loader's packaging/optimization features to package the Braze library inside of your other JavaScript. This prevents the require call from failing when the library is blocked by strict corporate firewalls or ad blockers. If you opt for this route, please be sure to watch [our Github repository](https://github.com/Appboy/appboy-web-sdk/releases) ([or the release feed](https://github.com/Appboy/appboy-web-sdk/releases.atom)) to stay aware of critical bugfixes and upgrades.

```js
require(['path/to/appboy'], function(appboy) {
  appboy.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT' });
  appboy.display.automaticallyShowNewInAppMessages();
  appboy.openSession();
});
```

**Be sure to replace "YOUR-API-KEY-HERE" with your API key!**

## Alternative No AMD installation

If your site uses RequireJS or another AMD module-loader, but you prefer to load the Braze Web SDK through one of the other options above, you can load a version of the library that does not include AMD support. This version of the library is available at `https://js.appboycdn.com/web-sdk/3.5/appboy.no-amd.min.js`. You can also find it on [npm](https://www.npmjs.com/package/@braze/web-sdk-no-amd).

## Core Library (no UI for In-App Messages or Content Cards)

If you don't intend to use Braze's built-in UI capabilities (any [appboy.display](https://js.appboycdn.com/web-sdk/3.5/doc/module-display.html) methods), you can load a core version of the
library with display capabilities stripped. However, you will need to implement your own UI for In-App Messaging and Content Cards. Note that our UI elements are fully customizable via css, so we generally recommend integration
of the complete library instead. The core library is available at `https://js.appboycdn.com/web-sdk/3.5/appboy.core.min.js` or on [npm](https://www.npmjs.com/package/@braze/web-sdk-core).

# SDK Endpoint

Be sure to use the correct [SDK endpoint](https://www.braze.com/docs/user_guide/administrative/access_braze/sdk_endpoints/) for your Braze cluster (EU-01, US-06 etc.). You can find your cluster by logging into the dashboard and checking the value in your browser's address bar. You should configure the SDK to use the proper endpoint through the `baseUrl` option in the initialize function, for example `appboy.initialize('YOUR-API-KEY-HERE', { baseUrl: 'https://sdk.fra-01.braze.eu' })`.

# Debugging / Troubleshooting

Pass the option `enableLogging: true` to the initialize function (`appboy.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT', enableLogging: true });`) to cause Braze to log to the javascript console. This is valuable for development but is visible to all users,
so remove this option or [provide an alternate logger](https://js.appboycdn.com/web-sdk/3.5/doc/modules/appboy.html#setlogger) before you
release your page to production.

## Version Support

The Web SDK is a standards-compliant JavaScript library, and is built to support a wide array of browser environments. That said, there are a few older browsers which are known to cause errors. For the following browsers, please observe the following version support restrictions:

- Internet Explorer > 10
- Opera > 12
- Android Browser > 2.3

Braze uses [Font Awesome](http://fortawesome.github.io/Font-Awesome/) 4.7.0 for in-app message icons. Check out the [cheat sheet](http://fortawesome.github.io/Font-Awesome/cheatsheet/) to browse available icons.

## [Changelog](https://github.com/Appboy/appboy-web-sdk/blob/master/CHANGELOG.md)

## Questions?

If you have questions, please contact [support@braze.com](mailto:support@braze.com). If you believe you are encountering a bug, feel free to file issues in this repository.
