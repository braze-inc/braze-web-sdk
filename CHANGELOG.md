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
  - Fixed issue which could cause browser tabs to become unresponsive with no network connection

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
