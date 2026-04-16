<p align="center">
  <img width="480" alt="Braze Logo" src=".github/assets/logo-light.png#gh-light-mode-only" />
  <img width="480" alt="Braze Logo" src=".github/assets/logo-dark.png#gh-dark-mode-only" />
</p>

# Braze Web SDK [![latest](https://img.shields.io/github/v/tag/braze-inc/braze-web-sdk?label=latest%20release&color=300266)](https://github.com/braze-inc/braze-web-sdk/releases) [![Static Badge](https://img.shields.io/badge/TSDoc-801ed7)](https://js.appboycdn.com/web-sdk/6.3/doc/modules/braze.html) ![lighthouse score](.github/assets/lighthouse-score.svg)

- [Braze User Guide](https://www.braze.com/docs/user_guide/introduction/ "Braze User Guide")
- [Braze Developer Guide](https://www.braze.com/docs/developer_guide/sdk_integration/?sdktab=web "Braze Developer Guide")

## About the Braze Web SDK

The Braze Web SDK enables you to integrate Braze's customer engagement platform directly into your web applications. Built with TypeScript and designed for modern web development, this SDK provides comprehensive tools for user management, messaging, analytics, and feature flagging.

### What You Can Do

- **User Management**: Track and manage user identities, attributes, and behavior across your web application
- **In-App Messaging**: Display targeted messages and notifications to users while they're actively using your site
- **Content Cards**: Show personalized content feeds and promotional cards that update in real-time
- **Banners**: Show banner messaging in specific placements within your site
- **Push Notifications**: Send web push notifications to engage users even when they're not on your site
- **Feature Flags**: Control feature rollouts and A/B testing with server-side feature flag management
- **Analytics**: Track custom events, user interactions, and conversion metrics
- **Session Management**: Monitor user sessions and engagement patterns

Whether you're building a single-page application, e-commerce site, or content platform, the Braze Web SDK provides the tools you need to create personalized, engaging user experiences that drive growth and retention.

## Prerequisites

Before integrating the Braze Web SDK, you'll need:

- **Braze Account**: A Braze account with API access
- **API Key**: Your app's API key from the Braze dashboard
- **SDK Endpoint**: Your Braze SDK endpoint URL (e.g., `sdk.iad-01.braze.com`)

### Getting Your Credentials

1. **API Key**: Found in your Braze dashboard under Settings → API Keys
2. **SDK Endpoint**: Located in Settings → SDK Authentication → Endpoints
3. **Service Worker**: Required for push notifications (see Push Notifications section)

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Configuration Reference](#configuration-reference)
5. [Core Features](#core-features)
   - [Initialization & Setup](#initialization--setup)
   - [User Management](#user-management)
   - [In-App Messages](#in-app-messages)
   - [Content Cards](#content-cards)
   - [Push Notifications](#push-notifications)
   - [Feature Flags](#feature-flags)
   - [Banners](#banners)
   - [Analytics & Events](#analytics--events)
   - [Session Management](#session-management)
   - [Data Management](#data-management)
6. [Integration Patterns](#integration-patterns)
7. [Error Handling](#error-handling)
8. [Libraries](#libraries)
9. [Supported Browsers](#supported-browsers)
10. [Debugging & Troubleshooting](#debugging--troubleshooting)
11. [Additional Resources](#additional-resources)

---

## Installation

```shell
npm install --save @braze/web-sdk
# or, using yarn:
# yarn add @braze/web-sdk
```

## Quick Start

```typescript
import * as braze from "@braze/web-sdk";

// Initialize the SDK
braze.initialize('YOUR-API-KEY-HERE', {
    baseUrl: "YOUR-SDK-ENDPOINT-HERE",
});

braze.changeUser('Jane Doe');
```

## Configuration Reference

### Initialization Options

The `initialize` function accepts an options object with the following properties:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | **Required** | This option is required to configure the Braze Web SDK to use the appropriate endpoint for your integration - for example: `braze.initialize('YOUR-API-KEY-HERE', { baseUrl: 'sdk.iad-03.braze.com' })` |
| `enableLogging` | `boolean` | `false` | Set to true to enable logging by default. Note that this will cause Braze to log to the javascript console, which is visible to all users! You should probably remove this or provide an alternate logger with setLogger before you release your page to production. |
| `allowUserSuppliedJavascript` | `boolean` | `false` | By default, the Braze Web SDK does not allow user-supplied Javascript click actions, or enable HTML in-app messages and Banners, as they allow Braze dashboard users to run Javascript on your site. To indicate that you trust the Braze dashboard users to write non-malicious Javascript click actions, set this property to true. |
| `doNotLoadFontAwesome` | `boolean` | `false` | Braze uses Font Awesome for in-app message icons. By default, Braze will automatically load FontAwesome 4.7.0 from the FontAwesome CDN. To disable this behavior (e.g. because your site uses a customized version of FontAwesome), set this option to `true`. Note that if you do this, you are responsible for ensuring that FontAwesome is loaded on your site - otherwise in-app messages may not render correctly. |
| `inAppMessageZIndex` | `number` | `999999` | By default, the Braze SDK will show In-App Messages with a z-index of 999999. Provide a value for this option to override that default. |
| `sessionTimeoutInSeconds` | `number` | `30` | By default, a session times out after 30 seconds of inactivity. Provide a value for this option to override that default. |
| `deviceId` | `string` | Auto-generated | By default, Braze will assign a random guid as the device ID. Provide a value for this configuration option to override that default with a value of your own. |
| `appVersion` | `string` | `undefined` | If you provide a value for this option, user events sent to Braze will be associated with the given version, which can be used for user segmentation. |
| `appVersionNumber` | `string` | `undefined` | A numerical app version value which can be used for user segmentation. This value must be sent with four fields, such as "1.2.3.4", otherwise it will be ignored. Note: `appVersion` must also be set, either with the same value or a unique name for this version. |
| `contentSecurityNonce` | `string` | `undefined` | If you provide a value for this option, the Braze SDK will add the nonce to any `<script>` and `<style>` elements created by the SDK. This can be used to permit the Braze SDK to work with your website's Content Security Policy. Note that in addition to setting this nonce, you may also need to allow FontAwesome to load, which you can do by either adding `use.fontawesome.com` to your Content Security Policy allowlist or by using the `doNotLoadFontAwesome` option and loading it manually. |
| `noCookies` | `boolean` | `false` | By default, the Braze Web SDK uses cookies. To disable cookie usage, set this option to true. Note that disabling cookies may impact the SDK's ability to remember users' identities between sessions. |
| `allowCrawlerActivity` | `boolean` | `false` | By default, the Braze Web SDK ignores activity from known spiders or web crawlers, such as Google, based on the user agent string. This saves data points, makes analytics more accurate, and may improve page rank. However, if you want Braze to log activity from these crawlers instead, you may set this option to true. |
| `disablePushTokenMaintenance` | `boolean` | `false` | By default, users who have already granted web push permission (e.g. through requestPushPermission or from a prior push provider) will sync their push token with the Braze backend automatically on new session to ensure deliverability. To disable this behavior, set this option to true. |
| `enableSdkAuthentication` | `boolean` | `false` | Set to true to enable the SDK Authentication feature. For more information about SDK Authentication, see our Product Documentation. |
| `manageServiceWorkerExternally` | `boolean` | `false` | By default, the Braze Web SDK manages its own service worker for push notifications. If you are already managing a service worker in your application and would like to incorporate the Braze service worker functionality into it, set this option to true and include the Braze service worker code in your service worker file. |
| `minimumIntervalBetweenTriggerActionsInSeconds` | `number` | `30` | By default, trigger actions (e.g., displaying an in-app message) can be fired at most once every 30 seconds per user. Provide a value for this option to override that default. |
| `serviceWorkerLocation` | `string` | `undefined` | By default, the Braze Web SDK will look for its service worker file at the root of your domain. Provide a value for this option to override that default and specify a custom location for the service worker file. |
| `safariWebsitePushId` | `string` | `undefined` | Required for Safari push notifications. This value can be found in your Apple Developer account. For more information about setting up Safari push notifications, see our Product Documentation. |
| `localization` | `string` | `undefined` | If you provide a value for this option, the Braze SDK will attempt to display in-app messages and content cards in that locale. |
| `openInAppMessagesInNewTab` | `boolean` | `false` | By default, links in in-app messages open in the same tab. Set this option to true to make them open in a new tab instead. |
| `openCardsInNewTab` | `boolean` | `false` | By default, links in content cards open in the same tab. Set this option to true to make them open in a new tab instead. |
| `requireExplicitInAppMessageDismissal` | `boolean` | `false` | By default, in-app messages can be dismissed by clicking outside of them or pressing the escape key. Set this option to true to require users to explicitly click a dismiss button or action button to dismiss the message. |
| `devicePropertyAllowlist` | `string[]` | `undefined` | By default, the Braze SDK automatically detects and collects all device properties in DeviceProperties. To override this behavior, provide an array of DeviceProperties. To disable all properties being sent to Braze servers, provide an empty array. Note that without some properties, not all features will function properly. For instance, without the time zone, local timezone delivery will not function. |
| `serviceWorkerScope` | `string` | `undefined` | By default, the Braze Web SDK will register its service worker with the default scope (the service worker's directory). Provide a value for this option to override that default and specify a custom scope for the service worker. |

---

## Core Features

### Initialization & Setup

#### Basic Initialization

```typescript
import * as braze from "@braze/web-sdk";

// Initialize the SDK
braze.initialize('YOUR-API-KEY-HERE', {
    baseUrl: 'YOUR-SDK-ENDPOINT-HERE',
    enableLogging: true // Remove in production
});

// Start a session
braze.openSession();
```

#### Advanced Initialization Options

```typescript
import * as braze from "@braze/web-sdk";

braze.initialize('YOUR-API-KEY-HERE', {
    baseUrl: 'YOUR-SDK-ENDPOINT-HERE',
    enableLogging: true,
    allowUserSuppliedJavascript: true,
    doNotLoadFontAwesome: false,
    inAppMessageZIndex: 999999,
    sessionTimeoutInSeconds: 30,
    deviceId: 'custom-device-id',
    appVersion: '1.0.0',
    contentSecurityNonce: 'your-nonce-here'
});
```

### User Management

#### Change User

```typescript
import { changeUser } from "@braze/web-sdk";

// Change to a new user
changeUser('user-123');
```

#### Set User Attributes

```typescript
import { getUser } from "@braze/web-sdk";

const user = getUser();
if (user) {
    user.setEmail('user@example.com');
    user.setFirstName('John');
    user.setLastName('Doe');
    user.setCustomUserAttribute('subscription_tier', 'premium');
    user.setCustomUserAttribute('last_login', new Date());
}
```

#### Set User Location

```typescript
import { getUser } from "@braze/web-sdk";

const user = getUser();
if (user) {
    user.setCountry('US');
    user.setHomeCity('San Francisco');
    user.setLanguage('en');
    user.setCustomLocationAttribute('latitude', 37.7749);
    user.setCustomLocationAttribute('longitude', -122.4194);
}
```

#### User Aliases and Subscription Groups

```typescript
import { getUser } from "@braze/web-sdk";

const user = getUser();
if (user) {
    // Add alias
    user.addAlias('external_id', '12345');
    
    // Add to subscription group
    user.addToSubscriptionGroup('newsletter_subscribers');
    
    // Remove from subscription group
    user.removeFromSubscriptionGroup('old_subscribers');
}
```

#### User Logout

```typescript
import { wipeData } from "@braze/web-sdk";

// There is no explicit method to logout. To "forget" the current users entirely, use wipeData().
// This is a complete data wipe (use with caution, this wipes things such as device ID)
wipeData();
```

### In-App Messages

#### Automatic Display

```typescript
import { automaticallyShowInAppMessages } from "@braze/web-sdk";

// Automatically show in-app messages
automaticallyShowInAppMessages();
```

#### Manual Display

```typescript
import { subscribeToInAppMessage, showInAppMessage } from "@braze/web-sdk";

// Subscribe to in-app messages
subscribeToInAppMessage((inAppMessage) => {
    // Show the message
    showInAppMessage(inAppMessage);
});
```

#### Custom In-App Message Handling

```typescript
import { subscribeToInAppMessage, showInAppMessage } from "@braze/web-sdk";

subscribeToInAppMessage((inAppMessage) => {
    // Custom logic before showing
    if (inAppMessage.getExtras()['priority'] === 'high') {
        showInAppMessage(inAppMessage);
    }
});
```

#### Log In-App Message Interactions

```typescript
import { 
    logInAppMessageClick, 
    logInAppMessageImpression,
    logInAppMessageButtonClick 
} from "@braze/web-sdk";

// Log when user sees the message
logInAppMessageImpression(inAppMessage);

// Log when user clicks the message
logInAppMessageClick(inAppMessage);

// Log when user clicks a button in the message
logInAppMessageButtonClick(inAppMessage, button);
```

#### Custom HTML In-App Messages

```typescript
import { subscribeToInAppMessage, logInAppMessageImpression, logInAppMessageClick } from "@braze/web-sdk";

// Don't call automaticallyShowInAppMessages() when using custom rendering
// braze.automaticallyShowInAppMessages(); // Comment this out

subscribeToInAppMessage((inAppMessage) => {
    // Extract message data
    const messageData = {
        title: inAppMessage.getMessage(),
        body: inAppMessage.getBody(),
        imageUrl: inAppMessage.getImageUrl(),
        buttons: inAppMessage.getButtons(),
        deepLink: inAppMessage.getExtras()['deep_link_url']
    };

    // Define your own HTML structure, using messageData
    const customHTML = ` <!-- Add your custom styling and structure -->`;
    
    /* Render the In-App Message here */
    
    // Here we naively log an impression once the message is rendered.
    // Be precise about exactly when you want to log an impression (ie. only the first time it enters the view port).
    logInAppMessageImpression(inAppMessage);
});

// Handle button clicks and deep linking
const handleButtonClick = (button, inAppMessage) => {
    logInAppMessageClick(inAppMessage);
    // Handle additional click actions (ie. deep linking)
};
```

### Content Cards

#### Display Content Cards

```typescript
import { showContentCards } from "@braze/web-sdk";

// Show content cards in default location
showContentCards();

// Show in specific container
const container = document.getElementById('content-cards-container');
showContentCards(container);
```

#### Subscribe to Content Cards Updates

```typescript
import { subscribeToContentCardsUpdates } from "@braze/web-sdk";

subscribeToContentCardsUpdates((cards) => {
    console.log('Content cards updated:', cards);
    // Display cards or update UI
});
```

#### Log Content Card Interactions

```typescript
import { 
    logContentCardClick, 
    logContentCardImpressions,
    logCardDismissal 
} from "@braze/web-sdk";

// Log card impressions
logContentCardImpressions(cards);

// Log card clicks
logContentCardClick(card);

// Log card dismissals
logCardDismissal(card);
```

#### Filter Content Cards

```typescript
import { showContentCards } from "@braze/web-sdk";

// Show only pinned cards
// You can also provide a parent element instead of null
showContentCards(null, (cards) => {
    return cards.filter(card => card.getIsPinned());
});
```

#### Request Content Cards Refresh

```typescript
import { requestContentCardsRefresh } from "@braze/web-sdk";

requestContentCardsRefresh(
    () => console.log('Content cards refreshed'),
    () => console.log('Failed to refresh content cards')
);
```

#### Custom Content Cards

```typescript
import { subscribeToContentCardsUpdates, logContentCardClick, logContentCardImpressions, requestContentCardsRefresh } from "@braze/web-sdk";

// State for impression de-duping
const loggedImpressions = new Set();
const idToCard = new Map();

subscribeToContentCardsUpdates((cards) => {
    // Build cards one by one
    cards.getCards().forEach(card => {
        // Skip control cards
        if (card.getIsControl()) return;
        
        // Extract card data
        const cardData = {
            id: card.getId(),
            title: card.getTitle(),
            description: card.getDescription(),
            imageUrl: card.getImageUrl(),
            url: card.getUrl(),
            extras: card.getExtras()
        };
        
        // Define your own HTML structure, using cardData
        const customHTML = ` <!-- Add your custom styling and structure -->`;
        
        /* Render each card here */
        
        // Basic observer for impression logging.
        // Be precise about exactly when you want to log an impression (ie. only the first time it enters the view port).
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    logContentCardImpressions([card]);
                }
            });
        });
        
        // Observe card element when rendered
        // observer.observe(cardElement);
    });
});

// Handle card clicks
const handleCardClick = (card) => {
    logContentCardClick(card);
    // Handle additional click actions (ie. navigation)
};

```

### Push Notifications

#### Request Push Permission

```typescript
import { requestPushPermission } from "@braze/web-sdk";

requestPushPermission(
    () => console.log('Push permission granted'),
    () => console.log('Push permission denied')
);
```

#### Check Push Support

```typescript
import { isPushSupported, isPushPermissionGranted } from "@braze/web-sdk";

if (isPushSupported()) {
    if (isPushPermissionGranted()) {
        console.log('Push notifications are enabled');
    } else {
        console.log('Push permission not granted');
    }
}
```

#### Unregister Push

```typescript
import { unregisterPush } from "@braze/web-sdk";

unregisterPush(
    () => console.log('Successfully unregistered'),
    () => console.log('Failed to unregister')
);
```

### Feature Flags

#### Get Feature Flag

```typescript
import { getFeatureFlag } from "@braze/web-sdk";

const featureFlag = getFeatureFlag('new_checkout_flow');
if (featureFlag) {
    const isEnabled = featureFlag.getBooleanProperty('enabled', false);
    const rolloutPercentage = featureFlag.getNumberProperty('rollout_percentage', 0);
    
    if (isEnabled) {
        // Enable new checkout flow
    }
}
```

#### Subscribe to Feature Flag Updates

```typescript
import { subscribeToFeatureFlagsUpdates } from "@braze/web-sdk";

subscribeToFeatureFlagsUpdates((featureFlags) => {
    featureFlags.forEach(flag => {
        console.log(`Feature flag ${flag.getId()}: ${flag.getBooleanProperty('enabled')}`);
    });
});
```

#### Log Feature Flag Impressions

```typescript
import { logFeatureFlagImpression } from "@braze/web-sdk";

const featureFlag = getFeatureFlag('new_feature');
if (featureFlag) {
    logFeatureFlagImpression(featureFlag);
}
```

#### Request Feature Flags Refresh

```typescript
import { refreshFeatureFlags } from "@braze/web-sdk";

refreshFeatureFlags(
    () => console.log('Feature flags refreshed'),
    () => console.log('Failed to refresh feature flags')
);
```

### Banners

#### Get and Display Banners

```typescript
import { getBanner, insertBanner } from "@braze/web-sdk";

const banner = getBanner('homepage_banner');
if (banner) {
    // Insert banner into specific element
    const container = document.getElementById('banner-container');
    insertBanner(banner, container);
}
```

#### Subscribe to Banner Updates

```typescript
import { subscribeToBannersUpdates } from "@braze/web-sdk";

subscribeToBannersUpdates((banners) => {
    Object.entries(banners).forEach(([placementId, banner]) => {
        if (banner) {
            console.log(`Banner for ${placementId}:`, banner);

            // Insert banner into specific element
            const container = document.getElementById(`banner-container-${placementId}`);
            insertBanner(banner, container);
        }
    });
});
```

#### Request Banner Refresh

```typescript
import { requestBannersRefresh } from "@braze/web-sdk";

requestBannersRefresh(
    ["placement_1", "placement_2"],
    () => console.log('Banners refreshed'),
    () => console.log('Failed to refresh banners')
);
```

### Analytics & Events

#### Log Custom Events

```typescript
import { logCustomEvent } from "@braze/web-sdk";

// Simple event
logCustomEvent('button_clicked');

// Event with properties
logCustomEvent('purchase', {
    product_id: '123',
    price: 29.99,
    currency: 'USD'
});
```

#### Log Purchases

```typescript
import { logPurchase } from "@braze/web-sdk";

logPurchase('product-123', 29.99, 'USD', 1, {
    category: 'electronics',
    brand: 'Apple'
});
```

#### Request Data Flush

```typescript
import { requestImmediateDataFlush } from "@braze/web-sdk";

// Force immediate data send
requestImmediateDataFlush();
```

### Session Management

#### Open Session

```typescript
import { openSession } from "@braze/web-sdk";

// Start a new session
openSession();
```

#### Check SDK Status

```typescript
import { isInitialized, isDisabled } from "@braze/web-sdk";

if (isInitialized()) {
    console.log('SDK is initialized');
    
    if (isDisabled()) {
        console.log('SDK is disabled');
    }
}
```

#### Enable/Disable SDK

```typescript
import { enableSDK, disableSDK } from "@braze/web-sdk";

// Disable SDK
disableSDK();

// Re-enable SDK
enableSDK();
```

### Data Management

#### Wipe Data

```typescript
import { wipeData } from "@braze/web-sdk";

// Remove all locally stored data
wipeData();
```

#### Destroy SDK

```typescript
import { destroy } from "@braze/web-sdk";

// Clean up SDK resources
destroy();
```

#### Get Device ID

```typescript
import { getDeviceId } from "@braze/web-sdk";

const deviceId = getDeviceId();
console.log('Device ID:', deviceId);
```

#### SDK Authentication

```typescript
import { setSdkAuthenticationSignature } from "@braze/web-sdk";

// Set authentication signature
setSdkAuthenticationSignature('your-signature-here');
```

#### Subscribe to Authentication Failures

```typescript
import { subscribeToSdkAuthenticationFailures } from "@braze/web-sdk";

subscribeToSdkAuthenticationFailures((error) => {
    console.log('Authentication failed:', error);
    // Provide new signature
    setSdkAuthenticationSignature('new-signature');
});
```

---

## Integration Patterns

### SSR Frameworks

If you use a Server-Side Rendering (SSR) framework such as Next.js, you may encounter errors because the SDK is meant to be run in a browser environment. You can resolve these issues by dynamically importing the SDK.

You can retain the benefits of tree-shaking when doing so by exporting the parts of the SDK that you need in a separate file and then dynamically importing that file into your component.

```javascript
// MyComponent/braze-exports.js
// export the parts of the SDK you need here
export { initialize, openSession } from "@braze/web-sdk";

// MyComponent/MyComponent.js
// import the functions you need from the braze exports file
useEffect(() => {
    import("./braze-exports.js").then(({ initialize, openSession }) => {
        initialize("YOUR-API-KEY-HERE", {
            baseUrl: "YOUR-SDK-ENDPOINT",
            enableLogging: true,
        });
        openSession();
    });
}, []);
```

Alternatively, if you're using webpack to bundle your app, you can take advantage of its magic comments to dynamically import only the parts of the SDK that you need.

```javascript
// MyComponent.js
useEffect(() => {
    import(
        /* webpackExports: ["initialize", "openSession"] */
        "@braze/web-sdk"
    ).then(({ initialize, openSession }) => {
        initialize("YOUR-API-KEY-HERE", {
            baseUrl: "YOUR-SDK-ENDPOINT",
            enableLogging: true,
        });
        openSession();
    });
}, []);
```

### Vite

If you use Vite and see a warning around circular dependencies or `Uncaught TypeError: Class extends value undefined is not a constructor or null`, you may need to exclude the Braze SDK from its dependency discovery:

```javascript
export default {
    optimizeDeps: {
        exclude: ['@braze/web-sdk']
    }
}
```

### Jest Framework

When using Jest, you may see an error similar to `SyntaxError: Unexpected token 'export'`. To fix this, adjust your configuration in `package.json` to ignore the Braze SDK:

```json
{
  "jest": {
    "transformIgnorePatterns": [
      "/node_modules/(?!@braze)"
    ]
  }
}
```

### Asynchronous Module Definition (AMD)

#### Disable AMD Support

If your site uses RequireJS or another AMD module-loader, but you prefer to load the Braze Web SDK through the CDN, you can load a version of the library that does not include AMD support. This version of the library can be loaded from the CDN location: `https://js.appboycdn.com/web-sdk/6.3/braze.no-amd.min.js`

#### Module Loader

If you use RequireJS or other AMD module-loaders, we recommend self-hosting a copy of our library and referencing it as you would with other resources:

```javascript
require(['path/to/braze.min.js'], function(braze) {
  braze.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT' });
  braze.automaticallyShowInAppMessages();
  braze.openSession();
});
```

### Accelerated Mobile Pages (AMP)

For AMP integration, you'll need to:

1. **Include AMP web push script**: Add the async script tag to your head
2. **Add subscription widgets**: Add widgets to allow users to subscribe/unsubscribe
3. **Add helper files**: Include `helper-iframe.html` and `permission-dialog.html`
4. **Create service worker**: Add the Braze service worker file
5. **Configure AMP web push element**: Add the `amp-web-push` element with your API key and base URL as query parameters

For detailed AMP integration instructions, see the [Braze Developer Guide](https://www.braze.com/docs/developer_guide/sdk_integration/?sdktab=web#amp).

### Electron

Electron does not officially support web push notifications (see: this [GitHub issue](https://github.com/electron/electron/issues/6697)). There are other [open source workarounds](https://github.com/MatthieuLemoine/electron-push-receiver) you may try that have not been tested by Braze.

### CDN Integration

- **Script Loading**: Initialize after the script tag loads by placing initialization code after the script tag, or use the script tag's `onload` event handler
- **Global Access**: SDK is available as `window.braze` when loaded via CDN

### Service Worker (Push Notifications)

- **Required**: Must include Braze service worker for push notifications to work
- **Registration**: Register the service worker in your website code using `navigator.serviceWorker.register()`
- **Push Permissions**: Call `braze.requestPushPermission()` in response to user interactions (e.g., button clicks). Use soft push prompts (custom UI) before requesting browser permission

### Tag Managers

#### Tealium iQ

Tealium iQ offers a basic turnkey Braze integration. To configure the integration, search for Braze in the Tealium Tag Management interface, and provide the Web SDK API key from your dashboard. For more details or in-depth Tealium configuration support, check out our [integration documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/customer_data_platform/tealium/#about-tealium) or reach out to your Tealium account manager.

#### Other Tag Managers

Braze may also be compatible with other tag management solutions by following our integration instructions within a custom HTML tag. Reach out to a Braze representative if you need help evaluating these solutions.

---

## Libraries

| Name | Description | npm | CDN URL
| ---- | ----------- | --- | -------
| Full | Full SDK with UI. When using the npm version, Javascript bundlers will remove any unused code including the UI. | `@braze/web-sdk` | https://js.appboycdn.com/web-sdk/6.7/braze.min.js
| Core | Contains the SDK without UI. You will need to implement your own UI for In-App Messaging and Content Cards when using this version of the SDK. Our UI elements are fully customizable via css, so we generally recommend integration of the full library instead. | N/A | https://js.appboycdn.com/web-sdk/6.7/braze.core.min.js
| No-AMD | Contains the full SDK without AMD support. This is useful if your site uses RequireJS or another AMD module-loader, but you prefer to load the SDK through the CDN. | N/A | https://js.appboycdn.com/web-sdk/6.7/braze.no-amd.min.js

## Supported Browsers

- Modern Chromium based browsers (Chrome, Edge, Opera)
- Firefox
- Safari

## Debugging & Troubleshooting

Pass the option `enableLogging: true` to the initialize function (`braze.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT', enableLogging: true });`) to cause Braze to log to the javascript console. This is valuable for development but is visible to all users, so remove this option or [provide an alternate logger](https://js.appboycdn.com/web-sdk/6.7/doc/modules/braze.html#setlogger) before you release your page to production.

## Font Awesome

Braze uses [Font Awesome](http://fortawesome.github.io/Font-Awesome/) 4.7.0 for in-app message icons. To disable loading Font Awesome, use the `doNotLoadFontAwesome` initialization option. Check out the [cheat sheet](http://fortawesome.github.io/Font-Awesome/cheatsheet/) to browse available icons.

## Additional Resources

- [Braze Developer Guide](https://www.braze.com/docs/developer_guide/sdk_integration/?sdktab=web)
- [SDK Documentation](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html)
- [Sample Builds](./sample-builds/)

## Contact

If you have questions, please contact [support@braze.com](mailto:support@braze.com).