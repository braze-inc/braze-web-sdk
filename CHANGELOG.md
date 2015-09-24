## 0.2.4
  - Fix an issue which was causing the in-app message refresh throttle not to persist beyond a single page load.

## 0.2.3
  - Remove the news feed z-index. If necessary, the z-index can be set manually via CSS: `.ab-feed { z-index: }`
  - Prevent potential race condition which could cause news feed cards to not be marked as read for a short amount of time
  - Introduce appboy.display.destroyFeed method to allow integrators to implement a toggle feed button or otherwise hide the feed from code

## 0.2.2
  - Fix issue where already-cached news feed cards were not properly having impressions logged when the news feed was first shown
  - Minor improvements to In-App Message styling

## 0.2.1
  - Give the news feed a z-index just below bootstrap modal backdrops
  - Support legacy Internet Explorer (complete IE9 support, generally functional IE8 support)
  - Ignore in-app messages with an unknown type (prevents future message types from be inappropriately displayed on versions of the sdk which don't yet support them)

## 0.2.0
  - Added Appboy news feed support

## 0.1.5
  - Correctly identify IE11

## 0.1.4
  - Fixed issue where SlideUp message clicks with a clickAction of URI were not being respected
  - Fixed issue where Date custom attributes, custom event properties, and purchase properties were not being recognized as Dates by the Appboy platform

## 0.1.3
  - Add support for more purchase currencies, allow lowercase currencies
  - Use millisecond precision when logging events

## 0.1.2
  - Introduce optional doNotLoadFontAwesome initialization option and additionally don't load FontAwesome if fontawesome.css or fontawesome.min.css are already on the page.
  - More minor improvements to In-App Message styling

## 0.1.1
  - Various minor improvements to SlideUp styling

## 0.1.0
  - Support in-app messages

## 0.0.5
  - Fixed critical issue which caused browser tabs to become unresponsive with no network connection

## 0.0.4
  - Defend against NS_ERROR_FILE_CORRUPTED (corrupted browser SQLite database) and more generally against inability to use localStorage.

## 0.0.3
  - Provide better backend error messages

## 0.0.2
  - Fixed a bug where due to minification, locally stored data was version-specific

## 0.0.1
  - Fixed bug where multibyte UTF-8 characters were being rejected for various attributes
  - Allow setLogger to be called before initialize
  - Harden usage of localStorage slightly

## 0.0.0
  - Initial release with core functionality.
