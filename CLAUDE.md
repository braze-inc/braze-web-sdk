# CLAUDE.md — Braze Web SDK

This file provides comprehensive context for AI assistants (Claude, Cursor, Copilot, and other LLM-powered tools) working with the Braze Web SDK repository. All content is derived from the code, documentation, and patterns in this repository.

## Project Overview

This repository contains **sample integrations, code snippets, and documentation** for the [Braze Web SDK](https://www.braze.com/docs/developer_guide/sdk_integration/?sdktab=web) (`@braze/web-sdk` v6.5.0). The SDK itself is not built from this repository — it is published on npm and served via CDN. The Braze Web SDK is a client-side JavaScript library for analytics, in-app messaging, content cards, push notifications, feature flags, banners, and user management.

**Tech stack:** JavaScript/TypeScript (ES Modules, tree-shakeable since v4.0.0). Sample apps use React 18 + TypeScript + Create React App (react-scripts 5.0.1). Build target is ES5 via tsconfig. The SDK ships with built-in TypeScript definitions since v3.0.0.

## Common Commands

```bash
# Install the SDK in a project
npm install --save @braze/web-sdk

# Run the NPM sample app locally
cd sample-builds/npm && yarn run:prod    # Builds and serves at http://localhost:3000

# Run the Segment sample app
cd sample-builds/segment && yarn run:prod  # Builds and serves at http://localhost:3000

# Run the GTM sample app
cd sample-builds/google-tag-manager && yarn start  # Serves at http://localhost:3000
```

## Repository Structure

```
braze-web-sdk/
├── .cursor/rules/                # Cursor IDE rules for AI-assisted development
├── .github/
│   ├── assets/                   # Logos and badges
│   └── ISSUE_TEMPLATE/           # GitHub issue templates (bug.yml, feature.yml)
├── sample-builds/
│   ├── cdn/                      # CDN script tag integration
│   │   ├── index.html            # Full CDN integration with async loading snippet
│   │   └── service-worker.js     # Push notification service worker
│   ├── npm/                      # NPM + React + Webpack integration
│   │   ├── src/App.tsx           # React component with SDK initialization
│   │   ├── public/service-worker.js
│   │   └── package.json          # Dependencies including @braze/web-sdk 6.5.0
│   ├── segment/                  # Segment analytics integration (no direct SDK dep)
│   │   ├── src/App.tsx           # Segment identify/track/order calls
│   │   └── public/service-worker.js
│   └── google-tag-manager/       # GTM integration (no direct SDK dep)
│       ├── src/App.tsx           # GTM dataLayer events
│       └── public/service-worker.js
├── snippets/                     # Code snippets used by braze.com/docs
│   ├── loading-snippet.js        # Async CDN loading snippet (creates brazeQueue stubs)
│   ├── service-worker-skip-waiting.js  # Service worker with skip-waiting pattern
│   ├── alternate-push-domain-registration.html  # Push opt-in on alternate domain
│   ├── alternate-push-domain-status.html  # Push status check via postMessage
│   └── no-amd-library.js        # No-AMD CDN URL reference
├── context7.json                 # Context7 MCP server configuration
├── CHANGELOG.md                  # Complete version history (0.0.0 → 6.5.0)
├── UPGRADE_GUIDE.md              # Migration guides between major versions
├── README.md                     # Quickstart, libraries, browser support
└── LICENSE
```

## Rules

- ALWAYS call `automaticallyShowInAppMessages()` or `subscribeToInAppMessage()` BEFORE `openSession()` — session-start triggered messages will silently fail otherwise
- ALWAYS call `subscribeToContentCardsUpdates()` BEFORE `openSession()` if you want Content Cards to auto-refresh on session start
- ALWAYS provide `baseUrl` in the `initialize()` options object — it has been required since v3.0.0
- ALWAYS use optional chaining (`?.`) when calling methods on the object returned by `getUser()` — it returns `undefined` when the SDK is not initialized
- NEVER use `enableHtmlInAppMessages` — it was removed in v5; use `allowUserSuppliedJavascript: true` instead
- NEVER use `logCardClick()` or `logCardImpressions()` — they were removed in v6; use `logContentCardClick()` and `logContentCardImpressions()` instead
- NEVER reference the legacy News Feed APIs (`Feed`, `showFeed`, `toggleFeed`, `subscribeToFeedUpdates`, etc.) — they were fully removed in v6
- NEVER use the `Banner` card class (removed in v5) — use `ImageOnly` instead
- Use `enableLogging: true` during development but ALWAYS remove it before production deployment since the output is visible to all users
- Initialize the SDK only once per page load
- The web SDK API key is designed for client-side use and is safe to include in frontend code
- For migration details between major versions, refer to `UPGRADE_GUIDE.md`

## SDK Architecture

### Distribution Variants

The SDK ships in three variants depending on your integration method:

| Variant | Use Case | npm | CDN URL |
|---------|----------|-----|---------|
| **Full** | Production use with any bundler. Unused code is tree-shaken automatically. | `@braze/web-sdk` | `https://js.appboycdn.com/web-sdk/6.5/braze.min.js` |
| **Core** | Sites that need a fully custom UI for in-app messages and content cards. No built-in rendering. | N/A | `https://js.appboycdn.com/web-sdk/6.5/braze.core.min.js` |
| **No-AMD** | Sites using RequireJS that load the SDK via CDN instead of npm. | N/A | `https://js.appboycdn.com/web-sdk/6.5/braze.no-amd.min.js` |

### Bundle Size with Tree-Shaking

The SDK is written as native ES Modules (since v4.0.0), so bundlers like Webpack and Rollup automatically remove unused code. These estimates show the incremental cost of each feature area:

| Feature | Estimated Size (gzipped) |
|---------|--------------------------|
| Analytics (`logCustomEvent`, `setCustomUserAttribute`, `changeUser`) | ~0.9 kB |
| Push (`requestPushPermission`) | ~2.4 kB |
| Content Cards without built-in UI | ~4.5 kB |
| Content Cards with built-in UI | ~12.0 kB |
| In-App Messages with built-in UI | ~12.7 kB |

For reference, the full v3.5 SDK was 51.9 kB gzipped; v4+ starts at 25.5 kB and grows based on features used.

### Browser Support

Modern Chromium-based browsers (Chrome, Edge, Opera), Firefox, and Safari. Internet Explorer is NOT supported (dropped in v4.0.0).

### Data Storage

The SDK stores identification and session data using cookies and localStorage by default. Cookies expire after 400 days (per HTTP Working Group draft RFC 6265) and are stored with `path=/` for sitewide accessibility. Data is flushed to the backend every 10 seconds (3 seconds on Safari due to Intelligent Tracking Prevention). Set `noCookies: true` to rely entirely on localStorage, but this disables cross-subdomain user identification. Call `wipeData()` to clear all locally stored SDK data.

## Prerequisites

Before integrating the Braze Web SDK, you need:

1. **A Braze account** with access to the Braze dashboard
2. **An API key** from your Braze dashboard (Settings > API Keys)
3. **An SDK endpoint** (e.g., `sdk.iad-01.braze.com`) — find this in your dashboard under Settings > API Keys
4. **For push notifications:** A `service-worker.js` file served from your domain's root
5. **For Safari push:** A Safari Website Push ID (e.g., `web.com.example.domain`)
6. **For SDK Authentication (optional):** Backend infrastructure to generate JWT signatures

## Installation

### NPM (Recommended for Modern Web Apps)

Install the package and import the methods you need. Named imports enable tree-shaking so your bundler only includes the features you actually use:

```bash
npm install --save @braze/web-sdk
# or
yarn add @braze/web-sdk
```

Use named imports to enable tree-shaking — this can reduce the Braze portion of your bundle to as little as ~0.9 kB for analytics-only integrations:

```typescript
import { initialize, openSession, automaticallyShowInAppMessages, getUser } from "@braze/web-sdk";
```

Alternatively, import the entire SDK namespace if you prefer a single object (bundlers still tree-shake unused members):

```typescript
import * as braze from "@braze/web-sdk";
```

### CDN (Script Tag)

For sites without a JavaScript bundler, load the SDK via a script tag. The recommended approach is the async loading snippet from `snippets/loading-snippet.js`, which creates stub functions on `window.braze` so you can call SDK methods immediately without waiting for the script to finish downloading. Queued calls are replayed automatically once the SDK loads. See `sample-builds/cdn/index.html` for a complete working example.

You can also load the SDK directly, but this blocks rendering until the script loads:

```html
<script src="https://js.appboycdn.com/web-sdk/6.5/braze.min.js"></script>
```

## Initialization

### Required Initialization Sequence

The order of these calls is critical. Registering subscriptions after `openSession()` means you will miss session-start triggered messages and auto-refresh behavior:

```
1. braze.initialize(apiKey, options)          ← Configure the SDK
2. braze.automaticallyShowInAppMessages()     ← BEFORE openSession()
3. braze.subscribeToContentCardsUpdates(cb)   ← BEFORE openSession() (if using)
4. braze.subscribeToFeatureFlagsUpdates(cb)   ← Optional
5. braze.openSession()                        ← Start the session
```

### initialize() Function

The `initialize()` function configures the SDK. It takes your API key (from the Braze dashboard) and an options object. The `baseUrl` option is required (since v3.0.0) and specifies your SDK endpoint:

```typescript
braze.initialize(apiKey: string, options: InitializationOptions): void
```

### NPM Integration Pattern

This React component from `sample-builds/npm/src/App.tsx` shows the standard initialization pattern. The SDK is initialized inside a `useEffect` hook so it runs once on mount, follows the required call order, and sets a custom user attribute to confirm the integration is working:

```typescript
import { useEffect } from "react";
import {
  initialize,
  automaticallyShowInAppMessages,
  openSession,
  getUser
} from "@braze/web-sdk";

function App() {
  useEffect(() => {
    initialize("YOUR-API-KEY-HERE", {
      enableLogging: true,
      baseUrl: "sdk.iad-01.braze.com",
      serviceWorkerLocation: "/service-worker.js",
      safariWebsitePushId: "web.com.braze.sample-build"
    });
    automaticallyShowInAppMessages();
    openSession();
    getUser()?.setCustomUserAttribute("visited sample-build", new Date());
  }, []);

  return <div>...</div>;
}
```

### CDN Integration Pattern

This pattern from `sample-builds/cdn/index.html` shows the equivalent initialization using the global `braze` object created by the CDN loading snippet. The `serviceWorkerLocation` is computed relative to the current page path so it works regardless of where `index.html` is hosted:

```html
<script type="text/javascript">
  // ... loading snippet creates window.braze stubs ...

  braze.initialize('YOUR-API-KEY-HERE', {
    enableLogging: true,
    baseUrl: 'sdk.iad-01.braze.com',
    serviceWorkerLocation: document.location.pathname.replace('index.html', 'service-worker.js'),
    safariWebsitePushId: 'web.com.braze.sample-build'
  });
  braze.automaticallyShowInAppMessages();
  braze.openSession();
  braze.getUser().setCustomUserAttribute('visited sample-build', new Date());
</script>
```

### Alternate Push Domain Pattern

When push notifications must be registered on a different domain (e.g., an HTTPS subdomain for a site that also serves HTTP pages), initialize the SDK on that alternate domain and parse the user's external ID from URL parameters. This pattern is from `snippets/alternate-push-domain-registration.html`:

```javascript
braze.initialize("YOUR-API-KEY", {
  baseUrl: "YOUR-SDK-BASE-URL",
  enableLogging: true
});

// Parse external_id from URL parameters to identify the user on this domain
const external_id = (
  location.search.substring(1).split("&")
    .find(param => param.startsWith("external_id=")) || ""
).split("=")[1] || "";

if (external_id) {
  braze.changeUser(external_id);
}
braze.automaticallyShowInAppMessages();
braze.openSession();
```

## Configuration Options Reference

All options are passed as the second argument to `initialize()`. Only `baseUrl` is required — all other options have sensible defaults.

### Required Options

| Option | Type | Description |
|--------|------|-------------|
| `baseUrl` | `string` | SDK endpoint (e.g., `"sdk.iad-01.braze.com"`). Required since v3.0.0. |

### Session and Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableLogging` | `boolean` | `false` | Enable console debug logging. Remove for production — output is visible to all users. |
| `sessionTimeoutInSeconds` | `number` | `1800` | Session timeout in seconds (30 minutes default) |
| `appVersion` | `string` | — | App version string for dashboard segmentation |
| `appVersionNumber` | `string` | — | Numeric version (e.g., `"1.2.3.4"`) for numerical comparison in the dashboard |
| `deviceId` | `string` | — | Override the auto-generated device ID |
| `localization` | `string` | — | ISO 639-1 language code for SDK UI elements |
| `noCookies` | `boolean` | `false` | Use only localStorage, no cookies (disables cross-subdomain identification) |
| `allowCrawlerActivity` | `boolean` | `false` | Log web crawler activity (bots are ignored by default to save data points) |

### Push Notification Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `serviceWorkerLocation` | `string` | `"/service-worker.js"` | Path to service worker file. Setting a subdirectory limits push scope. |
| `serviceWorkerScope` | `string` | — | Override the default scope of the service worker registration |
| `safariWebsitePushId` | `string` | — | Required for Safari push (e.g., `"web.com.braze.sample-build"`) |
| `manageServiceWorkerExternally` | `boolean` | `false` | Set to `true` if you register your own service worker |
| `disablePushTokenMaintenance` | `boolean` | `false` | Disable automatic push token sync on session start |

### In-App Message Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowUserSuppliedJavascript` | `boolean` | `false` | Allow JavaScript in HTML in-app messages |
| `inAppMessageZIndex` | `number` | `9001` | CSS z-index for in-app message overlays |
| `requireExplicitInAppMessageDismissal` | `boolean` | `false` | Prevent dismiss via escape key or background click |
| `openInAppMessagesInNewTab` | `boolean` | `false` | Open in-app message links in a new tab |
| `minimumIntervalBetweenTriggerActionsInSeconds` | `number` | `30` | Min seconds between triggered in-app message actions |

### Content Card, Display, and Security Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `openCardsInNewTab` | `boolean` | `false` | Open content card links in a new tab |
| `doNotLoadFontAwesome` | `boolean` | `false` | Prevent loading Font Awesome 4.7.0 for in-app message icons |
| `devicePropertyAllowlist` | `string[]` | — | Restrict which device properties the SDK collects |
| `contentSecurityNonce` | `string` | — | CSP nonce for SDK-injected scripts and styles |
| `enableSdkAuthentication` | `boolean` | `false` | Enable SDK authentication with backend JWT signatures |

## Feature Implementation Guide

### User Management

#### Identifying Users

Call `changeUser()` when a user logs in or is identified. This ends the current session, starts a new one for the specified user, and clears cached messages (content cards, deferred in-app messages, feature flags). The optional second argument is a JWT signature for SDK authentication:

```typescript
braze.changeUser(userId: string, sdkAuthSignature?: string): void
```

#### Getting the User Object

The `getUser()` method returns a `User` object that provides setter methods for all user attributes. It returns `undefined` if the SDK has not been initialized, so always use optional chaining:

```typescript
const user = braze.getUser(); // User | undefined
```

#### Standard Attributes

Use the `User` object's setter methods to update standard profile attributes. Each method accepts the appropriate type or `null` to clear the value:

```typescript
const user = braze.getUser();
user?.setEmail("user@example.com");
user?.setFirstName("Jane");
user?.setLastName("Doe");
user?.setCountry("US");
user?.setHomeCity("New York");
user?.setPhoneNumber("+15551234567");
user?.setGender(braze.User.Genders.FEMALE);
user?.setDateOfBirth(1990, 6, 15);
user?.setLanguage("en");
user?.setLineId("line-user-id");
user?.setLastKnownLocation(40.7128, -74.0060, 10);
```

#### Custom User Attributes

Custom attributes store arbitrary data on user profiles. The `setCustomUserAttribute()` method accepts strings, numbers, booleans, dates, nested objects (v4.7.0+), and arrays of objects. Keys have a max length of 255 characters:

```typescript
// Primitive types
user?.setCustomUserAttribute("plan_tier", "premium");
user?.setCustomUserAttribute("login_count", 42);
user?.setCustomUserAttribute("is_verified", true);
user?.setCustomUserAttribute("signup_date", new Date());

// Nested objects store structured data on the profile (v4.7.0+)
user?.setCustomUserAttribute("address", { city: "NYC", zip: "10001" });

// Pass true as the third argument to merge with existing object values
user?.setCustomUserAttribute("preferences", { theme: "dark" }, true);

// Increment a numeric attribute by the given amount
user?.incrementCustomUserAttribute("login_count", 1);

// Add and remove values from a string array attribute
user?.addToCustomAttributeArray("favorite_colors", "blue");
user?.removeFromCustomAttributeArray("favorite_colors", "red");

// Set a custom location attribute with latitude and longitude
user?.setCustomLocationAttribute("office", 40.7128, -74.0060);
```

#### User Aliases

Aliases provide an alternative identifier for users. They consist of a value and a label, and can be used in the API and dashboard alongside external IDs:

```typescript
user?.addAlias("alias_value", "alias_label");
```

#### Subscription Management

Manage a user's membership in SMS/Email subscription groups and set their notification preferences. The subscription type values are `"opted_in"`, `"subscribed"`, and `"unsubscribed"`:

```typescript
// Add or remove a user from a subscription group
user?.addToSubscriptionGroup("subscription-group-id");
user?.removeFromSubscriptionGroup("subscription-group-id");

// Set notification subscription preferences
user?.setEmailNotificationSubscriptionType(braze.User.NotificationSubscriptionTypes.OPTED_IN);
user?.setPushNotificationSubscriptionType(braze.User.NotificationSubscriptionTypes.SUBSCRIBED);
```

#### Gender Enum Values

The `User.Genders` enum provides the valid values for `setGender()`:

```typescript
braze.User.Genders.FEMALE            // "f"
braze.User.Genders.MALE              // "m"
braze.User.Genders.OTHER             // "o"
braze.User.Genders.NOT_APPLICABLE    // "n"
braze.User.Genders.PREFER_NOT_TO_SAY // "p"
braze.User.Genders.UNKNOWN           // "u"
```

### Analytics — Custom Events

Log custom events to track specific user actions. Events can include an optional properties object with nested values and arrays (v3.3.0+). The properties object has a 50 KB size limit. Returns `undefined` if the SDK is not initialized:

```typescript
braze.logCustomEvent(eventName: string, properties?: object): boolean | undefined
```

Example — log a simple event and a richer event with properties:

```typescript
braze.logCustomEvent("send me push");
braze.logCustomEvent("product_viewed", {
  product_id: "SKU_123",
  category: "Electronics",
  price: 29.99
});
```

### Analytics — Purchases

Log purchase events to track revenue. The `productId` and `price` are required; `currency` defaults to `"USD"` and `quantity` defaults to `1`. Properties follow the same 50 KB limit as custom events:

```typescript
braze.logPurchase(
  productId: string,
  price: number,
  currency?: string,
  quantity?: number,
  properties?: object
): boolean | undefined
```

Example — log a purchase with a coupon code property:

```typescript
braze.logPurchase("product_123", 9.99, "USD", 1, {
  coupon: "SAVE10"
});
```

### Analytics — Data Flushing

The SDK queues analytics data and flushes it periodically (every 10 seconds, or 3 seconds on Safari). Call `requestImmediateDataFlush()` to force an immediate flush — use this before critical navigations or after logging events that must be sent right away:

```typescript
braze.requestImmediateDataFlush(): void
```

### Push Notifications

#### Checking Push Support

Before prompting users for push permission, check browser support and existing permission state. These methods return synchronous boolean values:

```typescript
braze.isPushSupported(): boolean        // true if the browser supports web push
braze.isPushPermissionGranted(): boolean // true if the user already granted permission
braze.isPushBlocked(): boolean          // true if the user has blocked push
```

#### Requesting Permission

Prompt the user for push notification permission. The `successCallback` fires on acceptance, and the `deniedCallback` fires on denial. The `deniedCallback` receives `temporary: true` when the browser auto-denied after multiple ignored prompts:

```typescript
braze.requestPushPermission(
  successCallback?: () => void,
  deniedCallback?: (temporary?: boolean) => void
): void
```

This npm example from `sample-builds/npm/src/App.tsx` dynamically imports push methods to minimize initial bundle size. The `webpackExports` comment tells webpack to include only these three exports in the dynamic chunk:

```typescript
const handleRegisterPushClick = async () => {
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
```

The equivalent CDN pattern from `sample-builds/cdn/index.html` calls the methods directly on the global `braze` object:

```javascript
braze.requestPushPermission(function() {
  braze.logCustomEvent('send me push');
  braze.requestImmediateDataFlush();
});
```

#### Unregistering Push

Remove a user's push registration. This persists across sessions until `requestPushPermission()` is called again:

```typescript
braze.unregisterPush(successCallback?: () => void, errorCallback?: () => void): void
```

#### Service Worker Setup

Every push integration requires a service worker file. Create `service-worker.js` in your public/root directory. This one-line file imports Braze's push handling logic:

```javascript
self.importScripts("https://js.appboycdn.com/web-sdk/6.5/service-worker.js");
```

If your service worker needs to skip the waiting phase (from `snippets/service-worker-skip-waiting.js`), add a listener that prevents the default install handler:

```javascript
self.addEventListener("install", event => {
  event.stopImmediatePropagation();
});
self.importScripts("https://js.appboycdn.com/web-sdk/6.5/service-worker.js");
```

#### Alternate Push Domain Pattern

For checking push status from a different domain, embed a hidden iframe and use `postMessage`. This pattern from `snippets/alternate-push-domain-status.html` initializes the SDK on the secure domain and responds to status queries:

```javascript
braze.initialize("YOUR-API-KEY", {
  baseUrl: "YOUR-SDK-BASE-URL",
  enableLogging: true
});

window.addEventListener("message", event => {
  if (event.origin === "http://insecure.com") {
    if (event.data.type === "get_push_status") {
      window.top.postMessage({
        type: "set_push_status",
        isPushPermissionGranted: braze.isPushPermissionGranted()
      }, event.origin);
    }
  }
});
```

### In-App Messages

#### Automatic Display

Call `automaticallyShowInAppMessages()` to let the SDK handle in-app message rendering with its built-in UI. Returns a subscription ID. Must be called before `openSession()`:

```typescript
braze.automaticallyShowInAppMessages(): string | undefined
```

#### Custom Display Handling

If you need to control when and how in-app messages appear (e.g., custom UI), subscribe to incoming messages. Your callback receives the `InAppMessage` object and you decide when to show it using `showInAppMessage()`:

```typescript
braze.subscribeToInAppMessage(
  callback: (inAppMessage: InAppMessage) => void
): string | undefined

braze.showInAppMessage(inAppMessage: InAppMessage, parentNode?: HTMLElement): void
```

#### Deferring Messages

Save an in-app message for display on a future page load using `deferInAppMessage()`. Retrieve the deferred message later with `getDeferredInAppMessage()`:

```typescript
braze.deferInAppMessage(inAppMessage: InAppMessage): boolean | undefined
braze.getDeferredInAppMessage(): InAppMessage | null | undefined
```

#### In-App Message Types

| Class | Description |
|-------|-------------|
| `InAppMessage` | Base class with shared properties and methods |
| `FullScreenMessage` | Full-screen overlay, ideal for high-priority announcements |
| `ModalMessage` | Centered modal dialog with optional image and buttons |
| `SlideUpMessage` | Non-intrusive notification that slides up from the bottom |
| `HtmlMessage` | Fully custom HTML content (requires `allowUserSuppliedJavascript: true`) |
| `ControlMessage` | A/B test control variant — never displayed, used to measure lift |

#### Instance Methods

Every in-app message instance provides methods to close it programmatically, subscribe to user interactions, and manage subscriptions:

```typescript
inAppMessage.closeMessage(): void
inAppMessage.subscribeToClickedEvent(callback): string
inAppMessage.subscribeToDismissedEvent(callback): string
inAppMessage.removeSubscription(subscriptionId): void
inAppMessage.removeAllSubscriptions(): void
```

#### Analytics Logging

When implementing a custom UI (not using `automaticallyShowInAppMessages()`), you must manually log impressions, clicks, and button clicks:

```typescript
braze.logInAppMessageImpression(inAppMessage): void
braze.logInAppMessageClick(inAppMessage): void
braze.logInAppMessageButtonClick(inAppMessage, button): void
braze.logInAppMessageHtmlClick(inAppMessage): void
```

#### InAppMessage Enums

These enums on the `InAppMessage` class control rendering and behavior. Reference them when constructing or inspecting messages:

- `InAppMessage.SlideFrom` — Direction the slide-up animates from
- `InAppMessage.ClickAction` — What happens when the message body is clicked
- `InAppMessage.DismissType` — How the message can be dismissed
- `InAppMessage.OpenTarget` — Whether links open in the same or new tab
- `InAppMessage.ImageStyle` — How the image is rendered
- `InAppMessage.Orientation` — Portrait or landscape
- `InAppMessage.TextAlignment` — Text alignment within the message
- `InAppMessage.CropType` — How images are cropped (`CENTER_CROP` uses `<img>` tags in v6+)

#### InAppMessageButton

In-app message buttons have their own subscription methods for tracking click events:

```typescript
button.subscribeToClickedEvent(callback): string
button.removeSubscription(subscriptionId): void
button.removeAllSubscriptions(): void
```

### Content Cards

#### Subscribing to Updates

Register a callback to receive Content Card updates from the backend. Call this before `openSession()` to auto-refresh on session start:

```typescript
braze.subscribeToContentCardsUpdates(
  callback: (contentCards: ContentCards) => void
): string | undefined
```

#### Refreshing and Caching

Manually trigger a refresh from the backend, or retrieve the last set of cards received. The refresh method accepts optional success/error callbacks:

```typescript
braze.requestContentCardsRefresh(
  successCallback?: () => void,
  errorCallback?: () => void
): void

braze.getCachedContentCards(): ContentCards | undefined
```

#### Built-in UI

The SDK includes a built-in Content Cards feed UI. Pass a `parentNode` to render the feed inside a specific DOM element instead of the default overlay:

```typescript
braze.showContentCards(parentNode?: HTMLElement): void
braze.hideContentCards(parentNode?: HTMLElement): void
braze.toggleContentCards(parentNode?: HTMLElement): void
```

#### Content Card Types

| Class | Description |
|-------|-------------|
| `Card` | Base class with shared fields (`id`, `title`, `url`, `extras`, etc.) |
| `ImageOnly` | Image-only card (replaced the deprecated `Banner` card type in v4.9.0) |
| `CaptionedImage` | Image with headline and description text |
| `ClassicCard` | Text-focused card with an optional small image |
| `ControlCard` | A/B test control variant — not displayed, used for measuring lift |

#### Card Instance Methods

When building a custom Content Cards UI, use these methods to dismiss cards and subscribe to interactions:

```typescript
card.dismissCard(): void
card.subscribeToClickedEvent(callback): string
card.subscribeToDismissedEvent(callback): string
card.removeSubscription(subscriptionId): void
card.removeAllSubscriptions(): void
```

#### Analytics Logging

When using a custom UI, manually log impressions, clicks, and dismissals:

```typescript
braze.logContentCardClick(card: Card): void
braze.logContentCardImpressions(cards: Card[]): void
braze.logCardDismissal(card: Card): void
```

#### ContentCards Collection

The `ContentCards` object provides a method to get the count of unviewed cards:

```typescript
contentCards.getUnviewedCardCount(): number
```

### Feature Flags

#### Getting Feature Flags

Retrieve a single feature flag by ID or get all flags. `getFeatureFlag()` returns `null` if the flag does not exist or feature flags are disabled, and `undefined` if the SDK is not initialized:

```typescript
braze.getFeatureFlag(id: string): FeatureFlag | null | undefined
braze.getAllFeatureFlags(): FeatureFlag[] | undefined
```

#### Subscribing and Refreshing

Register a callback for feature flag updates. The callback always fires (even on failure, with cached flags). Call `refreshFeatureFlags()` to trigger a manual refresh:

```typescript
braze.subscribeToFeatureFlagsUpdates(
  callback: (featureFlags: FeatureFlag[]) => void
): string | undefined

braze.refreshFeatureFlags(): void
```

#### Feature Flag Properties

Access typed properties attached to a feature flag. Each method returns `undefined` if the property does not exist:

```typescript
featureFlag.getStringProperty(key: string): string | undefined
featureFlag.getNumberProperty(key: string): number | undefined
featureFlag.getBooleanProperty(key: string): boolean | undefined
featureFlag.getImageProperty(key: string): ImageProperty | undefined
featureFlag.getJsonProperty(key: string): JsonProperty | undefined
featureFlag.getTimestampProperty(key: string): TimestampProperty | undefined
```

#### Feature Flag Impressions

Log that a user was exposed to a feature controlled by a flag. Impressions are limited to once per session per flag ID:

```typescript
braze.logFeatureFlagImpression(id: string): void
```

### Banners

#### Banner Management

Banners render HTML content in designated placements. `insertBanner()` handles impression and click tracking automatically (since v6.0.0). Use the subscribe and refresh methods for programmatic control:

```typescript
braze.insertBanner(placementId: string, parentNode: HTMLElement): void
braze.getAllBanners(): Record<string, Banner | null> | undefined
braze.requestBannersRefresh(): void
braze.subscribeToBannersUpdates(
  callback: (banners: Record<string, Banner | null>) => void
): string | undefined
```

#### Banner Properties

Access typed properties on banner instances, similar to feature flags:

```typescript
banner.getStringProperty(key: string): string | undefined
banner.getNumberProperty(key: string): number | undefined
banner.getBooleanProperty(key: string): boolean | undefined
banner.getImageProperty(key: string): ImageProperty | undefined
banner.getJsonProperty(key: string): JsonProperty | undefined
banner.getTimestampProperty(key: string): TimestampProperty | undefined
```

## SDK Control Methods

### Session and Lifecycle

Call `openSession()` to start tracking a session. Use `isInitialized()` (v5.4.0+) to check if `initialize()` has been called. Call `destroy()` to tear down the SDK and release resources. A `braze.initialized` DOM event is dispatched on `window` when initialization completes:

```typescript
braze.openSession(): void
braze.isInitialized(): boolean
braze.destroy(): void
```

### Enable/Disable SDK

Provide user opt-out functionality. When disabled, no data is collected or sent. This state persists across page loads:

```typescript
braze.enableSDK(): void
braze.disableSDK(): void
braze.isDisabled(): boolean
```

### Data Management

`wipeData()` clears all locally stored SDK data. After calling this, the user appears as a new anonymous user. `requestImmediateDataFlush()` forces queued data to be sent right away:

```typescript
braze.wipeData(): void
braze.requestImmediateDataFlush(): void
```

### SDK Authentication

Provide or update the JWT signature for SDK Authentication, and subscribe to auth failures for handling token expiration:

```typescript
braze.setSdkAuthenticationSignature(signature: string): void
braze.subscribeToSdkAuthenticationFailures(callback): string | undefined
```

### Logging Control

Toggle debug logging at runtime, or provide a custom logger to route SDK logs through your own infrastructure. `setLogger()` can be called before `initialize()`:

```typescript
braze.toggleLogging(): void
braze.setLogger(logger: Function): void
```

### Device, Metadata, Subscriptions, and Actions

Retrieve the device ID, add SDK metadata, manage subscriptions, or handle Braze Action deep links:

```typescript
braze.getDeviceId(): string | undefined
braze.addSdkMetadata(metadata: BrazeSdkMetadata[]): void
braze.removeSubscription(subscriptionId: string): void
braze.removeAllSubscriptions(): void
braze.handleBrazeAction(url: string): void
```

## Complete Public API Surface

The following is the complete list of all public API methods and classes, extracted from the SDK loading snippet (`snippets/loading-snippet.js`):

### Top-Level Functions

`automaticallyShowInAppMessages`, `changeUser`, `destroy`, `disableSDK`, `enableSDK`, `getDeviceId`, `initialize`, `isDisabled`, `isInitialized`, `isPushBlocked`, `isPushPermissionGranted`, `isPushSupported`, `logCardDismissal`, `logContentCardImpressions`, `logContentCardClick`, `logBannerImpressions`, `logBannerClick`, `logCustomEvent`, `logInAppMessageButtonClick`, `logInAppMessageClick`, `logInAppMessageHtmlClick`, `logInAppMessageImpression`, `logPurchase`, `openSession`, `requestPushPermission`, `removeAllSubscriptions`, `removeSubscription`, `requestContentCardsRefresh`, `refreshFeatureFlags`, `requestImmediateDataFlush`, `setLogger`, `setSdkAuthenticationSignature`, `addSdkMetadata`, `subscribeToContentCardsUpdates`, `subscribeToInAppMessage`, `subscribeToSdkAuthenticationFailures`, `subscribeToFeatureFlagsUpdates`, `toggleLogging`, `unregisterPush`, `wipeData`, `handleBrazeAction`, `getAllFeatureFlags`, `logFeatureFlagImpression`, `requestBannersRefresh`, `insertBanner`, `getAllBanners`, `subscribeToBannersUpdates`, `showContentCards`, `hideContentCards`, `toggleContentCards`, `showInAppMessage`, `deferInAppMessage`

### Getter Functions

`getCachedContentCards`, `getDeferredInAppMessage`, `getUser`, `getFeatureFlag`, `getBanner`

### Classes

`BrazeSdkMetadata`, `DeviceProperties`, `Card`, `ImageOnly`, `CaptionedImage`, `ClassicCard`, `ControlCard`, `ContentCards`, `ControlMessage`, `InAppMessage`, `FullScreenMessage`, `ModalMessage`, `HtmlMessage`, `SlideUpMessage`, `InAppMessageButton`, `FeatureFlag`, `Banner`, `User`

## Third-Party Integration Patterns

### Segment Integration

When using Segment as your customer data platform, events route to Braze through Segment's destination — no direct `@braze/web-sdk` dependency is needed. This pattern from `sample-builds/segment/src/App.tsx` shows the Segment analytics.js calls that translate to Braze operations:

```typescript
// Map a Segment user to a Braze user profile (maps to braze.changeUser)
window.analytics.identify('user-id', {
  name: 'John Doe',
  email: 'jdoe@example.com'
});

// Track a custom event (maps to braze.logCustomEvent)
window.analytics.track('Signed Up', { plan: 'Enterprise' });

// Log a purchase using Segment's "Order Completed" spec event
window.analytics.track('Order Completed', {
  products: [{ product_id: "testProductID", price: "2.0" }]
});
```

### Google Tag Manager Integration

When using GTM, events are pushed to the `dataLayer` and processed by Braze's GTM template — no direct `@braze/web-sdk` dependency is needed. This pattern from `sample-builds/google-tag-manager/src/App.tsx` shows the dataLayer events for user identification, custom events, purchases, and GA4-style e-commerce:

```typescript
// Identify a user (maps to braze.changeUser)
window.dataLayer.push({ event: "identify", userId: "abc" });

// Log a custom event (maps to braze.logCustomEvent)
window.dataLayer.push({ event: "add to cart" });

// Log a purchase (maps to braze.logPurchase)
window.dataLayer.push({
  event: "purchase",
  productId: "abc",
  price: 100,
  currency: "usd",
  quantity: 1
});

// GA4-style e-commerce purchase with multiple line items
window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data first
window.dataLayer.push({
  event: "ecommerce",
  ecommerce: {
    transaction_id: "T_12345",
    value: 25.42,
    currency: "USD",
    items: [
      { item_id: "SKU_12345", item_name: "Product Name", price: 9.99, quantity: 1 }
    ]
  }
});

// Disable/Enable the SDK via GTM events
window.dataLayer.push({ event: "disable" });
window.dataLayer.push({ event: "enable" });
```

## Debugging and Troubleshooting

### Enable Logging

Pass `enableLogging: true` in initialization options to see detailed SDK activity in the browser console. Always remove this before production:

```typescript
braze.initialize('YOUR-API-KEY', {
  baseUrl: 'sdk.iad-01.braze.com',
  enableLogging: true  // Remove for production
});
```

### Runtime Logging Toggle

Toggle logging on or off at runtime without changing initialization options — useful for debugging production issues without redeployment:

```typescript
braze.toggleLogging();
```

### Custom Logger

Route SDK log output through your own logging infrastructure. This can be called before `initialize()` to capture initialization logs:

```typescript
braze.setLogger(function(message) {
  console.log("Braze SDK:", message);
});
```

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Session-start IAMs not showing | `automaticallyShowInAppMessages()` called after `openSession()` | Move `automaticallyShowInAppMessages()` before `openSession()` |
| Content Cards not auto-refreshing | `subscribeToContentCardsUpdates()` called after `openSession()` | Move `subscribeToContentCardsUpdates()` before `openSession()` |
| TypeScript compile errors after upgrade | v6 returns `undefined` for uninitialized SDK | Add optional chaining (`?.`) or null checks |
| `baseUrl` not provided error | `baseUrl` is required since v3.0.0 | Add `baseUrl` to initialization options |
| Push notifications not working | Missing or misconfigured service worker | Verify `service-worker.js` is accessible and imports the Braze service worker |
| Push scope limited | `serviceWorkerLocation` set to a subdirectory | Use default `/service-worker.js` location or understand scope implications |
| HTML IAMs not rendering | `allowUserSuppliedJavascript` not set | Add `allowUserSuppliedJavascript: true` to options |
| Cross-subdomain identification failing | `noCookies: true` is set | Use cookies (default) for cross-subdomain identification |
| Methods called before initialization | SDK not initialized yet | SDK logs a warning (v5.0.0+, no longer throws errors) |
| Font Awesome conflicts | SDK loads Font Awesome 4.7.0 by default | Set `doNotLoadFontAwesome: true` |

## Testing Your Integration

### Running Sample Builds

Each sample build demonstrates a different integration approach. Run them locally to test and explore:

```bash
# NPM sample — direct @braze/web-sdk integration with React + Webpack
cd sample-builds/npm && yarn run:prod    # Builds and serves at http://localhost:3000

# Segment sample — events sent to Braze via Segment
cd sample-builds/segment && yarn run:prod  # Builds and serves at http://localhost:3000

# GTM sample — events sent to Braze via Google Tag Manager
cd sample-builds/google-tag-manager && yarn start  # Serves at http://localhost:3000
```

### Verifying SDK Initialization

1. Open browser DevTools console
2. With `enableLogging: true`, look for log messages prefixed with `Braze`
3. Confirm initialization: `braze.isInitialized()` should return `true`
4. Verify user identification: `braze.getUser()?.getUserId()`

### Verifying Push Registration

1. Check push support: `braze.isPushSupported()`
2. Check permission: `braze.isPushPermissionGranted()` or `braze.isPushBlocked()`
3. Verify the service worker in DevTools > Application > Service Workers

## AI-Assisted Development with Context7

### Overview

Context7 provides AI coding assistants with direct access to the full Braze documentation library, enabling accurate code generation and technical answers based on the latest SDK references. This repository includes a `context7.json` configuration:

```json
{
  "url": "https://context7.com/braze-inc/braze-web-sdk",
  "public_key": "pk_dR0a8BboWId4FeaBmJnJC"
}
```

Context7 is different from the Braze MCP server. Context7 provides access to **Braze documentation**, while the Braze MCP server provides read-only access to **your Braze workspace data** (campaigns, segments, analytics). You can use both together for a complete AI-assisted development experience.

### Setting Up Context7 in Your IDE

**Cursor:** Go to **Settings > Tools and Integrations > MCP Tools > Add Custom MCP**, then add the configuration below. Save and restart Cursor. Include `use context7` in your prompts:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

**VS Code:** Add the following to your `settings.json` or `.vscode/mcp.json`. Save and restart VS Code:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

**Claude Desktop:** Go to **Settings > Developer > Edit Config** and add the following to `claude_desktop_config.json`. Save and restart Claude Desktop:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### Example Prompts

These prompts demonstrate how to get accurate, documentation-backed answers. The `use context7` suffix signals the assistant to query Braze docs:

**Initialization:**
```
Using the Braze Web SDK, show me how to initialize the SDK with
braze.initialize(), including the API key, base URL, and options
for enabling logging and automatic in-app message display.
Use context7.
```

**Custom Events and Purchases:**
```
Using the Braze Web SDK, create a JavaScript module that logs a
custom event called "VideoPlayed" with properties for video_id,
duration_seconds, and completion_percentage. Also show how to log
a purchase with product ID, price, currency code, and quantity.
Use context7.
```

**Push Notifications:**
```
Using the Braze Web SDK, provide the HTML and JavaScript needed to
register a user for web push notifications after they click a
"Subscribe to updates" button. Include the service worker setup.
Use context7.
```

**User Attributes:**
```
Using the Braze Web SDK, show me how to set standard user attributes
(first name, email, country) and custom user attributes
(favorite_genre, subscription_tier) for the current user.
Use context7.
```

### Plain Text Documentation for LLMs

Braze provides AI-optimized documentation files following the `llms.txt` standard. You can reference these directly in prompts or paste their contents into an LLM:

- **`llms.txt`** — Index of Braze developer documentation pages with titles and descriptions
- **`llms-full.txt`** — Complete Braze developer documentation in a single plain text file

## Best Practices

### Initialization
- ALWAYS provide `baseUrl` — required since v3.0.0
- Call `automaticallyShowInAppMessages()` BEFORE `openSession()`
- Call `subscribeToContentCardsUpdates()` BEFORE `openSession()` for auto-refresh
- Use `enableLogging: true` during development only — remove before production
- Initialize the SDK only once per page load

### Security
- The web SDK API key is designed for client-side use and is safe in frontend code
- Use SDK Authentication (`enableSdkAuthentication: true`) with backend JWT generation for additional security
- Use `allowUserSuppliedJavascript: true` for HTML in-app messages (not the removed `enableHtmlInAppMessages`)
- Use `contentSecurityNonce` if your site has a Content Security Policy
- Always validate `event.origin` in `postMessage` handlers

### Performance
- Use named imports for tree-shaking: `import { initialize, openSession } from "@braze/web-sdk"`
- Use dynamic imports with `webpackExports` magic comments for on-demand features
- The Full library is recommended over Core — bundlers remove unused UI code automatically
- Clean up with `destroy()` when the SDK is no longer needed
- Call `requestImmediateDataFlush()` before important navigations

### TypeScript
- The SDK ships with TypeScript definitions since v3.0.0
- Many methods return `undefined` when the SDK is not initialized — use optional chaining
- `getUser()` may return `undefined` — always check before calling methods
- Refer to `UPGRADE_GUIDE.md` before upgrading — TypeScript types change between major versions

### Data Storage
- Default: cookies + localStorage for cross-subdomain identification
- `noCookies: true`: localStorage only (no cross-subdomain support)
- Data flushes every 10 seconds (3 seconds on Safari due to ITP)
- Cookies are stored with `path=/` for sitewide accessibility and expire after 400 days

## External References

- **TSDoc API Reference:** https://js.appboycdn.com/web-sdk/6.5/doc/modules/braze.html
- **Braze Developer Guide:** https://www.braze.com/docs/developer_guide/sdk_integration/?sdktab=web
- **Braze User Guide:** https://www.braze.com/docs/user_guide/introduction/
- **Context7:** https://context7.com/braze-inc/braze-web-sdk
- **Support:** support@braze.com
