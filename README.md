![Braze Logo](https://github.com/Appboy/appboy-web-sdk/blob/master/braze-logo.png)

Effective marketing automation is an essential part of successfully scaling and managing your business. Braze empowers you to build better customer relationships through a seamless, multi-channel approach that addresses all aspects of the user life cycle. Braze helps you engage your users on an ongoing basis. We'll have you up and running in no time!

- [Read the full technical documentation](https://js.appboycdn.com/web-sdk/2.0/doc/module-appboy.html)

# Getting Started

Put the following snippet in the `<head>` section of your page to asynchronously download https://js.appboycdn.com/web-sdk/2.0/appboy.min.js and open a Braze session:

<!--- UPDATE THESE LOADING SNIPPETS IN THE SAMPLE BUILD APP'S INDEX.HTML WHEN YOU CHANGE THEM!!
  For context, these are largely standard "load js from js" snippets - the basic approach is to create a script
  element, place it in the DOM, and the browser will do the remote fetch from the CDN. They're a little weird to
  read because they're semi-minimized to help reduce the amount of space we take up in peoples' applications.
  Specifically, all the arguments to the snippet other than the onload callback (y) are only even params to reduce
  repetition and minimize snippet size.

  The INTERFACE_STUBBING_SNIPPET block is programmatically generated and templated by the grunt build from interface.json,
  using generate-interface-stub.js - to see the fully templated version, `grunt`, `grunt prepare-deployment`, and look
  inside build/public-docs/README.md
--->

```
<script type="text/javascript">
  +function(a,p,P,b,y){appboy={};appboyQueue=[];for(var s="initialize destroy getDeviceId toggleAppboyLogging setLogger openSession changeUser requestImmediateDataFlush requestFeedRefresh subscribeToFeedUpdates logCardImpressions logCardClick logFeedDisplayed requestInAppMessageRefresh logInAppMessageImpression logInAppMessageClick logInAppMessageButtonClick logInAppMessageHtmlClick subscribeToNewInAppMessages removeSubscription removeAllSubscriptions logCustomEvent logPurchase isPushSupported isPushBlocked isPushGranted isPushPermissionGranted registerAppboyPushMessages unregisterAppboyPushMessages submitFeedback trackLocation stopWebTracking resumeWebTracking ab ab.User ab.User.Genders ab.User.NotificationSubscriptionTypes ab.User.prototype.getUserId ab.User.prototype.setFirstName ab.User.prototype.setLastName ab.User.prototype.setEmail ab.User.prototype.setGender ab.User.prototype.setDateOfBirth ab.User.prototype.setCountry ab.User.prototype.setHomeCity ab.User.prototype.setLanguage ab.User.prototype.setEmailNotificationSubscriptionType ab.User.prototype.setPushNotificationSubscriptionType ab.User.prototype.setPhoneNumber ab.User.prototype.setAvatarImageUrl ab.User.prototype.setLastKnownLocation ab.User.prototype.setUserAttribute ab.User.prototype.setCustomUserAttribute ab.User.prototype.addToCustomAttributeArray ab.User.prototype.removeFromCustomAttributeArray ab.User.prototype.incrementCustomUserAttribute ab.User.prototype.addAlias ab.InAppMessage ab.InAppMessage.SlideFrom ab.InAppMessage.ClickAction ab.InAppMessage.DismissType ab.InAppMessage.OpenTarget ab.InAppMessage.ImageStyle ab.InAppMessage.TextAlignment ab.InAppMessage.Orientation ab.InAppMessage.CropType ab.InAppMessage.prototype.subscribeToClickedEvent ab.InAppMessage.prototype.subscribeToDismissedEvent ab.InAppMessage.prototype.removeSubscription ab.InAppMessage.prototype.removeAllSubscriptions ab.InAppMessage.Button ab.InAppMessage.Button.prototype.subscribeToClickedEvent ab.InAppMessage.Button.prototype.removeSubscription ab.InAppMessage.Button.prototype.removeAllSubscriptions ab.SlideUpMessage ab.ModalMessage ab.FullScreenMessage ab.HtmlMessage ab.ControlMessage ab.Feed ab.Feed.prototype.getUnreadCardCount ab.Card ab.ClassicCard ab.CaptionedImage ab.Banner ab.WindowUtils display display.automaticallyShowNewInAppMessages display.showInAppMessage display.showFeed display.destroyFeed display.toggleFeed sharedLib".split(" "),i=0;i<s.length;i++){for(var m=s[i],k=appboy,l=m.split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=(new Function("return function "+m.replace(/\./g,"_")+"(){appboyQueue.push(arguments)}"))()}appboy.getUser=function(){return new appboy.ab.User};appboy.getCachedFeed=function(){return new appboy.ab.Feed};(y=p.createElement(P)).type='text/javascript';y.src='https://js.appboycdn.com/web-sdk/2.0/appboy.min.js';y.async=1;(b=p.getElementsByTagName(P)[0]).parentNode.insertBefore(y,b)}(window,document,'script');

  appboy.initialize('YOUR-API-KEY-HERE');
  appboy.display.automaticallyShowNewInAppMessages();

  /*
   * If you have a unique identifier for this user (e.g. they are logged into your site) it's a good idea to call
   * changeUser here.
   * See https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.changeUser for more information.
   */
  // appboy.changeUser(userIdentifier);

  appboy.openSession();
</script>
```

**Be sure to replace "YOUR-API-KEY-HERE" with your API key!** This snippet will provide a global variable [`appboy`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html) that you can use to send data to the Braze API.

## Alternative RequireJS installation

Alternatively, you can use RequireJS or another AMD module-loader to load the Braze Web SDK. In this scenario, we recommend hosting a copy of https://js.appboycdn.com/web-sdk/2.0/appboy.min.js alongside your other self-hosted JavaScript resources, or utilizing your module-loader's packaging/optimization features to package the Braze library inside of your other JavaScript. This prevents the require call from failing when the library is blocked by strict corporate firewalls or ad blockers. If you opt for this route, please be sure to watch [our Github repository](https://github.com/Appboy/appboy-web-sdk/releases) ([or the release feed](https://github.com/Appboy/appboy-web-sdk/releases.atom)) to stay aware of critical bugfixes and upgrades.

```
require(['path/to/appboy'], function(appboy) {
  appboy.initialize('YOUR-API-KEY-HERE');
  appboy.display.automaticallyShowNewInAppMessages();
  appboy.openSession();
});
```

**Be sure to replace "YOUR-API-KEY-HERE" with your API key!**

## Alternative NPM installation

If your site uses npm to manage its client-side javascript, we also publish the Web SDK as an npm package, available [here](https://www.npmjs.com/package/appboy-web-sdk). To install into a project using NPM with a front-end packager such as [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/):

```
$ npm install --save appboy-web-sdk
```

You can then require the lib like a standard Node.js module:

```
var appboy = require('appboy-web-sdk');
appboy.initialize('YOUR-API-KEY-HERE');
appboy.display.automaticallyShowNewInAppMessages();
appboy.openSession();
```

## Alternative Bower installation

If you use Bower to manage your front-end packages, you can install the Web SDK with:

```
$ bower install https://registry.npmjs.org/appboy-web-sdk/-/appboy-web-sdk-2.0.7.tgz
```

This will install the Web SDK files into your `bower_components` directory where you can then reference them locally, by placing the following in the `<head>` section of your page:

```
<script type="text/javascript">
   +function(a,p,P,b,y){appboy={};appboyQueue=[];for(var s="initialize destroy getDeviceId toggleAppboyLogging setLogger openSession changeUser requestImmediateDataFlush requestFeedRefresh subscribeToFeedUpdates logCardImpressions logCardClick logFeedDisplayed requestInAppMessageRefresh logInAppMessageImpression logInAppMessageClick logInAppMessageButtonClick logInAppMessageHtmlClick subscribeToNewInAppMessages removeSubscription removeAllSubscriptions logCustomEvent logPurchase isPushSupported isPushBlocked isPushGranted isPushPermissionGranted registerAppboyPushMessages unregisterAppboyPushMessages submitFeedback trackLocation stopWebTracking resumeWebTracking ab ab.User ab.User.Genders ab.User.NotificationSubscriptionTypes ab.User.prototype.getUserId ab.User.prototype.setFirstName ab.User.prototype.setLastName ab.User.prototype.setEmail ab.User.prototype.setGender ab.User.prototype.setDateOfBirth ab.User.prototype.setCountry ab.User.prototype.setHomeCity ab.User.prototype.setLanguage ab.User.prototype.setEmailNotificationSubscriptionType ab.User.prototype.setPushNotificationSubscriptionType ab.User.prototype.setPhoneNumber ab.User.prototype.setAvatarImageUrl ab.User.prototype.setLastKnownLocation ab.User.prototype.setUserAttribute ab.User.prototype.setCustomUserAttribute ab.User.prototype.addToCustomAttributeArray ab.User.prototype.removeFromCustomAttributeArray ab.User.prototype.incrementCustomUserAttribute ab.User.prototype.addAlias ab.InAppMessage ab.InAppMessage.SlideFrom ab.InAppMessage.ClickAction ab.InAppMessage.DismissType ab.InAppMessage.OpenTarget ab.InAppMessage.ImageStyle ab.InAppMessage.TextAlignment ab.InAppMessage.Orientation ab.InAppMessage.CropType ab.InAppMessage.prototype.subscribeToClickedEvent ab.InAppMessage.prototype.subscribeToDismissedEvent ab.InAppMessage.prototype.removeSubscription ab.InAppMessage.prototype.removeAllSubscriptions ab.InAppMessage.Button ab.InAppMessage.Button.prototype.subscribeToClickedEvent ab.InAppMessage.Button.prototype.removeSubscription ab.InAppMessage.Button.prototype.removeAllSubscriptions ab.SlideUpMessage ab.ModalMessage ab.FullScreenMessage ab.HtmlMessage ab.ControlMessage ab.Feed ab.Feed.prototype.getUnreadCardCount ab.Card ab.ClassicCard ab.CaptionedImage ab.Banner ab.WindowUtils display display.automaticallyShowNewInAppMessages display.showInAppMessage display.showFeed display.destroyFeed display.toggleFeed sharedLib".split(" "),i=0;i<s.length;i++){for(var m=s[i],k=appboy,l=m.split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=(new Function("return function "+m.replace(/\./g,"_")+"(){appboyQueue.push(arguments)}"))()}appboy.getUser=function(){return new appboy.ab.User};appboy.getCachedFeed=function(){return new appboy.ab.Feed};(y=p.createElement(P)).type='text/javascript';y.src='bower_components/appboy-web-sdk-2.0.7/appboy.min.js';y.async=1;(b=p.getElementsByTagName(P)[0]).parentNode.insertBefore(y,b)}(window,document,'script');

 appboy.initialize('YOUR-API-KEY-HERE');
 appboy.display.automaticallyShowNewInAppMessages();
 appboy.openSession();
</script>
```

## Core Library (no In-App Messages or News Feed)

If you don't intend to use Braze's built-in UI capabilities (any [appboy.display](https://js.appboycdn.com/web-sdk/latest/doc/module-display.html) methods), you can load a core version of the
library with display capabilities stripped. However, you will need to implement your own UI for In-App Messaging and the
News Feed. Note that our UI elements are fully customizable via css, so we generally recommend integration
of the complete library instead. The core library is available at `https://js.appboycdn.com/web-sdk/2.0/appboy.core.min.js`.

# Using a Custom Endpoint

If Braze has provided you with a custom, client-specific endpoint (for data isolation and reliability purposes), you should configure the SDK to use that endpoint through the `baseUrl` option to the initialize function, for example `appboy.initialize('YOUR-API-KEY-HERE', {baseUrl: 'https://example.appboy.eu/api/v3'})`

# Debugging / Troubleshooting

Pass the option `enableLogging: true` to the initialize function (`appboy.initialize('YOUR-API-KEY-HERE', {enableLogging: true});`) to cause Braze to log to the javascript console. This is valuable for development but is visible to all users,
so remove this option or [provide an alternate logger](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.setLogger) before you
release your page to production.

## Version Support

The Web SDK is a standards-compliant JavaScript library, and is built to support a wide array of browser environments. That said, there are a few older browsers which are known to cause errors. For the following browsers, please observe the following version support restrictions:

- Internet Explorer > 8
- Opera > 11
- Android Browser > 2.3

Braze uses [Font Awesome](http://fortawesome.github.io/Font-Awesome/) 4.3.0 for in-app message icons. Check out the [cheat sheet](http://fortawesome.github.io/Font-Awesome/cheatsheet/) to browse available icons.

## [Changelog](https://github.com/Appboy/appboy-web-sdk/blob/master/CHANGELOG.md)

## Questions?

If you have questions, please contact [support@braze.com](mailto:support@braze.com). If you believe you are encountering a bug, feel free to file issues in this repository.
