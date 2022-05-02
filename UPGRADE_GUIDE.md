# Upgrade Guide

## V3 to V4

- [Tree-Shaking Benefits](#tree-shaking)
- [Breaking Changes](#v4-breaking-changes)

Version 4 of the Braze Web SDK (`@braze/web-sdk` package) now supports tree-shaking 🎉 and has been rewritten as native, side-effect free ES Modules.

You can now `import` individual methods and classes, or use wildcard syntax to import the entire SDK. In both approaches, your javascript module bundlers can remove any unused code resulting in faster website performance.

```typescript
import * as braze from "@braze/web-sdk";

// or, if you prefer to import individual modules:
// import { initialize } from "@braze/web-sdk";

braze.initialize("YOUR-API-KEY", { baseUrl: "YOUR-SDK-ENDPOINT" });
braze.automaticallyShowInAppMessages();
braze.subscribeToContentCardsUpdates(function(contentCards) {
  console.log(contentCards);
});
braze.openSession();
```

### Tree-Shaking

Version 4 has been rewritten as individually exported ES Modules. If you use a modern javascript bundler (like [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/)) you can benefit from "tree-shaking", which automatically removes unused SDK code to make your website more performant.

The table below shows how many kilobytes you may save as a result of upgrading to v4. Note that these are estimates, and your bundle sizes may vary based on your webpage structure and the individual methods you actually use.

For context, version `@braze/web-sdk@3.5` and `@braze/web-sdk-core@3.5` weigh in at `51.9kB` and `37.3kB` respectively, whereas v4 starts at `25.5kB` and builds based on features you use. The "Estimated Savings" column compares `@braze/web-sdk@3.5` to importing only the given feature.

| Module or Feature     | Estimated Size (gzipped) | Estimated Savings                  |
| --------------------- | ------------------------ | ---------------------------------- |
| Analytics             | `0.9kB`                  | ~ 49.1% reduction (`26.4kB` total) |
| Push                  | `2.4kB`                  | ~ 46.2% reduction (`27.9kB` total) |
| Content Cards (no UI) | `4.5kB`                  | ~ 44.1% reduction (`29.0kB` total) |
| Content Cards UI      | `12.0kB`                 | ~ 27.7% reduction (`37.5kB` total) |
| In-App Messages UI    | `12.7kB`                 | ~ 26.4% reduction (`38.2kB` total) |

**Notes**:

- "Analytics" was measured by including `logCustomEvent`, `setCustomUserAttribute`, and `changeUser` methods.
- "In-App Messages UI" was measured by including `automaticallyShowInAppMessages` or `showInAppMessage`
- "Content Cards UI" was measured by including `showContentCards`, `hideContentCards` or `toggleContentCards`
- "Push" was measured by including `requestPushPermission`

### V4 Breaking Changes

#### Behavioral Changes

- The `automaticallyShowInAppMessages()` or `subscribeToInAppMessage()` methods must be called prior to `openSession()` to ensure session-start triggered messages are processed.
- Content Cards will now only refresh on session start if `subscribeToContentCardsUpdates()` is called prior to `openSession`. You can manually refresh Content Cards using `requestContentCardsRefresh()`.

#### Renamed APIs

The following methods have been renamed:

| Old (v3.x)                                   | New (v4.0)                                                                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `appboy.registerAppboyPushMessages()`        | [`requestPushPermission()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#requestpushpermission)                   |
| `appboy.unregisterAppboyPushMessages()`      | [`unregisterPush()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#unregisterpush)                                 |
| `appboy.automaticallyShowNewInAppMessages()` | [`automaticallyShowInAppMessages()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#automaticallyshowinappmessages) |
| `appboy.toggleAppboyLogging()`               | [`toggleLogging()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#togglelogging)                                   |
| `appboy.display.*`                           | The `appboy.display` namespace has been removed. To upgrade, find and replace all references to `appboy.display.` with `braze.`     |

#### Removed APIs

The following methods and properties have been removed:

| API                                                                                   | Details                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appboy.isPushGranted()`                                                              | Deprecated since 1.6.2 in favor of [`isPushPermissionGranted()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#ispushpermissiongranted)                                                                                                                                                       |
| `appboy.subscribeToNewInAppMessages()`                                                | Deprecated since 2.4.0 in favor of [`subscribeToInAppMessage()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#subscribetoinappmessage)                                                                                                                                                       |
| `appboy.trackLocation()`                                                              | Deprecated since 3.3.0 in favor of using the native Geolocation API and passing the location data to [`User.setLastKnownLocation()`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.user.html#setlastknownlocation). The corresponding `appboyBridge.trackLocation()` method has also been removed. |
| `appboy.stopWebTracking()`                                                            | Deprecated since 3.5.0 in favor of using [`disableSDK()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#disablesdk)                                                                                                                                                                           |
| `appboy.resumeWebTracking()`                                                          | Deprecated since 3.5.0 in favor of using [`enableSDK()`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#enablesdk)                                                                                                                                                                             |
| `safariWebsitePushId` parameter from the `appboy.registerAppboyPushMessages()` method | Deprecated & undocumented since 1.6.1 in favor of the [`initialization option`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initializationoptions) with the same name                                                                                                                       |
| `devicePropertyWhitelist` initialization option                                       | Deprecated since 3.1.0 in favor of [`devicePropertyAllowlist`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initializationoptions) which has the same functionality                                                                                                                          |
| `language` initialization option                                                      | Use the [`localization`](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initializationoptions) option which has the same functionality                                                                                                                                                         |
| `cardId` and `campaignId` properties of In-App Messages                               | If you are manually constructing instances of `InAppMessage` subclasses, you will need to update the constructors ([docs](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.inappmessage.html))                                                                                                        |
| `User.setAvatarImageUrl()`                                                            | Method no longer used                                                                                                                                                                                                                                                                                          |

---

## V2 to V3

- [Breaking Changes](#v3-breaking-changes)

Version 3 of the Braze Web SDK (`@braze/web-sdk`) now comes bundled with TypeScript definitions!

The TypeScript defintions include documentation and autocomplete in IDEs that support it, even if your project does not use TypeScript.

**Note**: The SDK loading snippet has been updated. If you integrate the Braze Web SDK using the CDN, you must [update the loading snippet](https://github.com/braze-inc/braze-web-sdk/tree/1feef199dd5eae15479db80524bb934c3b40f548#alternative-cdn-installation) when upgrading to 3.0.

### V3 Breaking Changes

The following breaking changes have been made to allow for a better TypeScript experience:

| API                             | details                                                                                                                                                                                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appboy.ab`                     | The `ab` namespace has been removed. To upgrade, find and replace all references to `appboy.ab` with `appboy`                                                                                                                                                           |
| `InAppMessage.Button`           | Renamed to `InAppMessageButton`. To upgrade, find and replace all references to `InAppMessage.Button` with `InAppMessageButton`                                                                                                                                         |
| `openSession(callback)`         | The `callback` parameter has been removed since v2.3.1.                                                                                                                                                                                                                 |
| `changeUser(callback)`          | The `callback` parameter has been removed since v2.3.1.                                                                                                                                                                                                                 |
| `baseUrl` initialization option | Now **required** to initialize the SDK. If your integration did not already provide the `baseUrl` option, it should now be set to the previous default value of `sdk.iad-01.braze.com` (e.g, `appboy.initialize('YOUR-API-KEY', { baseUrl: 'sdk.iad-01.braze.com' });`) |
