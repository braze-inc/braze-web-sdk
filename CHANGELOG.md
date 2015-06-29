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
