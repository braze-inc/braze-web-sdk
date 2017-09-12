## 1.6.13

##### Added
- Contains service-worker support for Web Push notifications that require user interaction to be dismissed.

##### Fixed
- Improved time zone recognition on modern browsers to prevent possible ambiguity between different zones with similar UTC offsets.
- Broadened detection of the Android OS to better recognize newer hardware and as-of-yet unreleased hardware on an ongoing basis.
- Fixed data-formation error when pending additions or removals to a custom attribute array were re-enqueued following an Appboy backend outage or otherwise failed data flush.

##### Changed
- We now allow a value of 0 for the `minimumIntervalBetweenTriggerActionsInSeconds` option for `appboy.initialize`

## 1.6.12

##### Added
- Introduced `noCookies` option. By default, the Appboy SDK will store small amounts of data (user ids, session ids), in cookies. This is done to allow Appboy to recognize users and sessions across different subdomains of your site. If this presents a problem for you, pass `true` for this option to disable cookie storage and rely entirely on HTML 5 localStorage to identify users and sessions. The downside of this configuration is that you will be unable to recognize users across subdomains of your site.
- Added user aliasing capability. Aliases can be used in the API and dashboard to identify users in addition to their ID.  See the [`addAlias method documentation`](https://js.appboycdn.com/web-sdk/latest/doc/ab.User.html#addAlias) for more information.

##### Fixed
- Fixed issue in which the local cache of seen in-app messages and news feed cards was being cleared when the anonymous user was identified, allowing certain items to be retriggered or appear unread.

## 1.6.11

##### Added
- When you call `appboy.openSession`, if the user has previously granted the site permission to send push, Appboy will now automatically send the user's push token to Appboy backend. This will allow users to continue to receive push messages if they manually remove push permission and then subsequently manually reenable it - and will also cause user push tokens to automatically migrate to Appboy over time when moving to Appboy from a previously-integrated third-party push provider.

##### Fixed
- IMPORTANT: Due to a behavioral change in Chrome 59, to reliably receive notifications, you must update the service worker from https://js.appboycdn.com/web-sdk/1.6/service-worker.js.
- `appboy.display.automaticallyShowNewInAppMessages()` may now be safely called multiple times on the same appboy instance.

## 1.6.10

##### Fixed
- A bug in our documentation for soft push prompts could cause Control Group stats to fail. If you previously implemented soft push prompts, please refer to the latest version of our documentation: https://www.appboy.com/documentation/Web/#soft-push-prompts

## 1.6.9

##### Added
- Added support for `appboyBridge.web.registerAppboyPushMessages` to allow HTML in-app messages to request push permission from the user.

## 1.6.8

##### Fixed
- Fixed "Notification is not defined" error when calling `appboy.isPushPermissionGranted`/`appboy.isPushBlocked` on Chrome versions prior to 46.

## 1.6.7

##### Added
- The Appboy Web SDK now supports HTML content in-app messages. For your security, these must be enabled by supplying the `enableHtmlInAppMessages` configuration option when calling `appboy.initialize`.

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
- The Appboy Web SDK now ignores web crawler activity by default - this saves datapoints, makes analytics more accurate, and may improve page rank (this change can be reversed with the `allowCrawlerActivity` initialization option).

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
- Added appboy.isPushGranted() method, useful for migrating existing push subscriptions from another third-party provider to Appboy.
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
- If you version your website, you may now optionally pass the version to Appboy via the new `appVersion` initialization option.
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
- Added support for Appboy Feedback through the new appboy.submitFeedback method.

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
- The service worker now reads Appboy's backend URL from IndexedDB, which allows web push to function for clients with custom Appboy endpoints.
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
- In-App Messages may now be dismissed with a click on the greyed-out background of the page. This behavior may be prevented by passing requireExplicitInAppMessageDismissal:true to appboy.initialize.

## 1.1.1

##### Added
- Expanded browser detection to recognize more niche browsers.

##### Fixed
- Fixed an issue which would cause some Android devices to be detected as Linux.

## 1.1.0

##### Added
- Introduced appboy.logFeedDisplayed, which is called automatically when using appboy.display.showFeed.

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
- Removed the setBio method on ab.User in accordance with the deprecation of that user property across the Appboy platform.

## 0.2.4

##### Fixed
- Fixed an issue which was causing the in-app message refresh throttle not to persist beyond a single page load.

## 0.2.3

##### Added
- Introduce appboy.display.destroyFeed method to allow integrators to implement a toggle feed button or otherwise hide the feed from code.

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
- Added Appboy news feed support.

## 0.1.5

##### Fixed
- Correctly identify IE11.

## 0.1.4

##### Fixed
- Fixed issue where SlideUp message clicks with a clickAction of URI were not being respected.
- Fixed issue where Date custom attributes, custom event properties, and purchase properties were not being recognized as Dates by the Appboy platform.

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
