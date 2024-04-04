## 5.2.0

##### Added
- Added a [`deviceId`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initializationoptions) initialization option. This can be used to set device ID of the user that would be used after initialization.
- Added support for the `message_extras` liquid tag for in-app messages.

##### Changed
- The SDK will now persist and send the user's alias in all backend requests if it has been set, until the user is identified via an external ID. This alias will no longer be sent in requests once the user is identified and is not compatible with SDK authentication.
- The SDK will now check for existing permissions before requesting push permissions.

##### Fixed
- Fixed an issue where `unregisterPush()` failed to invoke the `successCallback()` function in some cases where the user has already unsubscribed to push.
- Fixed an issue where characters `|` and `:` were not supported in the `userId`.
- Fixed an issue where HTML In-App Messages that used module script tags were not supported.

## 5.1.1

##### Fixed
- Fixed an issue where content cards sync request count persisted across users causing requests to be incorrectly rate limited.

## 5.1.0

##### Changed
- The [`subscribeToFeatureFlagsUpdates()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#subscribetofeatureflagsupdates) callback will be triggered first with cached feature flags only if this cache is from the current session.

##### Fixed
- Fixed an issue where in-app messages failed to render a transparent background when using color-scheme.
- Fixed an issue where impressions for a given feature flag ID were limited to once-per-user instead of once-per-session.

## 5.0.1

##### Fixed
- Fixed a bug where toggling `noCookies` initialization option from true to false did not create all the necessary cookies.
- Fixed an issue where user attributes could not be nulled out by setting a specific null value.

## 5.0.0

##### ⚠️ Breaking
- The [`subscribeToFeatureFlagsUpdates()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#subscribetofeatureflagsupdates) callback will now always be called, regardless of refresh success/failure. If there is a failure in receiving updates, the callback will be called with currently cached feature flags.
- The [`getFeatureFlag()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#getfeatureflag) method now returns a null if the feature flag does not exist, or if feature flags are disabled.
- Removed `logContentCardsDisplayed()` method that was previously deprecated in 4.0.4.
- Removed the deprecated initialization option `enableHtmlInAppMessages`. This should be replaced with the `allowUserSuppliedJavascript` option instead.
- Removed `Banner` class that was previously deprecated in 4.9.0 in favor of [`ImageOnly`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.imageonly.html).
- Removed `ab-banner` CSS classname as part of `Banner` class removal. CSS customizations should instead target the `ab-image-only` class.
- The SDK no longer throws runtime errors anywhere. If Braze methods are called prior to initialization, a warning will be logged to the console instead.
- The SDK no longer adds default Braze in-app message styles to custom HTML in-app messages. These styles were previously used by legacy in-app message types.

## 4.10.2

##### Fixed
- Fixed a CSS templating issue in the npm version of the SDK introduced in 4.10.1 that caused in-app messages to display without the expected styles when using Braze built-in UI. 

## 4.10.1

##### Fixed
- Fixed an issue where user attributes could not be nulled out by setting a specific null value.

## 4.10.0

##### Added
- Added a new [`appVersionNumber`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initializationoptions) initialization option for [targeting via numerical comparison](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/ideas_and_strategies/new_features/).

##### Changed
- The SDK now ensures that cached messages for user (content cards, deferred in-app message, and feature flags) are cleared upon `changeUser()`.
- [`getDeviceId`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#getdeviceid) and [`getUserId`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.user.html#getuserid) now return results directly. Their callback parameters are deprecated and will be removed in a future major version.

## 4.9.0

##### Added
- Introduced a new [`ImageOnly`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.imageonly.html) Card subclass, which has the same functionality as the [`Banner`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.banner.html) class.
- Added a new `ab-image-only` CSS class to `Banner` and `ImageOnly` cards when displayed through the built-in UI. New CSS customizations should target this class. The `ab-banner` classname will remain on both card types until the `Banner` class is removed in a future release.
- Introduced two new methods [`deferInAppMessage()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#deferinappmessage) and [`getDeferredInAppMessage()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#getdeferredinappmessage) that can be used together to delay the display of an in-app message for a future pageload. 
  - [`deferInAppMessage()`] method defers the given in-app message. 
  - The deferred in-app message can be retrieved by calling the  [`getDeferredInAppMessage`] method.

##### Changed
- Deprecated the [`Banner`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.banner.html) class.

##### Fixed
- Fixed an issue where in-app messages with images would fail to display when a parent node is supplied to `showInAppMessage()` and the parent node has not been attached to the DOM before the display callback is invoked.
- Fixed an issue where the callbacks passed to `requestContentCardsRefresh()` were sometimes not triggered when this call was queued behind another `requestContentCardsRefresh()` or `subscribeToContentCardsUpdates()` request.
- Fixed an issue where `dismissCard()` did not work as expected on cached content cards.
- Fixed an issue where calling `destroy()` soonafter `wipeData()` incorrectly created a device ID cookie.

## 4.8.3

##### Fixed
- Fixed an issue where `manageServiceWorkerExternally` initialization option failed to register service-worker when trying to register from a path higher than the service-worker location.

## 4.8.2

##### Fixed
- Fixed an issue where slow / failed image loading prevents subsequent in-app messages from displaying.
- Fixed a regression introduced in 4.8.0 where push notifications failed to display in Safari versions <= 15.

## 4.8.1

##### Fixed
- Fixed an issue where content cards were sometimes not marked as read upon card impression.
- Improved the typings for the `isControl` field on In-App Message and Card classes.

## 4.8.0

##### Changed
- The [`subscribeToFeatureFlagsUpdates`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#subscribetofeatureflagsupdates) callback will now always be called first with the currently cached feature flags, and when feature flag updates are available.

##### Fixed
- Fixed the return type for [`subscribeToContentCardsUpdates()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#subscribetocontentcardsupdates).
- Fixed the return type for [`subscribeToFeatureFlagsUpdates()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#subscribetofeatureflagsupdates).
- Improved type definitions in Card, InAppMessage and InAppMessageButton classes:
  - Fixed return types for [`Card.subscribeToClickedEvent()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.card.html#subscribetoclickedevent) and [`Card.subscribeToDismissedEvent()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.card.html#subscribetodismissedevent).
  - Fixed return types for [`InAppMessage.subscribeToClickedEvent()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.inappmessage.html#subscribetoclickedevent) and [`InAppMessage.subscribeToDismissedEvent()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.inappmessage.html#subscribetodismissedevent).
  - Fixed return type for [`InAppMessageButton.subscribeToClickedEvent()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.inappmessagebutton.html#subscribetoclickedevent).
  - Fixed type definition of [`InAppMessage.extras`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.inappmessage.html#extras).

## 4.7.2

##### Fixed
- Fixed a regression with the noCookies option which caused some localStorage keys to be persisted in cookie storage.

## 4.7.1

##### Fixed
- Improved the type definition of [`Card.extras`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.card.html).
- Fixed a regression introduced in 4.0.0 where the `manageServiceWorkerExternally` and `disablePushTokenMaintenance` initialization options could not work as expected.

## 4.7.0

##### Added
- [`User.setCustomUserAttribute`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.user.html#setcustomuserattribute) now accepts nested custom attributes and arrays of objects.
  - Adds a `merge` parameter that specifies whether the value should be merged with the existing value on the backend. If `false` (default), any existing attribute will be overwritten. If `true`, existing objects and arrays of objects will be merged. To update an array of objects, follow the guidelines in our [public docs](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_attributes/array_of_objects/#usage-examples).

##### Fixed
- Fixed an issue where [`requestPushPermission`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#requestpushpermission) did not call the `deniedCallback` if the SDK encountered certain errors when registering push.
- Fixed an issue where `requestPushPermission` did not log a message if push is not supported on the user's browser.
- Fixed an incorrect typing in `subscribeToSdkAuthenticationFailures`.

## 4.6.3

##### Fixed
- Fixed an issue preventing Feature Flags refreshes when SDK Authentication errors occur.

## 4.6.2

##### Changed
- Removed legacy email capture CSS. This is not a breaking change, as all existing web email capture campaigns have been migrated to the new universal email capture type on the Braze backend. This change results in ~1KB size reduction for those using the built-in In-App Message UI.

## 4.6.1

##### Fixed
- Improved the type definition of [`FeatureFlag.properties`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.featureflag.html).

## 4.6.0

##### Added
- Added a method [`braze.logContentCardClick()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#logcontentcardclick) to log that the user clicked on the given Content Card. This method is equivalent to calling [`braze.logCardClick()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#logcardclick) with parameter `forContentCards = true`.
- Added support for the upcoming Braze Feature Flags product.

##### Changed
- Improved the check for duplicate in-app messages at display time.

## 4.5.1

##### Fixed
- Fixed an issue where sites with globally-scoped `svg` and `img` CSS caused certain elements of the built-in UI to display incorrectly.

## 4.5.0

##### Added
- Added `isControl` property to [`ContentCard`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.card.html) base model, to easily determine whether the card is a control card.
- Added `isControl` property to [`InAppMessage`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.inappmessage.html) base model, to easily determine whether the message is a control in-app-message.

##### Changed
- Improved the reliability of in-app message impression logging in edge cases.

## 4.4.0

##### Added
- A message is now logged if an IAM is triggered but not displayed because neither `automaticallyShowInAppMessages()` nor `subscribeToInAppMessage()` were called.

##### Changed
- IndexedDB connections now close after a transaction has been completed.

##### Fixed
- Fixed an issue introduced in 4.0.0 where In-App Message closing animations did not work as expected.

## 4.3.0

##### Added
- Added [`brazeBridge.changeUser(id: string, sdkAuthSignature?: string)`](https://www.braze.com/docs/user_guide/message_building_by_channel/in-app_messages/customize/html_in-app_messages/#bridge) to HTML In-App Messages.
- Added the ability to include a custom pathname in the `baseUrl` [initialization option](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initializationoptions).

## 4.2.1

##### Fixed
- Fixed an issue introduced in 4.0.3, where IAM displays could sometimes fail due to an internal race condition.

## 4.2.0

##### Added
- Added support for Content Cards to evaluate Retry-After headers.

## 4.1.0

##### Added
- Added a method [`braze.logContentCardImpressions()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#logcontentcardimpressions) to log that the user saw the given Content Cards. This method is equivalent to calling [`braze.logCardImpressions()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#logcardimpressions) with parameter `forContentCards = true`.

##### Fixed
- Fixed an issue where calling `unregisterPush()` when the user is already unregistered would fail to execute the success callback function.

## 4.0.6

##### Fixed
- Fixed an issue introduced in 4.0.0 that incorrectly failed to display valid IAMs with an unknown Braze Action type error.

## 4.0.5

##### Fixed
- Fixed an issue introduced in 4.0.0 that prevented the SDK from running with certain rollup.js configurations.

## 4.0.4

##### Changed
- Deprecated and changed the obsolete [logContentCardsDisplayed](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#logcontentcardsdisplayed) method to a no-op. Card impressions should be logged using [logCardImpressions](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#logcardimpressions).

##### Fixed
- Fixed an issue introduced in 4.0.0 that prevented control in-app message impressions from being logged.

## 4.0.3

##### Fixed
- Fixed an issue introduced in 4.0.0 where Safari push did not work unless the full `baseUrl` (e.g. `https://sdk.iad-01.braze.com/api/v3`) was specified in the initialization options.
- The SDK will now ignore In-App Messages containing a push prompt Braze Action for users who have already registered for push or whose browser does not support push.

## 4.0.2

##### Changed
- Cookies set by the Braze Web SDK now expire after 400 days per the recommendation of the [HTTP Working Group's draft RFC 6265](https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#section-4.1.2.2)

##### Fixed
- Removed usages of the nullish coalescing operator for better compatibility with various webpack configurations.

## 4.0.1

##### Fixed
- The `created` field is now set for `Card` objects when using Content Cards.
- Added `"type": "module"` to the package.json so frameworks like Next.js recognize the SDK as an ES Module.

## 4.0.0

##### ⚠️ Breaking
- See our [upgrade guide](https://github.com/braze-inc/braze-web-sdk/blob/master/UPGRADE_GUIDE.md) for more information on how to migrate from v3.
- The `appboy-web-sdk`, `@braze/web-sdk-core`, and `@braze/web-sdk-no-amd` npm packages are deprecated in favor of the `@braze/web-sdk` package and will no longer receive updates.
- The SDK's exported object has been renamed from `appboy` to `braze`. CDN users must update their loading snippet when upgrading to 4.0.
- The file name for the bundled version of the SDK has changed to `braze.min.js`. CDN users must ensure that the URL points to this new file name when upgrading to 4.0.
- The Braze Web SDK now supports importing individual features and methods as native ES Modules that can be tree-shaken. For example, if you only use In-App Messages with a custom UI, you can now import our `InAppMessage` classes and `subscribeToInAppMesssage()` and Javascript module bundlers such as webpack will remove any unused code. If you prefer to continue using a compiled version of the SDK, it can be found through our CDN.
- The prefix for SDK logs has changed from `Appboy` to `Braze`. If you use the `Appboy` prefix as a filter in your logging tools, you should update it to include `Braze`.
- As a result of the above changes, many of our method signatures have changed. See our [upgrade guide](https://github.com/braze-inc/braze-web-sdk/blob/master/UPGRADE_GUIDE.md) for more information on how to migrate.
- Dropped support for Internet Explorer.

##### Changed
- Updated default z-index of `InAppMessage` to 9001. This can be still be overwritten using the [inAppMessageZIndex](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initializationoptions) initialization option.

##### Added
- Introduced support for the new Braze Actions feature. When displaying In-App Messages and Content Cards through our built-in UI, this feature requires no additional code.
- Added [`braze.handleBrazeAction()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#handlebrazeaction) to handle Braze Action URLs when using a custom UI.

## 3.5.1

##### Changed
- Added Shopify to [`BrazeSdkMetadata`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.brazesdkmetadata.html)

## 3.5.0

##### Added
- Added [`appboy.addSdkMetadata()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#addsdkmetadata) to allow self reporting of SDK Metadata fields via the [`appboy.BrazeSdkMetadata`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.brazesdkmetadata.html) enum.
- Deprecated the [`appboy.stopWebTracking()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#stopWebTracking) method in favor of using [`appboy.disableSDK()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#disableSDK), which has the same functionality.
- Deprecated the [`appboy.resumeWebTracking()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#resumeWebTracking) method in favor of using [`appboy.enableSDK()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#enableSDK), which has the same functionality.
- Added getter method [`appboy.isDisabled()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#isDisabled) to determine if SDK has been disabled via [`appboy.disableSDK()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#disableSDK).
- Accessibility improvements to in-app messages with scrollable text.

##### Changed
- Calling `changeUser()` with an SDK Authentication signature will now update the signature when it is called with the current user's ID.

##### Fixed
- Fixed an issue where removing the `ab-pause-scrolling` class was not sufficient to allow scrolling on touchscreen devices during the display of an in-app message.

## 3.4.1

##### Fixed
- Fixed an issue introduced in 3.3.0 where event timestamps could become incorrect when a network request fails and the event is placed back in the queue.

## 3.4.0

##### Added
- Added [`User.addToSubscriptionGroup()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.user.html#addtosubscriptiongroup) and [`User.removeFromSubscriptionGroup()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.user.html#removefromsubscriptiongroup) to manage SMS/Email Subscription Groups.

##### Changed
- Cards with subclass [`ControlCard`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.controlcard.html) are no longer counted in [`Feed.getUnreadCardCount`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.feed.html#getunreadcardcount) or [`ContentCards.getUnviewedCardCount`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.contentcards.html#getunviewedcardcount).

##### Fixed
- Fixed an issue where globally-scoped CSS could cause the text and close button of In-App Messages to display incorrectly when using the built-in UI.
- Fixed an accessibility issue with Content Cards where some feed children did not have the `article` role.
- Fixed an issue where service worker network requests, including push click analytics, could not be made when SDK Authentication is enabled. If SDK Authentication is enabled and the service worker does not have a valid authentication signature, push click analytics will now be sent to the backend on the user's next session.
- Fixed an issue where network requests that failed due to SDK Authentication errors did not use exponential backoff for retries.
- Fixed an issue where iPads would be detected as Mac devices when using the "Request Desktop Site" iOS feature.
- Fixed an issue where `aspectRatio` had an incorrect type in `Card` subclasses.

## 3.3.0

##### Added
- Introduced support for new SDK Authentication feature.
- Introduced an [`inAppMessageZIndex`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#initializationoptions.__type.inappmessagezindex) initialization option that allows you to easily customize the z-index of In-App Messages displayed by the built-in UI.
- Added `successCallback` and `errorCallback` parameters to [`requestContentCardsRefresh`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#requestcontentcardsrefresh).
- The SDK now logs deprecation warnings for deprecated methods and initialization options when logging is enabled.
- Added support for `brazeBridge`, which has the same API as `appboyBridge`. `appboyBridge` is now deprecated but will continue to function.
- Introduced support for the upcoming nested properties feature in [`appboy.logCustomEvent`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#logcustomevent) and [`appboy.logPurchase`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#logpurchase).

##### Changed
- Removed `appboyQueue` replay snippet from the `npm` publication of the SDK. This avoids possible race conditions when referencing the SDK simultaneously from `npm` and the CDN, and removes use of `eval` from the `npm` package
- [`appboy.logCustomEvent`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#logcustomevent) and [`appboy.logPurchase`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#logpurchase) now impose a 50KB limit on custom properties. If the supplied properties are too large, the event is not logged.
- Deprecated the [`trackLocation`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#tracklocation) method in favor of using the native Geolocation API and passing the location data to ['User.setLastKnownLocation`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.user.html#setlastknownlocation). See our [public docs](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/location_tracking/) for more information.
- Deprecated the [`enableHtmlInAppMessages`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#initializationoptions.__type.enablehtmlinappmessages) initialization option in favor of [`allowUserSuppliedJavascript`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#initializationoptions.__type.enablehtmlinappmessages). These options are functionally equivalent and no other changes are required.

##### Fixed
- Fixed incorrect typing for [`User.setCountry`](https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.user.html#setcountry).
- Added missing `dismissed` property to TypeScript definition and docs for `Card` subclasses.

## 3.2.0

##### Added
- Added an optional `parentNode` parameter to [`appboy.display.hideContentCards`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.display.html#hidecontentcards) that allows you to specify a particular Content Cards feed to hide.

##### Changed
- Cookies set by the SDK are now renewed when a new session is started. This fixes an issue where the SDK would stop setting cookies that had been deleted or expired when identification information existed in localStorage, preventing cross-subdomain identification from functioning in certain circumstances.
- Increased clickable area of all buttons in the built-in UI to be at least 45x45px to comply with mobile accessibility best-practices. This includes some minor changes to the Content Cards and News Feed UI to accommodate the larger buttons.

##### Fixed
- Fixed an issue where some network requests fail on websites using certain libraries that overwrite the native Promise object.

## 3.1.2

##### Fixed
- Added default `alt` text to In-App Message and Content Card images to improve screen-reader experience.
- Improved the display of different aspect ratios for `ClassicCard` images when using the built-in UI.
- Fixed a regression introduced in 3.1.0 where the SDK would sometimes make multiple network requests when starting a new session.
- Fixed an issue where globally-scoped `float` CSS caused certain elements of the built-in UI to display incorrectly.
- Fixed an incorrect TypeScript definition for `DeviceProperties`.

## 3.1.1

##### Fixed
- Fixed an issue where a javascript error could be thrown when showing Content Cards or In-App Messages in certain environments where `this` is undefined.

## 3.1.0

##### Added
- Added a [`devicePropertyAllowlist`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#initializationoptions.__type.devicepropertyallowlist) initialization option. This new initialization option has the same functionality as `devicePropertyWhitelist`, which is now deprecated and will be removed in a future release.

##### Changed
- Relaxed the email address validation used by the SDK in favor of the more accurate Braze backend validation. Valid addresses with unusual structures or international characters which were previously rejected will now be accepted.

##### Fixed
- Fixed an issue where the SDK was improperly handling session starts when switching between subdomains, causing a short delay in triggering in-app messages.

## 3.0.1

##### Fixed
- Fixed incorrect type definitions for the `extras` property of Card and In-App Message classes.
- Fixed a regression introduced in 2.5.0 where the functionality of the `manageServiceWorkerExternally` and `disablePushTokenMaintenance` initialization options were swapped.

## 3.0.0

##### ⚠️ Breaking
- The Braze Web SDK now comes bundled with TypeScript definitions in the `@braze` NPM packages. The TypeScript defintions include documentation and autocomplete in IDEs that support it, even if your project does not use TypeScript.
- The following breaking changes have been made to allow for a better TypeScript experience:
  - The `ab` namespace has been removed. To migrate from previous integrations, you can simply find and replace all references to `appboy.ab` with `appboy`.
  - `InAppMessage.Button` has been renamed to `InAppMessageButton`. To migrate from previous integrations, you can simply find and replace all references to `InAppMessage.Button` with `InAppMessageButton`.
- Due to the above changes, the SDK loading snippet has been updated. If you integrate the Braze Web SDK using the CDN, you must [update the loading snippet](https://github.com/Appboy/appboy-web-sdk#Alternative-CDN-installation) when upgrading to 3.0.
- The `baseUrl` option to [`appboy.initialize`](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html#initialize) is now required to initialize the SDK. If your integration did not already provide the `baseUrl` option, it should now be set to the previous default value of `sdk.iad-01.braze.com` (e.g, `appboy.initialize('YOUR-API-KEY', { baseUrl: 'sdk.iad-01.braze.com' });`).
- Removed the `messagingReadyCallback` from `openSession` and `changeUser`. Since 2.3.1, the SDK handles events that occur during the asynchronous portion of these calls gracefully, and ensures internally that only the latest messaging will be triggered. Any code previously being invoked inside this callback may be safely placed directly after the openSession or changeUser call.

##### Changed
- The Braze Web SDK has brand new docs, which can be found [here](https://js.appboycdn.com/web-sdk/latest/doc/modules/appboy.html). Any URLs from the previous docs will redirect to the appropriate location.

##### Fixed
- Fixed an issue where browser version was incorrectly reported in Android Webview.

## 2.7.1

##### Fixed
- Fixed a regression introduced in 2.5.0 where the functionality of the `manageServiceWorkerExternally` and `disablePushTokenMaintenance` initialization options were swapped.

## 2.7.0

##### Added
- Added [`appboyBridge.getUser().addAlias(alias, label)`](https://www.braze.com/docs/user_guide/message_building_by_channel/in-app_messages/customize/#javascript-bridge) to HTML In-App Messages.

##### Changed
- The Braze Web SDK now uses [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/#interface) for device detection when available. When using User-Agent Client Hints, browser version detection is limited to the significant version (e.g., 85 instead of 85.0.123.0). Note that this upgrade will be necessary to ensure accurate operating system detection in upcoming versions of Chromium-based browsers.
- Cards received from the Content Cards test send feature of the Braze dashboard are no longer removed when the SDK receives an update to the user's Content Cards.

##### Fixed
- Removed code that could result in javascript errors in certain webpack configurations where the `global` object is not accessible by the SDK.
- Fixed an issue where the `ab.Card` methods `removeAllSubscriptions`, `removeSubscription`, `subscribeToClickedEvent`, and `subscribeToDismissedEvent` were minified, resulting in `undefined` when called.

## 2.6.0

##### Added
- Introduced new NPM packages under the `@braze` scope. The core and full versions of the SDK as well as the service worker are now published in their own packages, resulting in a drastically reduced install size compared to the `appboy-web-sdk` package. This is not a breaking change for existing NPM integrations and we will continue to publish the `appboy-web-sdk` package to maintain backwards compatibility. See the README for integration details.
- Added [`appboyBridge.getUser().setLanguage(language)`](https://www.braze.com/docs/user_guide/message_building_by_channel/in-app_messages/customize/#javascript-bridge) to HTML In-App Messages.

##### Changed
- The new HTML In-App Message type now allows multiple clicks to be logged for a given message.

##### Fixed
- Made push-related methods more defensive against edge-cases where `Notification` is not defined.
- Fixed an issue where unexpected backend responses could result in a javascript error.
- Fixed an issue in recent versions of Safari where calling `appboy.registerAppboyPushMessages` would throw a javascript error if the user did not allow websites to ask for permission to send notifications.

## 2.5.2

##### Fixed
- Fixed an issue that could cause some prerender user agents to fail to be appropriately recognized as a web crawler.

##### Changed
- Data will now be flushed to the Braze backend every 3 seconds on Safari (down from 10 seconds) due to new privacy features that clear localStorage after 7 days of inactivity.

## 2.5.1

##### Fixed
- Fixed an issue in Content Cards where `getUnviewedCardCount()` returns `undefined`. This issue was introduced in 2.5.0.

## 2.5.0

##### Added
- Introduced support for upcoming HTML In-App Message templates.
- Added [`appboyBridge.logClick()`](https://www.braze.com/docs/user_guide/message_building_by_channel/in-app_messages/customize/#javascript-bridge) to HTML In-App Messages.
- Expanded browser detection to include UC Browser and newer versions of Microsoft Edge that are based on Chromium.
- Added a new variant of the SDK that allows sites using RequireJS to load the SDK through another method, such as NPM or a `<script>` tag. See the [README](https://github.com/Appboy/appboy-web-sdk#alternative-no-amd-installation) for more information.
- Added an optional callback to [`appboy.requestImmediateDataFlush`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.requestImmediateDataFlush) that is invoked when the flush is complete.
- Added Czech and Ukrainian language support for Braze UI elements.

##### Changed
- Decreased the size of the service worker by 20%.

##### Fixed
- Fixed an issue where refreshing Content Cards or News Feed while the feed is showing could cause multiple impressions to be logged for the same card.
- Fixed a bug where calling `setEmail` with an email address containing capital letters could sometimes be incorrectly rejected.
- Fixed a bug where refreshing Content Cards would incorrectly set the `clicked` attribute of the cards to `false`.
- Fixed a bug where providing `serviceWorkerLocation` with an absolute URL containing a protocol and hostname would result in an error being logged when calling `appboy.registerAppboyPushMessages`.
- Fixed an issue where calling `appboy.registerAppboyPushMessages` in recent versions of Firefox would not show the notification prompt.
- Fixed a timing issue where creating a reference to `window.appboy` and then using that reference asynchronously could sometimes cause javascript errors when using the default integration snippet.

## 2.4.3

##### Fixed
- Fixed a bug that would cause `appboy.registerAppboyPushMessages` to fail when called immediately on a user's first session.
- Fixed an issue where using both the `manageServiceWorkerExternally` and `serviceWorkerLocation` initialization options would cause the SDK to not register for push if the provided service worker location was in a sub-directory.
- Fixed an issue where `appboy.registerAppboyPushMessages` could throw an exception if an error occured while updating a previously registered service worker.

## 2.4.2

##### Fixed
- Fixed a bug introduced in 2.4.1 that would focus inline feeds, causing the page to scroll when content cards are shown out of view.

## 2.4.1

#### Breaking
- Accessibility updates in this release have changed headers to use `h1` tags and close buttons to use `button` tags (instead of `div` and `span` respectively). As a result, any CSS customizations which rely upon `div` or `span` elements within `.ab-feed` or `.ab-in-app-message` should be updated to use classes instead.

##### Added
- Introduced a [`dismissCard`](https://js.appboycdn.com/web-sdk/latest/doc/ab.Card.html#dismissCard) method that can be used to dismiss a card programmatically.
- Improved accessibility throughout the SDK:
  - Used `h1` tags for headers and `button` tags for close buttons
  - Added ARIA attributes
  - Improved the experience when tabbing through elements
  - We now restore the user's previously focused element after closing In-App Messages

##### Fixed
- Fixed a bug introduced in 2.4.0 that could cause a javascript error in integrations that only include the core library. This error would occur when a Content Card with a URL is received.

## 2.4.0

##### Breaking
- Removed the Feedback feature and `appboy.submitFeedback` method from the SDK.

##### Added
- Improved browser detection to account for the Smart TV landscape.
- Added logic to automatically renew push subscriptions when they are expired or older than 6 months.
- Introduced a `contentSecurityNonce` initialization option for sites with a Content Security Policy. See the [`appboy.initialize`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.initialize) documentation for more info.
- Introduced a `disablePushTokenMaintenance` initialization option for sites that have users with Web Push permission granted, but do not wish to use Web Push with Braze. See the [`appboy.initialize`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.initialize) documentation for more info.
- Introduced a `manageServiceWorkerExternally` initialization option for sites that have their own service worker already. See the [`appboy.initialize`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.initialize) documentation for more info.
- Deprecated the `subscribeToNewInAppMessages` method in favor of the new [`subscribeToInAppMessage`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#.subscribeToInAppMessage) method, which has a simpler interface.

##### Fixed
- Improved support for In-App Messages on “notched” devices (for example, iPhone X, Pixel 3XL).
- The logic that prevents the page behind a modal or fullscreen In-App Message from scrolling now functions correctly on iOS.
- Fixed a caching bug that could cause In-App Messages, Content Cards, and News Feed Cards received by one instance of the Braze SDK to not be seen by another simultaneously running instance of the Braze SDK.
- Fixed a bug that would cause redundant network activity for new users on their first session ever.
- Fixed a bug that would cause push registration that occurs immediately on a user's first session to fail.
- Introduced the `allowUserSuppliedJavascript` initialization option, which is an alias for the existing `enableHtmlInAppMessages` option, and disabled the ability to use `javascript:` URIs in In-App Message and Content Card click actions unless one of these options is provided.

##### Changed
- Improved the look and feel of Content Card dismissals and Content Card and News Feed animations to match the latest In-App Message styles.
- The `baseUrl` configuration option for `appboy.initialize` is now more flexible in the values that it can accept.
- Cookies set by the Braze Web SDK now expire after 1 year.

## 2.3.4

##### Fixed
- Fix regression introduced in 2.3.3 that could prevent analytics from being logged from the service worker.

## 2.3.3

##### Fixed
- Improved some In-App Message CSS styles to be more resilient against conflicts with any page-wide CSS.
- Improved the resiliency of the code that allows body content to scroll again when modal or fullscreen in-app messages are dismissed.

## 2.3.2

##### Added
- Added support for an improved integration snippet which is capable of stubbing the interface before the SDK loads in Google Tag Manager.

## 2.3.1

##### Added
- Introduced new `closeMessage` method on `ab.InAppMessage` objects to enable integrations to programmatically close messages if desired.
- The Braze Web SDK now automatically enqueues trigger events that occur while triggers are being synced with the Braze backend, and replays them when the sync is complete. This fixes a race condition that could cause users to inadvertantly miss messages when trigger events occur directly after calling `openSession` or `changeUser`. This change obsoletes usage of the `messagingReadyCallback`, which is now deprecated (but will continue to function).

##### Fixed
- Fixed an issue which prevented tall `ab.HtmlMessage` objects from scrolling on iOS.
- Fixed "Object doesn't support this action" error in Internet Explorer 11 or older when showing `ab.HtmlMessage` objects.

## 2.3.0

##### Added
- Improved the look and feel of In-App Messages to adhere to the latest UX and UI best practices. Changes affect font sizes, padding, and responsiveness across all message types. Now supports button border styling.

##### Fixed
- This feature, which regressed in 2.1.0, has been restored: when you call `appboy.openSession`, if the user has previously granted the site permission to send push, Braze will now automatically send the user's push token to Braze backend. This will allow users to continue to receive push messages if they manually remove push permission and then subsequently manually reenable it - and will also cause user push tokens to automatically migrate to Braze over time when moving to Braze from a previously-integrated third-party push provider.

## 2.2.7

##### Added
- HTML In-App Messages now emit an `ab.BridgeReady` event when the `appboyBridge` variable is available for use inside your HTML, allowing you to use `appboyBridge` immediately when an in-app message is shown. To utilize this event in your HTML In-App Messages, use `window.addEventListener('ab.BridgeReady', function() {/*Use appboyBridge here*/}, false);`.

##### Changed
- Changed usages of `Date.now()` to `new Date().valueOf()` to allow the Braze SDK to sit side-by-side with legacy 3rd party libraries that monkey-patched `Date.now()` before ECMASCRIPT 5 defined it.

## 2.2.6

##### Added
- Added `clicked` property to Content Cards which returns true if this card has ever been clicked on this device.

##### Changed
- Improved in-app message triggering logic to fall back to lower priority messages when the Braze server aborts templating (e.g. from a Connected Content abort in the message body, or because the user is no longer in the correct Segment for the message)
- Improved in-app message triggering logic to retry user personalization when communication with the Braze server fails due to network connectivity issues.
- The Braze Web SDK now only stores cookies for the most recently-used API Key (app). This reduces cookie storage usage for domains that are configured against many Braze apps.

## 2.2.5

##### Added
- Added `devicePropertyWhitelist` property to the options for `appboy.initialize()`, which can be used to filter what device properties get collected.

## 2.2.4

##### Added
- Added support for richer custom styling through CSS in in-app messages.

##### Changed
- Subtle visual polish to the News Feed and Content Cards

## 2.2.3

##### Added
- Added support for tracking custom location attributes. See the [`ab.User.setCustomLocationAttribute`](https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#setCustomLocationAttribute) documentation for more information.
- When calling `appboy.registerAppboyPushMessages` with a `deniedCallback`, that `deniedCallback` will now be invoked (with a `temporary` parameter of `true`) for temporary denials, where the browser has automatically denied permission on behalf of the user after multiple ignored attempts to register for push, but will allow attempts again in the future - probably in about a week.
- Added `appboyBridge.web.trackLocation()` in HTML in-app messages. This enables HTML in-app message soft location tracking prompts.

##### Fixed
- News Feed and Content Cards clicks and impressions will now be logged multiple times for a given card (if they in fact occur multiple times). Impressions will still only be logged for a given card once per viewing of the feed (regardless of how many times it scrolls in and out of view).
- Improved logic around IndexedDB to better catch and log errors (prevents security errors with disabled cookies on certain browsers, or from Safari's "Intelligent Tracking Prevention" when integrated in an iFrame).
- Worked around [this Chrome Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=811403) which could cause device detection to throw "Unsupported time zone specified undefined" on Linux-based systems with certain settings.
- Fixed an issue where the messagingReadyCallback would not get fired if changeUser was called with an empty ID.

##### Changed
- Data will now be flushed to the Braze backend every three seconds when localStorage is not available.
- Improved triggered in-app message re-eligibility logic to better handle templating failures.


## 2.2.2

##### Added
- Updated push token handling to automatically remove blocked users from the pushable audience on session start.

##### Fixed
- Fixed issue in Content Cards where the `getUnviewedCardCount` method on `ab.ContentCards` could not be invoked properly.
- Fixed a bug where the [`addAlias` method](https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#addAlias) was returning an object instead of a boolean value.
- Fixed issue which could prevent Content Cards from syncing properly on IE 11 and Safari.

##### Changed
- Various user attribute methods now support setting null (`setFirstName`, `setLastName`, `setCountry`, `setHomeCity`, `setPhoneNumber`, `setEmail`, `setGender`, `setLanguage`, and `setDateOfBirth`) by passing in an explicit null value.

## 2.2.1

##### Fixed
- Prevent push received/clicked analytics from being sent to the Braze backend when `appboy.stopWebTracking` has been called.

## 2.2.0

##### Added
- Introduced support for Content Cards, which will eventually replace the existing News Feed feature and adds significant capability.
- Added support for web push on Accelerated Mobile Pages (AMP). See https://www.braze.com/documentation/Web/#amp-support for setup information.

##### Fixed
- Fixed an issue where in-app messages triggered on session start could potentially be templated with the old user's attributes.

##### Removed
- Removed `appboy.requestInAppMessageRefresh()` and support for legacy in-app messages - these were long-deprecated and have been supplanted by [triggered in-app messages](https://www.braze.com/documentation/Web/#in-app-messages-triggered).

## 2.1.1

##### Fixed
- Prevent push received/clicked analytics from being sent to the Braze backend when `appboy.stopWebTracking` has been called.

## 2.1.0

##### Added
- Added [`appboy.wipeData()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#wipeData) to allow deletion of locally stored SDK data. After calling this method, users will appear as a new anonymous user on a new device.

##### Fixed
- Improved push registration and unregistration
  - [`appboy.registerAppboyPushMessages`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#registerAppboyPushMessages) will now set the user's subscription status to "OPTED_IN" only at times when they've just accepted the permission prompt.
  - [`appboy.unregisterAppboyPushMessages`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#unregisterAppboyPushMessages) will now persist across sessions and user changes (until [`appboy.registerAppboyPushMessages`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#registerAppboyPushMessages) is called again).
  - [`appboy.registerAppboyPushMessages`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#registerAppboyPushMessages) will cause push prompts to be shown shown more reliably in situations where the user has ignored them in the past. Logging around dismissing (as opposed to accepting or blocking) push prompts has been improved.
- Fixed a bug with [`appboy.changeUser`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#changeUser) where `messagingReadyCallback` would not fire when the supplied `userId` was the current user.

##### Changed
- Updated from FontAwesome 4.3.0 to FontAwesome 4.7.0. Integrations that wish to maintain older versions should pass in `doNotLoadFontAwesome` as `true` during initialization and load their desired version.
- The Braze SDK will automatically load FontAwesome unless `doNotLoadFontAwesome` is explicitly passed in as `true` during initialization, regardless of whether fontawesome.css or fontawesome.min.css are already on the page.

## 2.0.9

##### Fixed
- Prevent push received/clicked analytics from being sent to the Braze backend when `appboy.stopWebTracking` has been called.

## 2.0.8

##### Added
- Added defensive guards against any possibility of sessions expiring in less than 1 second or of creating multiple session events in rapid succession if scripted in parallel across many open tabs.


## 2.0.7

##### Added
- Added support for [Voluntary Application Server Identification (VAPID) for Web Push](https://tools.ietf.org/html/rfc8292):
  - Will be required for Microsoft Edge's upcoming Web Push support, and possibly other browsers in the future.
  - Allows importing of VAPID-enabled push tokens generated by other push providers, given the corresponding keypair (support@braze.com).
  - Happens transparently in the background and does not require an integration update.
  - Once the browser landscape has sufficiently matured, this will eventually obviate the need to supply a `gcm_sender_id` in your site's `manifest.json`.

##### Changed
- [`appboy.unregisterAppboyPushMessages`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#unregisterAppboyPushMessages) now accepts optional `successCallback` and `errorCallback` arguments to signal completion, as it functions asynchronously.

## 2.0.6

##### Fixed
- Fixed a javascript error introduced in 2.0.5 when logging in the service worker.

## 2.0.5

##### Added
- Added Location Tracking - See [`appboy.trackLocation()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#trackLocation) for more information.
- `appboy.user.setGender` now supports more gender options. See the [`Genders` enum documentation](https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#toc4) for more information.
- Added [`appboy.stopWebTracking()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#stopWebTracking) and [`appboy.resumeWebTracking()`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#resumeWebTracking) to allow user opt-outs.
- Improved accessibility for in-app messages and news feed by focusing on elements where appropriate, allowing users to tab through various buttons, and adding labels where appropriate.

##### Fixed
- Fixed a bug that caused `appboy.display.automaticallyShowNewInAppMessages()` not to function correctly when called after calling `appboy.destroy()` and then calling `appboy.initialize()` a second time.
- The `openSession` and `changeUser` methods now take a `messagingReadyCallback` that executes when the Braze Web SDK is ready to show messaging data to this user. This fixes a race condition where custom events could be logged before in-app messages had been fetched from the Braze backend and users would not see intended messaging.

##### Changed
- Deprecated the `submitFeedback` method. The feedback feature is disabled for new accounts, and will be removed in a future SDK release.

## 2.0.4

##### Changed
- Renamed documentation references from Appboy to Braze. This is not a breaking change.

## 2.0.3

##### Fixed
- Fixed a null reference error when replaying calls made using the new integration snippet on IE 11.

## 2.0.2

##### Fixed
- Fixed an issue with our minification that would cause the Braze Web SDK to leak polyfill functions into the global namespace.

## 2.0.1

##### Fixed
- Fixed automatic css loading when used in combination with the doNotLoadFontAwesome initialization option.

## 2.0.0

##### Breaking
- Braze now automatically loads required CSS styles. You must remove all references to appboy.min.css from your site.
- The `getUserId` method now takes a callback which it invokes with the userId, instead of returning a value directly. This is necessary to ensure the proper replaying of calls made to `appboy` before the SDK has fully loaded. Where before, you would do `var userId = appboy.getUser().getUserId();`, now do `appboy.getUser().getUserId(function(userId) { console.log(userId); })`  See the [`getUserId method documentation`](https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#getUserId) for more information.
- The `getDeviceId` method now takes a callback which it invokes with the deviceId, instead of returning a value directly. This is necessary to ensure the proper replaying of calls made to `appboy` before the SDK has fully loaded. See the [`getDeviceId method documentation`](https://js.appboycdn.com/web-sdk/latest/doc/module-appboy.html#getDeviceId) for more information.

##### Changed
- [The default Braze integration snippet](https://github.com/Appboy/appboy-web-sdk#getting-started) has been updated for best-practices compliance, resilience, and performance. Using this new snippet, calls may be made to `appboy` before the SDK has fully loaded, and will be replayed automatically when the SDK loads. We recommend that you update your site's integration to the new snippet for optimal behavior, but this is not a breaking change, and is not required.

##### Added
- If you are using a front-end packager such as [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/), [the NPM integration instructions](https://github.com/Appboy/appboy-web-sdk#Alternative-NPM-installation) have been updated to meet your use-case.

## 1.6.14

##### Added
- Added the user agent for the https://prerender.io/ crawler to the list of known web crawlers.
- Added [`ab.User.setLanguage`](https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#setLanguage) method to allow explicit control over the language you use in the Braze dashboard to localize your messaging content.

##### Fixed
- Fixed array validation on pages where the Array type has been modified by other scripts.

##### Changed
- Marked the 'touchstart' listener in in-app messages as 'passive' for performance and PWA compliance.

## 1.6.13

##### Added
- Contains service-worker support for Web Push notifications that require user interaction to be dismissed.

##### Fixed
- Improved time zone recognition on modern browsers to prevent possible ambiguity between different zones with similar UTC offsets.
- Broadened detection of the Android OS to better recognize newer hardware and as-of-yet unreleased hardware on an ongoing basis.
- Fixed data-formation error when pending additions or removals to a custom attribute array were re-enqueued following a Braze backend outage or otherwise failed data flush.

##### Changed
- We now allow a value of 0 for the `minimumIntervalBetweenTriggerActionsInSeconds` option for `appboy.initialize`

## 1.6.12

##### Added
- Introduced `noCookies` option. By default, the Braze SDK will store small amounts of data (user ids, session ids), in cookies. This is done to allow Braze to recognize users and sessions across different subdomains of your site. If this presents a problem for you, pass `true` for this option to disable cookie storage and rely entirely on HTML 5 localStorage to identify users and sessions. The downside of this configuration is that you will be unable to recognize users across subdomains of your site.
- Added user aliasing capability. Aliases can be used in the API and dashboard to identify users in addition to their ID.  See the [`addAlias method documentation`](https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#addAlias) for more information.

##### Fixed
- Fixed issue in which the local cache of seen in-app messages and news feed cards was being cleared when the anonymous user was identified, allowing certain items to be retriggered or appear unread.

## 1.6.11

##### Added
- When you call `appboy.openSession`, if the user has previously granted the site permission to send push, Braze will now automatically send the user's push token to Braze backend. This will allow users to continue to receive push messages if they manually remove push permission and then subsequently manually reenable it - and will also cause user push tokens to automatically migrate to Braze over time when moving to Braze from a previously-integrated third-party push provider.

##### Fixed
- IMPORTANT: Due to a behavioral change in Chrome 59, to reliably receive notifications, you must update the service worker from https://js.appboycdn.com/web-sdk/1.6/service-worker.js.
- `appboy.display.automaticallyShowNewInAppMessages()` may now be safely called multiple times on the same `appboy` instance.

## 1.6.10

##### Fixed
- A bug in our documentation for soft push prompts could cause Control Group stats to fail. If you previously implemented soft push prompts, please refer to the latest version of our documentation: https://www.braze.com/documentation/Web/#soft-push-prompts

## 1.6.9

##### Added
- Added support for `appboyBridge.web.registerAppboyPushMessages` to allow HTML in-app messages to request push permission from the user.

## 1.6.8

##### Fixed
- Fixed "Notification is not defined" error when calling `appboy.isPushPermissionGranted`/`appboy.isPushBlocked` on Chrome versions prior to 46.

## 1.6.7

##### Added
- The Braze Web SDK now supports HTML content in-app messages. For your security, these must be enabled by supplying the `enableHtmlInAppMessages` configuration option when calling `appboy.initialize`.

##### Fixed
- The News Feed css is now defensive against any global box-sizing css rules that may exist on your site, and handles classic card image styling more gracefully.
- On mobile devices, Fullscreen in-app messages' close buttons are sized relative to the entire device - this ensures touchable targets on high-resolution phones.
- Improved positioning of Modal in-app messages to ensure visibility and attractive positioning across all browsers.

## 1.6.6

##### Fixed
- Fixed a data-storage issue where a small number of users impacted by the issue fixed in 1.6.5 may record a new session on page load after upgrading to 1.6.5.

## 1.6.5

##### Fixed
- Cookies are now stored with path=/ for sitewide accessibility, ensuring that identification persists sitewide in all situations. This fixes an issue introduced in 1.6.0.

## 1.6.4

##### Added
- The Braze Web SDK now ignores web crawler activity by default - this saves datapoints, makes analytics more accurate, and may improve page rank (this change can be reversed with the `allowCrawlerActivity` initialization option).

##### Fixed
- Fixed an issue where in-app messages triggered off of push clicks wouldn't fire because the push click happened before the in-app message configuration was synced to the device.
- Increased defensiveness against corrupted localStorage or cookie data.

##### Changed
- Increased the size of in-app message close buttons on mobile browsers slightly to make an easier touch target.
- Updated `appboy.registerAppboyPushMessages` to flush subscriptions to the server immediately.

## 1.6.3

##### Changed
- Further improved the layout of Fullscreen in-app messages on short desktop screens.

## 1.6.2

##### Changed
- Deprecated the `appboy.isPushGranted` method in favor of the new `appboy.isPushPermissionGranted`. The old method was inappropriately testing whether the browser has an active push subscription, and not doing the intended test of whether the user has granted push **permission**. The old method will be removed in an upcoming release.

## 1.6.1

##### Fixed
- Improved Modal in-app message layout to prevent text-view scrolling until necessary.

##### Changed
- Deprecated the `safariWebsitePushId` parameter to `appboy.registerAppboyPushMessages` and `appboy.isPushGranted` in favor of the new `safariWebsitePushId` option to `appboy.initialize`. If you implement Safari push, you should convert your integration to use the new initialization option - support for the parameters will be removed in a future release. This is not yet a breaking change.
- Polished Fullscreen in-app message display on desktop browsers to reduce unused whitespace when the content is small enough not to scroll.

## 1.6.0

##### Fixed
- Fixed an edge-case that could cause SlideUp in-app messages to appear offscreen if many were triggered in rapid succession.

##### Changed
- Improved ability to consistently identify users, devices, and sessions across subdomains by preferring domain-wide cookies for ID storage (over the previously-preferred localStorage).

## 1.5.1

##### Fixed
- Fixed a rendering issue that could cause FullScreen in-app messages to appear partially off-screen on very short browser windows.

## 1.5.0

##### Added
- Added support for upgraded in-app messages including image-only messages, improved image sizing/cropping, text scrolling, text alignment, configurable orientation, and configurable frame color.
- Added support for in-app messages triggered on custom event properties, purchase properties, and in-app message clicks.
- Improved support for templated in-app messages.
- Added appboy.isPushGranted() method, useful for migrating existing push subscriptions from another third-party provider to Braze.
- Added language localization - language is detected automatically from the browser or can be specified explicitly via the `language` initialization option.

## 1.4.2

##### Added
- Added additional logging information for Safari push.

## 1.4.1

##### Added
- Added a more explicit error when attempting to call registerAppboyPushMessages on Safari without supplying a safariWebsitePushID.

## 1.4.0

##### Added
- Added support for Safari push messages.
- If you version your website, you may now optionally pass the version to Braze via the new `appVersion` initialization option.
- The News Feed now displays a timed-out message to users if the refresh fails (due to network or back end outages).
- Browser version will now be reported as part of the user's device information along with browser.
- Added ability to specify on a message-by-message basis whether in-app message clicks should open in a new tab or same tab.

##### Fixed
- Fixed an issue which caused emoji in web push messages to be broken on Firefox.

##### Changed
- Overhauled the browser detection code for improved reliability.

## 1.3.3

##### Added
  - Added a new `serviceWorkerLocation` initialization option. See JSDocs for more information.

## 1.3.2

##### Added
- Added support for Braze Feedback through the new appboy.submitFeedback method.

##### Fixed
- In-App Messages now track click analytics even when the click action is "None."
- Prevent Mobile Safari in Private Browsing mode from throwing an exception. This issue was introduced in 1.3.0.

## 1.3.1

##### Fixed
- Prevent Firefox from throwing an exception when in Private Browsing mode. This issue was introduced in 1.3.0.

## 1.3.0

##### Breaking
- The `inAppMessages` parameter to `appboy.subscribeToNewInAppMessages` subscribers may now contain `ab.ControlMessage` objects.

##### Added
- Adds support for triggered in-app messages.

##### Fixed
- Fixed a bug where news feed cards weren't always immediately being marked as read during scrolling.

##### Changed
- All iOS devices will now report their OS as "iOS" instead of "iPhone/iPod" or "iPad".

## 1.2.2

##### Fixed
- Fixed a javascript error that could occur when attempting to showFeed before the body has loaded.
- Made in-app message buttons explicitly display:inline-block so that they still display correctly if the site is styling buttons as display:block.

## 1.2.1

##### Fixed
- The service worker now reads Braze's backend URL from IndexedDB, which allows web push to function for clients with custom Braze endpoints.
- isPushBlocked now returns false when isPushSupported is false instead of erroring.

## 1.2.0

##### Breaking
- Restyled the news feed for improved legibility with a wider variety of card content. If you have existing news feed css customization this may be a breaking change.

##### Added
- Supports web push (on browsers implementing the w3c spec, with or without payloads - i.e. Chrome, Firefox).
- Introduced appboy.toggleFeed as a convenience method - it simply calls appboy.showFeed or appboy.destroyFeed based on whether there's currently a feed showing.

##### Fixed
- Buttonless FullScreen and Modal messages now respect body click actions from the dashboard.

##### Changed
- To reduce the datapoint impact of the high number of anonymous users on the web, in-app messages are no longer. automatically refreshed for new, anonymous users on their first openSession call. You can override this behavior and force an in-app message refresh by manually calling appboy.requestInAppMessageRefresh.
- In-App Messages may now be dismissed with a click on the greyed-out background of the page. This behavior may be prevented by passing requireExplicitInAppMessageDismissal:true to `appboy.initialize`.

## 1.1.1

##### Added
- Expanded browser detection to recognize more niche browsers.

##### Fixed
- Fixed an issue which would cause some Android devices to be detected as Linux.

## 1.1.0

##### Added
- Introduced `appboy.logFeedDisplayed`, which is called automatically when using `appboy.display.showFeed`.

##### Fixed
- Fixed a race condition which could cause events to be double-counted if the user had the site open in very many tabs at once.

##### Changed
- News feed and in-app message links now open in the same tab.

## 1.0.1

##### Fixed
- The SDK now logs correctly to the console when enableLogging is true (or toggleAppboyLogging has been called) and no custom logger has been specified.

## 1.0.0

##### Added
- Respect blacklisted custom events, attributes, and purchases.

##### Removed
- Removed the setBio method on ab.User in accordance with the deprecation of that user property across the Braze platform.

## 0.2.4

##### Fixed
- Fixed an issue which was causing the in-app message refresh throttle not to persist beyond a single page load.

## 0.2.3

##### Added
- Introduce `appboy.display.destroyFeed` method to allow integrators to implement a toggle feed button or otherwise hide the feed from code.

##### Fixed
- Prevent potential race condition which could cause news feed cards to not be marked as read for a short amount of time.

##### Removed
- Remove the news feed z-index. If necessary, the z-index can be set manually via CSS: `.ab-feed { z-index: }`.

## 0.2.2

##### Fixed
- Fix issue where already-cached news feed cards were not properly having impressions logged when the news feed was first shown.

##### Changed
- Minor improvements to In-App Message styling.

## 0.2.1

##### Added
- Give the news feed a z-index just below bootstrap modal backdrops.

##### Fixed
- Support legacy Internet Explorer (complete IE9 support, generally functional IE8 support).

##### Changed
- Ignore in-app messages with an unknown type (prevents future message types from be inappropriately displayed on versions of the sdk which don't yet support them).

## 0.2.0

##### Added
- Added Braze news feed support.

## 0.1.5

##### Fixed
- Correctly identify IE11.

## 0.1.4

##### Fixed
- Fixed issue where SlideUp message clicks with a clickAction of URI were not being respected.
- Fixed issue where Date custom attributes, custom event properties, and purchase properties were not being recognized as Dates by the Braze platform.

## 0.1.3

##### Added
- Add support for more purchase currencies, allow lowercase currencies.

##### Changed
- Use millisecond precision when logging events.

## 0.1.2

##### Changed
- Introduce optional doNotLoadFontAwesome initialization option and additionally don't load FontAwesome if fontawesome.css or fontawesome.min.css are already on the page.
- More minor improvements to In-App Message styling.

## 0.1.1

##### Changed
- Various minor improvements to SlideUp styling.

## 0.1.0

##### Added
- Support in-app messages.

## 0.0.5

##### Fixed
- Fixed critical issue which caused browser tabs to become unresponsive with no network connection.

## 0.0.4

##### Fixed
- Defend against NS_ERROR_FILE_CORRUPTED (corrupted browser SQLite database) and more generally against inability to use localStorage.

## 0.0.3

##### Changed
- Provide better backend error messages.

## 0.0.2

##### Fixed
- Fixed a bug where due to minification, locally stored data was version-specific.

## 0.0.1

##### Fixed
- Fixed bug where multibyte UTF-8 characters were being rejected for various attributes.
- Harden usage of localStorage slightly.

##### Changed
- Allow setLogger to be called before initialize.

## 0.0.0

- Initial release with core functionality.
