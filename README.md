<p align="center">
  <img width="480" alt="Braze Logo" src=".github/assets/logo-light.png#gh-light-mode-only" />
  <img width="480" alt="Braze Logo" src=".github/assets/logo-dark.png#gh-dark-mode-only" />
</p>


# Braze Web SDK [![latest](https://img.shields.io/github/v/tag/braze-inc/braze-web-sdk?label=latest%20release&color=300266)](https://github.com/braze-inc/braze-web-sdk/releases) [![Static Badge](https://img.shields.io/badge/TSDoc-801ed7)](https://js.appboycdn.com/web-sdk/6.5/doc/modules/braze.html) ![lighthouse score](.github/assets/lighthouse-score.svg)

- [Braze User Guide](https://www.braze.com/docs/user_guide/introduction/ "Braze User Guide")
- [Braze Developer Guide](https://www.braze.com/docs/developer_guide/sdk_integration/?sdktab=web "Braze Developer Guide")

## Quickstart

``` shell
npm install --save @braze/web-sdk
# or, using yarn:
# yarn add @braze/web-sdk
```

``` typescript
import * as braze from "@braze/web-sdk";

// initialize the SDK
braze.initialize('YOUR-API-KEY-HERE', {
    baseUrl: "YOUR-SDK-ENDPOINT-HERE",
});

braze.changeUser('Jane Doe');
```

## Libraries

| Name | Description | npm | CDN URL
| ---- | ----------- | --- | -------
| Full | Full SDK with UI. When using the npm version, Javascript bundlers will remove any unused code including the UI. | `@braze/web-sdk` | https://js.appboycdn.com/web-sdk/6.5/braze.min.js
| Core | Contains the SDK without UI. You will need to implement your own UI for In-App Messaging and Content Cards when using this version of the SDK. Our UI elements are fully customizable via css, so we generally recommend integration of the full library instead. | N/A | https://js.appboycdn.com/web-sdk/6.5/braze.core.min.js
| No-AMD | Contains the full SDK without AMD support. This is useful if your site uses RequireJS or another AMD module-loader, but you prefer to load the SDK through the CDN. | N/A | https://js.appboycdn.com/web-sdk/6.5/braze.no-amd.min.js

## Supported Browsers

### CDN Version

- Modern Chromium based browsers (Chrome, Edge, Opera)
- Firefox
- Safari

### NPM Version

- Modern Chromium based browsers (Chrome, Edge, Opera)
- Firefox
- Safari

# Debugging / Troubleshooting

Pass the option `enableLogging: true` to the initialize function (`braze.initialize('YOUR-API-KEY-HERE', { baseUrl: 'YOUR-SDK-ENDPOINT', enableLogging: true });`) to cause Braze to log to the javascript console. This is valuable for development but is visible to all users,
so remove this option or [provide an alternate logger](https://js.appboycdn.com/web-sdk/6.5/doc/modules/braze.html#setlogger) before you release your page to production.

## Font Awesome

Braze uses [Font Awesome](http://fortawesome.github.io/Font-Awesome/) 4.7.0 for in-app message icons. To disable loading Font Awesome, use the `doNotLoadFontAwesome` initialization option. Check out the [cheat sheet](http://fortawesome.github.io/Font-Awesome/cheatsheet/) to browse available icons.

## Contact

If you have questions, please contact [support@braze.com](mailto:support@braze.com).