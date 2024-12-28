/* tslint:disable */

/* -------------------------------------------------- */

/*      Start of Webpack Hot Extension Middleware     */

/* ================================================== */

/*  This will be converted into a lodash templ., any  */

/*  external argument must be provided using it       */

/* -------------------------------------------------- */
(function (window) {
  var injectionContext = {
    browser: null
  };
  (function () {
    ""||(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("webextension-polyfill", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(this, function (module) {
  /* webextension-polyfill - v0.5.0 - Thu Sep 26 2019 22:22:26 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)";

    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.rejection
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(extensionAPIs.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({ resolve, reject }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);

                target[name](...args);

                // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.
                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;

                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({ resolve, reject }, metadata));
            }
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });

              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.
        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });

      // Keep track if the deprecation warning has been logged at least once.
      let loggedSendResponseDeprecationWarning = false;

      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;

          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }
              didCallSendResponse = true;
              resolve(response);
            };
          });

          let result;
          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result);

          // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.
          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          }

          // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).
          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;
              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          };

          // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.
          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          }

          // Let Chrome know that the listener is replying.
          return true;
        };
      });

      const wrappedSendMessageCallback = ({ reject, resolve }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(extensionAPIs.runtime.lastError);
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, { resolve, reject });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", { minArgs: 1, maxArgs: 3 })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", { minArgs: 2, maxArgs: 3 })
        }
      };
      const settingMetadata = {
        clear: { minArgs: 1, maxArgs: 1 },
        get: { minArgs: 1, maxArgs: 1 },
        set: { minArgs: 1, maxArgs: 1 }
      };
      apiMetadata.privacy = {
        network: {
          networkPredictionEnabled: settingMetadata,
          webRTCIPHandlingPolicy: settingMetadata
        },
        services: {
          passwordSavingEnabled: settingMetadata
        },
        websites: {
          hyperlinkAuditingEnabled: settingMetadata,
          referrersEnabled: settingMetadata
        }
      };

      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    }

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map
"";
  }).bind(injectionContext)();
  var browser = injectionContext.browser;
  var signals = JSON.parse('{"SIGN_CHANGE":"SIGN_CHANGE","SIGN_RELOAD":"SIGN_RELOAD","SIGN_RELOADED":"SIGN_RELOADED","SIGN_LOG":"SIGN_LOG","SIGN_CONNECT":"SIGN_CONNECT"}');
  var config = JSON.parse('{"RECONNECT_INTERVAL":2000,"SOCKET_ERR_CODE_REF":"https://tools.ietf.org/html/rfc6455#section-7.4.1"}');
  var reloadPage = "true" === "true";
  var wsHost = "ws://localhost:9090";
  var SIGN_CHANGE = signals.SIGN_CHANGE,
      SIGN_RELOAD = signals.SIGN_RELOAD,
      SIGN_RELOADED = signals.SIGN_RELOADED,
      SIGN_LOG = signals.SIGN_LOG,
      SIGN_CONNECT = signals.SIGN_CONNECT;
  var RECONNECT_INTERVAL = config.RECONNECT_INTERVAL,
      SOCKET_ERR_CODE_REF = config.SOCKET_ERR_CODE_REF;
  var extension = browser.extension,
      runtime = browser.runtime,
      tabs = browser.tabs;
  var manifest = runtime.getManifest(); // =============================== Helper functions ======================================= //

  var formatter = function formatter(msg) {
    return "[ WER: ".concat(msg, " ]");
  };

  var logger = function logger(msg) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";
    return console[level](formatter(msg));
  };

  var timeFormatter = function timeFormatter(date) {
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }; // ========================== Called only on content scripts ============================== //


  function contentScriptWorker() {
    runtime.sendMessage({
      type: SIGN_CONNECT
    }).then(function (msg) {
      return console.info(msg);
    });
    runtime.onMessage.addListener(function (_ref) {
      var type = _ref.type,
          payload = _ref.payload;

      switch (type) {
        case SIGN_RELOAD:
          logger("Detected Changes. Reloading ...");
          reloadPage && window.location.reload();
          break;

        case SIGN_LOG:
          console.info(payload);
          break;
      }
    });
  } // ======================== Called only on background scripts ============================= //


  function backgroundWorker(socket) {
    runtime.onMessage.addListener(function (action, sender) {
      if (action.type === SIGN_CONNECT) {
        return Promise.resolve(formatter("Connected to Extension Hot Reloader"));
      }

      return true;
    });
    socket.addEventListener("message", function (_ref2) {
      var data = _ref2.data;

      var _JSON$parse = JSON.parse(data),
          type = _JSON$parse.type,
          payload = _JSON$parse.payload;

      if (type === SIGN_CHANGE && (!payload || !payload.onlyPageChanged)) {
        tabs.query({
          status: "complete"
        }).then(function (loadedTabs) {
          loadedTabs.forEach(function (tab) {
            return tab.id && tabs.sendMessage(tab.id, {
              type: SIGN_RELOAD
            });
          });
          socket.send(JSON.stringify({
            type: SIGN_RELOADED,
            payload: formatter("".concat(timeFormatter(new Date()), " - ").concat(manifest.name, " successfully reloaded"))
          }));
          runtime.reload();
        });
      } else {
        runtime.sendMessage({
          type: type,
          payload: payload
        });
      }
    });
    socket.addEventListener("close", function (_ref3) {
      var code = _ref3.code;
      logger("Socket connection closed. Code ".concat(code, ". See more in ").concat(SOCKET_ERR_CODE_REF), "warn");
      var intId = setInterval(function () {
        logger("Attempting to reconnect (tip: Check if Webpack is running)");
        var ws = new WebSocket(wsHost);

        ws.onerror = function () {
          return logger("Error trying to re-connect. Reattempting in ".concat(RECONNECT_INTERVAL / 1000, "s"), "warn");
        };

        ws.addEventListener("open", function () {
          clearInterval(intId);
          logger("Reconnected. Reloading plugin");
          runtime.reload();
        });
      }, RECONNECT_INTERVAL);
    });
  } // ======================== Called only on extension pages that are not the background ============================= //


  function extensionPageWorker() {
    runtime.sendMessage({
      type: SIGN_CONNECT
    }).then(function (msg) {
      return console.info(msg);
    });
    runtime.onMessage.addListener(function (_ref4) {
      var type = _ref4.type,
          payload = _ref4.payload;

      switch (type) {
        case SIGN_CHANGE:
          logger("Detected Changes. Reloading ...");
          reloadPage && window.location.reload();
          break;

        case SIGN_LOG:
          console.info(payload);
          break;
      }
    });
  } // ======================= Bootstraps the middleware =========================== //


  runtime.reload ? extension.getBackgroundPage() === window ? backgroundWorker(new WebSocket(wsHost)) : extensionPageWorker() : contentScriptWorker();
})(window);
/* ----------------------------------------------- */

/* End of Webpack Hot Extension Middleware  */

/* ----------------------------------------------- *//******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/core/Background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/*! exports provided: nanoid, customAlphabet, customRandom, urlAlphabet, random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nanoid", function() { return nanoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customAlphabet", function() { return customAlphabet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customRandom", function() { return customRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlAlphabet", function() { return _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__["urlAlphabet"]; });

// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.



if (true) {
  // All bundlers will remove this block in the production bundle.
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID. If you use Expo, install `expo-random` ' +
        'and use `nanoid/async`.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Add `if (!window.crypto) window.crypto = window.msCrypto` ' +
        'before Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))

let customRandom = (alphabet, size, getRandom) => {
  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
  // values closer to the alphabet size. The bitmask calculates the closest
  // `2^31 - 1` number, which exceeds the alphabet size.
  // For example, the bitmask for the alphabet size 30 is 31 (00011111).
  // `Math.clz32` is not used, because it is not available in browsers.
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  // Though, the bitmask solution is not perfect since the bytes exceeding
  // the alphabet size are refused. Therefore, to reliably generate the ID,
  // the random bytes redundancy has to be satisfied.

  // Note: every hardware random generator call is performance expensive,
  // because the system call for entropy collection takes a lot of time.
  // So, to avoid additional system calls, extra bytes are requested in advance.

  // Next, a step determines how many random bytes to generate.
  // The number of random bytes gets decided upon the ID size, mask,
  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
  // according to benchmarks).

  // `-~f => Math.ceil(f)` if f is a float
  // `-~i => i + 1` if i is an integer
  let step = -~((1.6 * mask * size) / alphabet.length)

  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      // A compact alternative for `for (var i = 0; i < step; i++)`.
      let j = step
      while (j--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[j] & mask] || ''
        // `id.length + 1 === size` is a more compact option.
        if (id.length === +size) return id
      }
    }
  }
}

let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)

let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))

  // A compact alternative for `for (var i = 0; i < step; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    let byte = bytes[size] & 63
    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36)
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}




/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/*! exports provided: urlAlphabet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlAlphabet", function() { return urlAlphabet; });
// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet =
  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'




/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/core/Background.ts":
/*!********************************!*\
  !*** ./src/core/Background.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_BackgroundUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/BackgroundUtils */ "./src/util/BackgroundUtils.ts");
/* harmony import */ var _util_Message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Message */ "./src/util/Message.ts");
/* harmony import */ var _util_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Utils */ "./src/util/Utils.ts");
/* harmony import */ var _model_Store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/Store */ "./src/model/Store.ts");
/* harmony import */ var _model_Client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model/Client */ "./src/model/Client.ts");
/* harmony import */ var _service_Config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/Config */ "./src/service/Config.ts");







var allStores = Array();
var tabsCache = {};
var tabToClose = null;

function getIconsData(active) {
  var e_1, _a;

  var data = {};
  var suffix = "";

  if (!active) {
    suffix = "_grey";
  }

  try {
    for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(['16', '32', '48']), _c = _b.next(); !_c.done; _c = _b.next()) {
      var size = _c.value;
      data[size] = "icons/cficon_" + size + suffix + ".png";
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  return data;
}

function toggleIcon(active, tabId) {
  if (active) {
    chrome.browserAction.setIcon({
      path: getIconsData(true),
      tabId: tabId
    });
  } else {
    chrome.browserAction.setIcon({
      path: getIconsData(false),
      tabId: tabId
    });
  }
}

function scheduleStoresRefresh() {
  console.log("refreshing stores");
  fetch(_service_Config__WEBPACK_IMPORTED_MODULE_6__["Config"].allStoresUrl).then(function (response) {
    response.json().then(function (storesJson) {
      allStores = storesJson;
    });
  });
  setTimeout(function () {
    scheduleStoresRefresh();
  }, _service_Config__WEBPACK_IMPORTED_MODULE_6__["Config"].allStoresRefreshPeriod * 1000);
}

function createClient() {
  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
    var client;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
      switch (_a.label) {
        case 0:
          client = _model_Client__WEBPACK_IMPORTED_MODULE_5__["Client"].create();
          return [4
          /*yield*/
          , fetch(_service_Config__WEBPACK_IMPORTED_MODULE_6__["Config"].apiRootUrl + "/api/clients", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: client.id,
              type: "extension"
            })
          })];

        case 1:
          _a.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
}

function createSaving(clientId, saving) {
  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , fetch(_service_Config__WEBPACK_IMPORTED_MODULE_6__["Config"].apiRootUrl + "/api/clients/" + clientId + "/savings", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(saving)
          })];

        case 1:
          _a.sent();

          return [2
          /*return*/
          ];
      }
    });
  });
}

function getOutUrl(clientId, storeId) {
  return _service_Config__WEBPACK_IMPORTED_MODULE_6__["Config"].outUrl + "/out?c=" + clientId + "&s=" + storeId;
}
/**************************
 * Browser event listeners
 **************************/
// Fired when a tab is updated (reloaded etc.)
// https://developer.chrome.com/extensions/tabs#event-onUpdated


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var e_2, _a, e_3, _b;

  var tabKey = "tab_" + tabId;

  if (tab.url != null) {
    if (tabToClose == null) {
      if (changeInfo.status == 'loading') {
        var domain = _util_Utils__WEBPACK_IMPORTED_MODULE_3__["Utils"].getDomain(tab.url);
        var slug = null;

        try {
          for (var allStores_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(allStores), allStores_1_1 = allStores_1.next(); !allStores_1_1.done; allStores_1_1 = allStores_1.next()) {
            var s = allStores_1_1.value;

            try {
              for (var _c = (e_3 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(s.urlPatterns)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var urlPattern = _d.value;

                if (tab.url.match(urlPattern)) {
                  slug = s.slug;
                  break;
                }
              }
            } catch (e_3_1) {
              e_3 = {
                error: e_3_1
              };
            } finally {
              try {
                if (_d && !_d.done && (_b = _c["return"])) _b.call(_c);
              } finally {
                if (e_3) throw e_3.error;
              }
            }
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (allStores_1_1 && !allStores_1_1.done && (_a = allStores_1["return"])) _a.call(allStores_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }

        if (slug) {
          console.log("Supported : " + domain);
          fetch(_service_Config__WEBPACK_IMPORTED_MODULE_6__["Config"].apiRootUrl + "/api/stores/" + slug + "?target=extension").then(function (response) {
            response.json().then(function (storeJson) {
              if (storeJson == null) {
                storeJson = {};
              }

              if ("id" in storeJson) {
                tabsCache[tabKey] = new _model_Store__WEBPACK_IMPORTED_MODULE_4__["Store"](storeJson);
              }
            });
          });
        } else {
          delete tabsCache[tabKey];
          console.log("Not supported : " + domain);
        }
      } else if (changeInfo.status === 'complete') {
        if (tabKey in tabsCache) {
          var store = tabsCache[tabKey];
          toggleIcon(true, tabId);
          chrome.tabs.sendMessage(tabId, new _util_Message__WEBPACK_IMPORTED_MODULE_2__["default"](_util_Message__WEBPACK_IMPORTED_MODULE_2__["default"].ID_BROWSED_SUPPORTED_STORE, store));

          if (store.coupons.length > 0) {
            chrome.browserAction.setBadgeText({
              tabId: tabId,
              text: store.coupons.length.toString()
            });
            chrome.browserAction.setBadgeBackgroundColor({
              color: "#E64A19"
            });
          }
        }
      }
    } else {
      if (changeInfo.status === 'complete') {
        chrome.tabs.remove(tabToClose, function () {});
        tabToClose = null;
      }
    }
  }
}); // Fired when the active tab changes
// https://developer.chrome.com/extensions/tabs#event-onActivated

chrome.tabs.onActivated.addListener(function (activeInfo) {
  var tabKey = "tab_" + activeInfo.tabId;
  toggleIcon(tabKey in tabsCache, activeInfo.tabId);
}); // Fired when a tab is closed
// https://developer.chrome.com/extensions/tabs#event-onRemoved

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  var tabKey = "tab_" + tabId;

  if (tabKey in tabsCache) {
    tabsCache[tabKey] = {};
  }
}); // Fired when browser action is clicked
// https://developer.chrome.com/extensions/browserAction#event-onClicked

chrome.browserAction.onClicked.addListener(function (tab) {
  var tabKey = "tab_" + tab.id;
  var store = tabsCache[tabKey];
  /*
    if(tabKey in tabsCache && "domain" in tabsCache[tabKey]){
      store= tabsCache[tabKey];
    }
  */

  _util_BackgroundUtils__WEBPACK_IMPORTED_MODULE_1__["default"].sendMessageToTab(new _util_Message__WEBPACK_IMPORTED_MODULE_2__["default"](_util_Message__WEBPACK_IMPORTED_MODULE_2__["default"].ID_CLICKED_EXTENSION_ICON, store), tab.id);
});
chrome.runtime.onStartup.addListener(function () {
  scheduleStoresRefresh();
});
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    createClient();
    scheduleStoresRefresh();
  }
});
/**
 *  Listen to messages from content.js
 */

chrome.runtime.onMessage.addListener(function (message, sender, callback) {
  switch (message.id) {
    case _util_Message__WEBPACK_IMPORTED_MODULE_2__["default"].ID_CREATE_SAVING:
      createSaving(message.data.clientId, message.data.saving);
      break;

    case _util_Message__WEBPACK_IMPORTED_MODULE_2__["default"].ID_OPEN_AFFILIATE_TAB:
      chrome.tabs.create({
        'url': getOutUrl(message.data.clientId, message.data.storeId),
        'active': false
      }, function (tab) {
        if (tab.id) {
          tabToClose = tab.id;
        }
      });
      break;
  }
});

/***/ }),

/***/ "./src/model/Client.ts":
/*!*****************************!*\
  !*** ./src/model/Client.ts ***!
  \*****************************/
/*! exports provided: Client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return Client; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _service_LocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/LocalStorage */ "./src/service/LocalStorage.ts");
/* harmony import */ var _util_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Utils */ "./src/util/Utils.ts");




var Client =
/** @class */
function () {
  function Client(id) {
    this.id = id;
  }

  Client.getId = function () {
    return this._instance.id;
  };

  Client.create = function () {
    var client = new Client(_util_Utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].uuid());
    _service_LocalStorage__WEBPACK_IMPORTED_MODULE_1__["default"].set("client_id", client.id);
    return client;
  };

  Client.initialize = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var clientId;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this._instance) {
              return [2
              /*return*/
              , this._instance];
            }

            return [4
            /*yield*/
            , _service_LocalStorage__WEBPACK_IMPORTED_MODULE_1__["default"].get("client_id")];

          case 1:
            clientId = _a.sent();

            if (clientId) {
              this._instance = new Client(clientId);
            } else {
              this._instance = Client.create(); //chrome.runtime.sendMessage(new Message(Message.ID_CREATE_CLIENT, this._instance.id));
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return Client;
}();



/***/ }),

/***/ "./src/model/Store.ts":
/*!****************************!*\
  !*** ./src/model/Store.ts ***!
  \****************************/
/*! exports provided: StoreID, Store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreID", function() { return StoreID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
var StoreID =
/** @class */
function () {
  function StoreID(id, slug, urlPatterns) {
    this.id = id;
    this.slug = slug;
    this.urlPatterns = urlPatterns;
  }

  return StoreID;
}();



var Store =
/** @class */
function () {
  function Store(store) {
    this.id = store.id;
    this.slug = store.slug;
    this.name = store.name;
    this.extensionSettings = store.extensionSettings;
    this.coupons = store.coupons;
  }

  return Store;
}();



/***/ }),

/***/ "./src/service/Config.ts":
/*!*******************************!*\
  !*** ./src/service/Config.ts ***!
  \*******************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
var Config = {
  //allStoresUrl: "https://www.couponfog.com/config/all_stores_extension.json",
  //allStoresUrl: "http://localhost:4000/api/stores?target=extension",
  allStoresUrl: "https://lb1-api.couponfog.com/api/stores?target=extension",
  allStoresRefreshPeriod: 3600,
  apiRootUrl: "https://lb1-api.couponfog.com",
  //apiRootUrl: "http://localhost",
  outUrl: "https://o.couponfog.com"
};

/***/ }),

/***/ "./src/service/LocalStorage.ts":
/*!*************************************!*\
  !*** ./src/service/LocalStorage.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");


var LocalStorage =
/** @class */
function () {
  function LocalStorage() {}

  LocalStorage.get = function (key) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve, reject) {
          chrome.storage.local.get(key, function (data) {
            resolve(data[key]);
          });
        })];
      });
    });
  };

  LocalStorage.set = function (key, data) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve, reject) {
          var _a;

          chrome.storage.local.set((_a = {}, _a[key] = data, _a), function () {
            //TODO maybe check if data written correctly
            resolve();
          });
        })];
      });
    });
  };

  LocalStorage.clear = function () {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.clear(function () {
        resolve();
      });
    });
  };

  return LocalStorage;
}();

/* harmony default export */ __webpack_exports__["default"] = (LocalStorage);

/***/ }),

/***/ "./src/util/BackgroundUtils.ts":
/*!*************************************!*\
  !*** ./src/util/BackgroundUtils.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BackgroundUtils =
/** @class */
function () {
  function BackgroundUtils() {}

  BackgroundUtils.sendMessageToTab = function (message, tabId) {
    if (!tabId) return;
    chrome.tabs.sendMessage(tabId, message);
  };

  BackgroundUtils.sendMessageToActiveTab = function (message) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var activeTab = tabs[0];

      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, message);
      }
    });
  };

  BackgroundUtils.runContentScript = function (file, allFrames, frameId, callback) {
    chrome.tabs.executeScript({
      file: file,
      allFrames: allFrames,
      frameId: frameId,
      runAt: "document_idle"
    }, callback);
  };

  return BackgroundUtils;
}();

/* harmony default export */ __webpack_exports__["default"] = (BackgroundUtils);

/***/ }),

/***/ "./src/util/Message.ts":
/*!*****************************!*\
  !*** ./src/util/Message.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Message =
/** @class */
function () {
  function Message(id, data) {
    this.id = id;
    this.data = data;
  }

  Message.ID_CLICKED_EXTENSION_ICON = "CLICKED_EXTENSION_ICON";
  Message.ID_BROWSED_SUPPORTED_STORE = "BROWSED_SUPPORTED_STORE";
  Message.ID_CREATE_CLIENT = "CREATE_CLIENT";
  Message.ID_OPEN_AFFILIATE_TAB = "OPEN_AFFILIATE_TAB";
  Message.ID_CREATE_SAVING = "CREATE_SAVING";
  return Message;
}();

/* harmony default export */ __webpack_exports__["default"] = (Message);

/***/ }),

/***/ "./src/util/Utils.ts":
/*!***************************!*\
  !*** ./src/util/Utils.ts ***!
  \***************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");


var nanoid = Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["customAlphabet"])('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);

var Utils =
/** @class */
function () {
  function Utils() {}

  Utils.getTimeSince = function (timeStamp) {
    var now = new Date();
    var secondsPast = Math.floor(now.getTime() / 1000) - timeStamp;
    var unit;
    var value;

    if (secondsPast < 60) {
      unit = 'second';
      value = secondsPast;
    } else if (secondsPast < 3600) {
      unit = 'minute';
      value = Math.floor(secondsPast / 60);
    } else if (secondsPast <= 86400) {
      unit = 'hour';
      value = Math.floor(secondsPast / 3600);
    } else if (secondsPast <= 2592000) {
      unit = 'day';
      value = Math.floor(secondsPast / 86400);
    }

    if (!unit) {
      return null;
    }

    var timeSince = value + " " + unit;

    if (value > 1) {
      timeSince += 's';
    }

    return timeSince;
  };

  Utils.sleep = function (seconds) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve) {
          return setTimeout(resolve, seconds * 1000);
        })];
      });
    });
  };

  Utils.sleepMs = function (ms) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve) {
          return setTimeout(resolve, ms);
        })];
      });
    });
  };

  Utils.getDomain = function (url) {
    var match = url.match(/(?:https?:\/\/)?(?:www[0-9]*\.)?([^/:?#]+)/i);

    if (match != null) {
      return match[1];
    } else {
      console.log("No domain for " + url);
      return null;
    }
  };

  Utils.uuid = function () {
    return nanoid();
  };

  Utils.serializeArray = function (form) {
    var e_1, _a, e_2, _b;

    var arr = [];

    if (!form || form.nodeName !== "FORM") {
      return arr;
    }

    try {
      for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(form.elements), _d = _c.next(); !_d.done; _d = _c.next()) {
        var element = _d.value;

        if (element['name'] === "") {
          continue;
        }

        switch (element.nodeName) {
          case 'INPUT':
            switch (element['type']) {
              case 'text':
              case 'hidden':
              case 'password':
              case 'button':
              case 'reset':
              case 'submit':
                arr.push({
                  name: element['name'],
                  value: element['value']
                });
                break;

              case 'checkbox':
              case 'radio':
                if (element['checked']) {
                  arr.push({
                    name: element['name'],
                    value: element['value']
                  });
                }

                break;

              case 'file':
                break;
            }

            break;

          case 'TEXTAREA':
            arr.push({
              name: element['name'],
              value: element['value']
            });
            break;

          case 'SELECT':
            switch (element['type']) {
              case 'select-one':
                arr.push({
                  name: element['name'],
                  value: element['value']
                });
                break;

              case 'select-multiple':
                try {
                  for (var _e = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(element['options'])), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var option = _f.value;

                    if (option.selected) {
                      arr.push({
                        name: element['name'],
                        value: option.value
                      });
                    }
                  }
                } catch (e_2_1) {
                  e_2 = {
                    error: e_2_1
                  };
                } finally {
                  try {
                    if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                  } finally {
                    if (e_2) throw e_2.error;
                  }
                }

                break;
            }

            break;

          case 'BUTTON':
            switch (element['type']) {
              case 'reset':
              case 'submit':
              case 'button':
                arr.push({
                  name: element['name'],
                  value: element['value']
                });
                break;
            }

            break;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return arr;
  };

  return Utils;
}();



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9pbmRleC5icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uYW5vaWQvdXJsLWFscGhhYmV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvQmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvQ2xpZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9TdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9Db25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2UvTG9jYWxTdG9yYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL0JhY2tncm91bmRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9NZXNzYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL1V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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RyxDQUFDLElBQUosQ0FBUztBQUFDLHNCQUFJLEVBQUUsT0FBTyxDQUFDLE1BQUQsQ0FBZDtBQUF3Qix1QkFBSyxFQUFFLE9BQU8sQ0FBQyxPQUFEO0FBQXRDLGlCQUFUO0FBQ0E7QUFMSjs7QUFPQTtBQTlDSjtBQWdERDs7Ozs7Ozs7Ozs7OztBQUNELFdBQU8sR0FBUDtBQUNELEdBM0RNOztBQTZEVDtBQUFDLENBM0dEIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb3JlL0JhY2tncm91bmQudHNcIik7XG4iLCIvLyBUaGlzIGZpbGUgcmVwbGFjZXMgYGluZGV4LmpzYCBpbiBidW5kbGVycyBsaWtlIHdlYnBhY2sgb3IgUm9sbHVwLFxuLy8gYWNjb3JkaW5nIHRvIGBicm93c2VyYCBjb25maWcgaW4gYHBhY2thZ2UuanNvbmAuXG5cbmltcG9ydCB7IHVybEFscGhhYmV0IH0gZnJvbSAnLi91cmwtYWxwaGFiZXQvaW5kZXguanMnXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8vIEFsbCBidW5kbGVycyB3aWxsIHJlbW92ZSB0aGlzIGJsb2NrIGluIHRoZSBwcm9kdWN0aW9uIGJ1bmRsZS5cbiAgaWYgKFxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgJiZcbiAgICB0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJ1xuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnUmVhY3QgTmF0aXZlIGRvZXMgbm90IGhhdmUgYSBidWlsdC1pbiBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzIHVzZSBgbmFub2lkL25vbi1zZWN1cmVgLiAnICtcbiAgICAgICAgJ0ZvciBzZWN1cmUgSURzLCBpbXBvcnQgYHJlYWN0LW5hdGl2ZS1nZXQtcmFuZG9tLXZhbHVlc2AgJyArXG4gICAgICAgICdiZWZvcmUgTmFubyBJRC4gSWYgeW91IHVzZSBFeHBvLCBpbnN0YWxsIGBleHBvLXJhbmRvbWAgJyArXG4gICAgICAgICdhbmQgdXNlIGBuYW5vaWQvYXN5bmNgLidcbiAgICApXG4gIH1cbiAgaWYgKHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQWRkIGBpZiAoIXdpbmRvdy5jcnlwdG8pIHdpbmRvdy5jcnlwdG8gPSB3aW5kb3cubXNDcnlwdG9gICcgK1xuICAgICAgICAnYmVmb3JlIE5hbm8gSUQgdG8gZml4IElFIDExIHN1cHBvcnQnXG4gICAgKVxuICB9XG4gIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzLCB5b3UgY2FuIHVzZSBuYW5vaWQvbm9uLXNlY3VyZS4nXG4gICAgKVxuICB9XG59XG5cbmxldCByYW5kb20gPSBieXRlcyA9PiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcblxubGV0IGN1c3RvbVJhbmRvbSA9IChhbHBoYWJldCwgc2l6ZSwgZ2V0UmFuZG9tKSA9PiB7XG4gIC8vIEZpcnN0LCBhIGJpdG1hc2sgaXMgbmVjZXNzYXJ5IHRvIGdlbmVyYXRlIHRoZSBJRC4gVGhlIGJpdG1hc2sgbWFrZXMgYnl0ZXNcbiAgLy8gdmFsdWVzIGNsb3NlciB0byB0aGUgYWxwaGFiZXQgc2l6ZS4gVGhlIGJpdG1hc2sgY2FsY3VsYXRlcyB0aGUgY2xvc2VzdFxuICAvLyBgMl4zMSAtIDFgIG51bWJlciwgd2hpY2ggZXhjZWVkcyB0aGUgYWxwaGFiZXQgc2l6ZS5cbiAgLy8gRm9yIGV4YW1wbGUsIHRoZSBiaXRtYXNrIGZvciB0aGUgYWxwaGFiZXQgc2l6ZSAzMCBpcyAzMSAoMDAwMTExMTEpLlxuICAvLyBgTWF0aC5jbHozMmAgaXMgbm90IHVzZWQsIGJlY2F1c2UgaXQgaXMgbm90IGF2YWlsYWJsZSBpbiBicm93c2Vycy5cbiAgbGV0IG1hc2sgPSAoMiA8PCAoTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikpIC0gMVxuICAvLyBUaG91Z2gsIHRoZSBiaXRtYXNrIHNvbHV0aW9uIGlzIG5vdCBwZXJmZWN0IHNpbmNlIHRoZSBieXRlcyBleGNlZWRpbmdcbiAgLy8gdGhlIGFscGhhYmV0IHNpemUgYXJlIHJlZnVzZWQuIFRoZXJlZm9yZSwgdG8gcmVsaWFibHkgZ2VuZXJhdGUgdGhlIElELFxuICAvLyB0aGUgcmFuZG9tIGJ5dGVzIHJlZHVuZGFuY3kgaGFzIHRvIGJlIHNhdGlzZmllZC5cblxuICAvLyBOb3RlOiBldmVyeSBoYXJkd2FyZSByYW5kb20gZ2VuZXJhdG9yIGNhbGwgaXMgcGVyZm9ybWFuY2UgZXhwZW5zaXZlLFxuICAvLyBiZWNhdXNlIHRoZSBzeXN0ZW0gY2FsbCBmb3IgZW50cm9weSBjb2xsZWN0aW9uIHRha2VzIGEgbG90IG9mIHRpbWUuXG4gIC8vIFNvLCB0byBhdm9pZCBhZGRpdGlvbmFsIHN5c3RlbSBjYWxscywgZXh0cmEgYnl0ZXMgYXJlIHJlcXVlc3RlZCBpbiBhZHZhbmNlLlxuXG4gIC8vIE5leHQsIGEgc3RlcCBkZXRlcm1pbmVzIGhvdyBtYW55IHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cbiAgLy8gVGhlIG51bWJlciBvZiByYW5kb20gYnl0ZXMgZ2V0cyBkZWNpZGVkIHVwb24gdGhlIElEIHNpemUsIG1hc2ssXG4gIC8vIGFscGhhYmV0IHNpemUsIGFuZCBtYWdpYyBudW1iZXIgMS42ICh1c2luZyAxLjYgcGVha3MgYXQgcGVyZm9ybWFuY2VcbiAgLy8gYWNjb3JkaW5nIHRvIGJlbmNobWFya3MpLlxuXG4gIC8vIGAtfmYgPT4gTWF0aC5jZWlsKGYpYCBpZiBmIGlzIGEgZmxvYXRcbiAgLy8gYC1+aSA9PiBpICsgMWAgaWYgaSBpcyBhbiBpbnRlZ2VyXG4gIGxldCBzdGVwID0gLX4oKDEuNiAqIG1hc2sgKiBzaXplKSAvIGFscGhhYmV0Lmxlbmd0aClcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBieXRlcyA9IGdldFJhbmRvbShzdGVwKVxuICAgICAgLy8gQSBjb21wYWN0IGFsdGVybmF0aXZlIGZvciBgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwOyBpKyspYC5cbiAgICAgIGxldCBqID0gc3RlcFxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAvLyBBZGRpbmcgYHx8ICcnYCByZWZ1c2VzIGEgcmFuZG9tIGJ5dGUgdGhhdCBleGNlZWRzIHRoZSBhbHBoYWJldCBzaXplLlxuICAgICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tqXSAmIG1hc2tdIHx8ICcnXG4gICAgICAgIC8vIGBpZC5sZW5ndGggKyAxID09PSBzaXplYCBpcyBhIG1vcmUgY29tcGFjdCBvcHRpb24uXG4gICAgICAgIGlmIChpZC5sZW5ndGggPT09ICtzaXplKSByZXR1cm4gaWRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBzaXplKSA9PiBjdXN0b21SYW5kb20oYWxwaGFiZXQsIHNpemUsIHJhbmRvbSlcblxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGJ5dGVzID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSlcblxuICAvLyBBIGNvbXBhY3QgYWx0ZXJuYXRpdmUgZm9yIGBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKylgLlxuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgLy8gSXQgaXMgaW5jb3JyZWN0IHRvIHVzZSBieXRlcyBleGNlZWRpbmcgdGhlIGFscGhhYmV0IHNpemUuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBtYXNrIHJlZHVjZXMgdGhlIHJhbmRvbSBieXRlIGluIHRoZSAwLTI1NSB2YWx1ZVxuICAgIC8vIHJhbmdlIHRvIHRoZSAwLTYzIHZhbHVlIHJhbmdlLiBUaGVyZWZvcmUsIGFkZGluZyBoYWNrcywgc3VjaFxuICAgIC8vIGFzIGVtcHR5IHN0cmluZyBmYWxsYmFjayBvciBtYWdpYyBudW1iZXJzLCBpcyB1bm5lY2Nlc3NhcnkgYmVjYXVzZVxuICAgIC8vIHRoZSBiaXRtYXNrIHRyaW1zIGJ5dGVzIGRvd24gdG8gdGhlIGFscGhhYmV0IHNpemUuXG4gICAgbGV0IGJ5dGUgPSBieXRlc1tzaXplXSAmIDYzXG4gICAgaWYgKGJ5dGUgPCAzNikge1xuICAgICAgLy8gYDAtOWEtemBcbiAgICAgIGlkICs9IGJ5dGUudG9TdHJpbmcoMzYpXG4gICAgfSBlbHNlIGlmIChieXRlIDwgNjIpIHtcbiAgICAgIC8vIGBBLVpgXG4gICAgICBpZCArPSAoYnl0ZSAtIDI2KS50b1N0cmluZygzNikudG9VcHBlckNhc2UoKVxuICAgIH0gZWxzZSBpZiAoYnl0ZSA8IDYzKSB7XG4gICAgICBpZCArPSAnXydcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgKz0gJy0nXG4gICAgfVxuICB9XG4gIHJldHVybiBpZFxufVxuXG5leHBvcnQgeyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0LCBjdXN0b21SYW5kb20sIHVybEFscGhhYmV0LCByYW5kb20gfVxuIiwiLy8gVGhpcyBhbHBoYWJldCB1c2VzIGBBLVphLXowLTlfLWAgc3ltYm9scy4gVGhlIGdlbmV0aWMgYWxnb3JpdGhtIGhlbHBlZFxuLy8gb3B0aW1pemUgdGhlIGd6aXAgY29tcHJlc3Npb24gZm9yIHRoaXMgYWxwaGFiZXQuXG5sZXQgdXJsQWxwaGFiZXQgPVxuICAnTW9kdWxlU3ltYmhhc093blByLTAxMjM0NTY3ODlBQkNERUZHSE5SVmZnY3RpVXZ6X0txWVRKa0x4cFpYSWpRVydcblxuZXhwb3J0IHsgdXJsQWxwaGFiZXQgfVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCBCYWNrZ3JvdW5kVXRpbHMgZnJvbSBcIi4uL3V0aWwvQmFja2dyb3VuZFV0aWxzXCI7XHJcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuLi91dGlsL01lc3NhZ2VcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcclxuaW1wb3J0IHtTdG9yZSwgU3RvcmVJRH0gZnJvbSBcIi4uL21vZGVsL1N0b3JlXCI7XHJcbmltcG9ydCB7Q2xpZW50fSBmcm9tIFwiLi4vbW9kZWwvQ2xpZW50XCI7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi4vc2VydmljZS9Db25maWdcIjtcclxuaW1wb3J0IHtTYXZpbmd9IGZyb20gXCIuLi9tb2RlbC9TYXZpbmdcIjtcclxuaW1wb3J0IFRhYiA9IGNocm9tZS50YWJzLlRhYjtcclxuXHJcbmxldCBhbGxTdG9yZXM9IEFycmF5PFN0b3JlSUQ+KCk7XHJcbmNvbnN0IHRhYnNDYWNoZT0ge307XHJcbmxldCB0YWJUb0Nsb3NlOiBudW1iZXJ8bnVsbD0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIGdldEljb25zRGF0YShhY3RpdmU6IGJvb2xlYW4pe1xyXG4gIGNvbnN0IGRhdGE9IHt9O1xyXG4gIGxldCBzdWZmaXg9IFwiXCI7XHJcbiAgaWYoIWFjdGl2ZSl7XHJcbiAgICBzdWZmaXg9IFwiX2dyZXlcIjtcclxuICB9XHJcbiAgZm9yKGNvbnN0IHNpemUgb2YgWycxNicsJzMyJywnNDgnXSl7XHJcbiAgICBkYXRhW3NpemVdPSBgaWNvbnMvY2ZpY29uXyR7c2l6ZX0ke3N1ZmZpeH0ucG5nYDtcclxuICB9XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn1cclxuZnVuY3Rpb24gdG9nZ2xlSWNvbihhY3RpdmU6IGJvb2xlYW4sIHRhYklkOiBudW1iZXIpe1xyXG4gIGlmIChhY3RpdmUpe1xyXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7cGF0aCA6IGdldEljb25zRGF0YSh0cnVlKSwgdGFiSWR9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7cGF0aDogZ2V0SWNvbnNEYXRhKGZhbHNlKSwgdGFiSWR9KTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gc2NoZWR1bGVTdG9yZXNSZWZyZXNoKCl7XHJcbiAgY29uc29sZS5sb2coXCJyZWZyZXNoaW5nIHN0b3Jlc1wiKTtcclxuICBmZXRjaChDb25maWcuYWxsU3RvcmVzVXJsKS50aGVuKCAocmVzcG9uc2UpID0+IHtcclxuICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChzdG9yZXNKc29uKSA9PiB7XHJcbiAgICAgIGFsbFN0b3Jlcz0gc3RvcmVzSnNvbjtcclxuICAgIH0pXHJcbiAgfSk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBzY2hlZHVsZVN0b3Jlc1JlZnJlc2goKTtcclxuICB9LENvbmZpZy5hbGxTdG9yZXNSZWZyZXNoUGVyaW9kKjEwMDApO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsaWVudCgpe1xyXG4gIGNvbnN0IGNsaWVudD0gQ2xpZW50LmNyZWF0ZSgpO1xyXG4gIGF3YWl0IGZldGNoKGAke0NvbmZpZy5hcGlSb290VXJsfS9hcGkvY2xpZW50c2Ase1xyXG4gICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICBtb2RlOiAnY29ycycsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH0sXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGlkIDogY2xpZW50LmlkICwgdHlwZTogXCJleHRlbnNpb25cIn0pXHJcbiAgfSk7XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlU2F2aW5nKGNsaWVudElkOiBzdHJpbmcsc2F2aW5nOiBTYXZpbmcpe1xyXG4gIGF3YWl0IGZldGNoKGAke0NvbmZpZy5hcGlSb290VXJsfS9hcGkvY2xpZW50cy8ke2NsaWVudElkfS9zYXZpbmdzYCx7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIG1vZGU6ICdjb3JzJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhdmluZylcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRPdXRVcmwoY2xpZW50SWQsIHN0b3JlSWQpe1xyXG4gIHJldHVybiBgJHtDb25maWcub3V0VXJsfS9vdXQ/Yz0ke2NsaWVudElkfSZzPSR7c3RvcmVJZH1gO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQnJvd3NlciBldmVudCBsaXN0ZW5lcnNcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLy8gRmlyZWQgd2hlbiBhIHRhYiBpcyB1cGRhdGVkIChyZWxvYWRlZCBldGMuKVxyXG4vLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2V4dGVuc2lvbnMvdGFicyNldmVudC1vblVwZGF0ZWRcclxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCBmdW5jdGlvbiAodGFiSWQsIGNoYW5nZUluZm8sIHRhYikge1xyXG4gIGNvbnN0IHRhYktleT0gXCJ0YWJfXCIrdGFiSWQ7XHJcbiAgaWYodGFiLnVybCE9bnVsbCl7XHJcbiAgICBpZih0YWJUb0Nsb3NlPT1udWxsKXtcclxuICAgICAgaWYgKGNoYW5nZUluZm8uc3RhdHVzID09ICdsb2FkaW5nJykge1xyXG4gICAgICAgIGNvbnN0IGRvbWFpbj0gVXRpbHMuZ2V0RG9tYWluKHRhYi51cmwpO1xyXG4gICAgICAgIGxldCBzbHVnOiBzdHJpbmd8bnVsbD0gbnVsbDtcclxuICAgICAgICBmb3IoY29uc3QgcyBvZiBhbGxTdG9yZXMpe1xyXG4gICAgICAgICAgZm9yKGNvbnN0IHVybFBhdHRlcm4gb2Ygcy51cmxQYXR0ZXJucyl7XHJcbiAgICAgICAgICAgIGlmKHRhYi51cmwubWF0Y2godXJsUGF0dGVybikpe1xyXG4gICAgICAgICAgICAgIHNsdWc9IHMuc2x1ZztcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzbHVnKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VwcG9ydGVkIDogXCIrZG9tYWluKTtcclxuICAgICAgICAgIGZldGNoKGAke0NvbmZpZy5hcGlSb290VXJsfS9hcGkvc3RvcmVzLyR7c2x1Z30/dGFyZ2V0PWV4dGVuc2lvbmApLnRoZW4oIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoc3RvcmVKc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoc3RvcmVKc29uPT1udWxsKXtcclxuICAgICAgICAgICAgICAgIHN0b3JlSnNvbj0ge307XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKFwiaWRcIiBpbiBzdG9yZUpzb24pe1xyXG4gICAgICAgICAgICAgICAgdGFic0NhY2hlW3RhYktleV09IG5ldyBTdG9yZShzdG9yZUpzb24pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZGVsZXRlIHRhYnNDYWNoZVt0YWJLZXldO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3Qgc3VwcG9ydGVkIDogXCIrZG9tYWluKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1lbHNlIGlmKGNoYW5nZUluZm8uc3RhdHVzPT09J2NvbXBsZXRlJyl7XHJcbiAgICAgICAgaWYodGFiS2V5IGluIHRhYnNDYWNoZSl7XHJcbiAgICAgICAgICBjb25zdCBzdG9yZT0gdGFic0NhY2hlW3RhYktleV07XHJcbiAgICAgICAgICB0b2dnbGVJY29uKHRydWUsIHRhYklkKTtcclxuICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCBuZXcgTWVzc2FnZShNZXNzYWdlLklEX0JST1dTRURfU1VQUE9SVEVEX1NUT1JFLCBzdG9yZSkpO1xyXG4gICAgICAgICAgaWYoc3RvcmUuY291cG9ucy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGFiSWQ6IHRhYklkLCB0ZXh0OiBzdG9yZS5jb3Vwb25zLmxlbmd0aC50b1N0cmluZygpfSk7XHJcbiAgICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHtjb2xvcjogXCIjRTY0QTE5XCJ9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICBpZihjaGFuZ2VJbmZvLnN0YXR1cz09PSdjb21wbGV0ZScpe1xyXG4gICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWJUb0Nsb3NlLCBmdW5jdGlvbigpIHt9KTtcclxuICAgICAgICB0YWJUb0Nsb3NlPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIEZpcmVkIHdoZW4gdGhlIGFjdGl2ZSB0YWIgY2hhbmdlc1xyXG4vLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2V4dGVuc2lvbnMvdGFicyNldmVudC1vbkFjdGl2YXRlZFxyXG5jaHJvbWUudGFicy5vbkFjdGl2YXRlZC5hZGRMaXN0ZW5lciggZnVuY3Rpb24gKGFjdGl2ZUluZm8pIHtcclxuICBsZXQgdGFiS2V5PSBcInRhYl9cIithY3RpdmVJbmZvLnRhYklkO1xyXG4gIHRvZ2dsZUljb24odGFiS2V5IGluIHRhYnNDYWNoZSwgYWN0aXZlSW5mby50YWJJZCk7XHJcbn0pO1xyXG5cclxuLy8gRmlyZWQgd2hlbiBhIHRhYiBpcyBjbG9zZWRcclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9leHRlbnNpb25zL3RhYnMjZXZlbnQtb25SZW1vdmVkXHJcbmNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lciggZnVuY3Rpb24gKHRhYklkLCByZW1vdmVJbmZvKSB7XHJcbiAgbGV0IHRhYktleT0gXCJ0YWJfXCIrdGFiSWQ7XHJcbiAgaWYodGFiS2V5IGluIHRhYnNDYWNoZSl7XHJcbiAgICB0YWJzQ2FjaGVbdGFiS2V5XT0ge307XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG4vLyBGaXJlZCB3aGVuIGJyb3dzZXIgYWN0aW9uIGlzIGNsaWNrZWRcclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9leHRlbnNpb25zL2Jyb3dzZXJBY3Rpb24jZXZlbnQtb25DbGlja2VkXHJcbmNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbih0YWI6IFRhYikge1xyXG4gIGxldCB0YWJLZXk9IFwidGFiX1wiK3RhYi5pZDtcclxuICBsZXQgc3RvcmU9IHRhYnNDYWNoZVt0YWJLZXldO1xyXG4vKlxyXG4gIGlmKHRhYktleSBpbiB0YWJzQ2FjaGUgJiYgXCJkb21haW5cIiBpbiB0YWJzQ2FjaGVbdGFiS2V5XSl7XHJcbiAgICBzdG9yZT0gdGFic0NhY2hlW3RhYktleV07XHJcbiAgfVxyXG4qL1xyXG4gIEJhY2tncm91bmRVdGlscy5zZW5kTWVzc2FnZVRvVGFiKG5ldyBNZXNzYWdlKE1lc3NhZ2UuSURfQ0xJQ0tFRF9FWFRFTlNJT05fSUNPTiwgc3RvcmUpLCB0YWIuaWQpO1xyXG59KTtcclxuY2hyb21lLnJ1bnRpbWUub25TdGFydHVwLmFkZExpc3RlbmVyKGZ1bmN0aW9uKCkge1xyXG4gIHNjaGVkdWxlU3RvcmVzUmVmcmVzaCgpO1xyXG59KTtcclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24oZGV0YWlscyl7XHJcbiAgaWYoZGV0YWlscy5yZWFzb249PT1cImluc3RhbGxcIil7XHJcbiAgICBjcmVhdGVDbGllbnQoKTtcclxuICAgIHNjaGVkdWxlU3RvcmVzUmVmcmVzaCgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogIExpc3RlbiB0byBtZXNzYWdlcyBmcm9tIGNvbnRlbnQuanNcclxuICovXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihtZXNzYWdlOiBNZXNzYWdlLHNlbmRlcixjYWxsYmFjayl7XHJcbiAgc3dpdGNoIChtZXNzYWdlLmlkKSB7XHJcbiAgICBjYXNlIE1lc3NhZ2UuSURfQ1JFQVRFX1NBVklORzpcclxuICAgICAgY3JlYXRlU2F2aW5nKG1lc3NhZ2UuZGF0YS5jbGllbnRJZCwgbWVzc2FnZS5kYXRhLnNhdmluZyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBNZXNzYWdlLklEX09QRU5fQUZGSUxJQVRFX1RBQjpcclxuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsndXJsJzogZ2V0T3V0VXJsKG1lc3NhZ2UuZGF0YS5jbGllbnRJZCwgbWVzc2FnZS5kYXRhLnN0b3JlSWQpLCAnYWN0aXZlJzogZmFsc2V9LCBmdW5jdGlvbih0YWIpIHtcclxuICAgICAgICBpZih0YWIuaWQpe1xyXG4gICAgICAgICAgdGFiVG9DbG9zZT0gdGFiLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufSk7XHJcbiIsImltcG9ydCBMb2NhbFN0b3JhZ2UgZnJvbSBcIi4uL3NlcnZpY2UvTG9jYWxTdG9yYWdlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4uL3V0aWwvTWVzc2FnZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2xpZW50IHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGlkKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgc3RhdGljIGdldElkKCl7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlLmlkO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KFV0aWxzLnV1aWQoKSk7XG4gICAgTG9jYWxTdG9yYWdlLnNldChcImNsaWVudF9pZFwiLCBjbGllbnQuaWQpO1xuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgaW5pdGlhbGl6ZSgpIDogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgfVxuICAgIGxldCBjbGllbnRJZCA9IGF3YWl0IExvY2FsU3RvcmFnZS5nZXQoXCJjbGllbnRfaWRcIik7XG4gICAgaWYgKGNsaWVudElkKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBDbGllbnQoY2xpZW50SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IENsaWVudC5jcmVhdGUoKTtcbiAgICAgIC8vY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2UoTWVzc2FnZS5JRF9DUkVBVEVfQ0xJRU5ULCB0aGlzLl9pbnN0YW5jZS5pZCkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtDb3Vwb259IGZyb20gXCIuL0NvdXBvblwiO1xuXG5leHBvcnQgY2xhc3MgU3RvcmVJRHtcbiAgcHVibGljIGlkOiBudW1iZXI7XG4gIHB1YmxpYyBzbHVnOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmxQYXR0ZXJuczogQXJyYXk8UmVnRXhwPjtcblxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBzbHVnOiBzdHJpbmcsIHVybFBhdHRlcm5zOiBBcnJheTxSZWdFeHA+KSB7XG4gICAgdGhpcy5pZD0gaWQ7XG4gICAgdGhpcy5zbHVnPSBzbHVnO1xuICAgIHRoaXMudXJsUGF0dGVybnM9IHVybFBhdHRlcm5zO1xuICB9XG59XG5leHBvcnQgY2xhc3MgU3RvcmV7XG4gIHB1YmxpYyBpZDogbnVtYmVyO1xuICBwdWJsaWMgc2x1Zzogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgZXh0ZW5zaW9uU2V0dGluZ3M6IG9iamVjdHxudWxsO1xuICBwdWJsaWMgY291cG9uczogQXJyYXk8Q291cG9uPjtcblxuICBjb25zdHJ1Y3RvcihzdG9yZSkge1xuICAgIHRoaXMuaWQ9IHN0b3JlLmlkO1xuICAgIHRoaXMuc2x1Zz0gc3RvcmUuc2x1ZztcbiAgICB0aGlzLm5hbWU9IHN0b3JlLm5hbWU7XG4gICAgdGhpcy5leHRlbnNpb25TZXR0aW5ncz0gc3RvcmUuZXh0ZW5zaW9uU2V0dGluZ3M7XG4gICAgdGhpcy5jb3Vwb25zPSBzdG9yZS5jb3Vwb25zO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgQ29uZmlnPSB7XG4gIC8vYWxsU3RvcmVzVXJsOiBcImh0dHBzOi8vd3d3LmNvdXBvbmZvZy5jb20vY29uZmlnL2FsbF9zdG9yZXNfZXh0ZW5zaW9uLmpzb25cIixcbiAgLy9hbGxTdG9yZXNVcmw6IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2FwaS9zdG9yZXM/dGFyZ2V0PWV4dGVuc2lvblwiLFxuICBhbGxTdG9yZXNVcmw6IFwiaHR0cHM6Ly9sYjEtYXBpLmNvdXBvbmZvZy5jb20vYXBpL3N0b3Jlcz90YXJnZXQ9ZXh0ZW5zaW9uXCIsXG4gIGFsbFN0b3Jlc1JlZnJlc2hQZXJpb2Q6IDM2MDAsXG4gIGFwaVJvb3RVcmw6IFwiaHR0cHM6Ly9sYjEtYXBpLmNvdXBvbmZvZy5jb21cIixcbiAgLy9hcGlSb290VXJsOiBcImh0dHA6Ly9sb2NhbGhvc3RcIixcbiAgb3V0VXJsOiBcImh0dHBzOi8vby5jb3Vwb25mb2cuY29tXCJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxTdG9yYWdle1xyXG4gIHN0YXRpYyBhc3luYyBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPGFueT57XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoa2V5LCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICByZXNvbHZlKGRhdGFba2V5XSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGljIGFzeW5jIHNldChrZXk6IHN0cmluZywgZGF0YTogT2JqZWN0KTogUHJvbWlzZTxhbnk+e1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtba2V5XTogZGF0YX0sICgpID0+IHtcclxuICAgICAgICAvL1RPRE8gbWF5YmUgY2hlY2sgaWYgZGF0YSB3cml0dGVuIGNvcnJlY3RseVxyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgc3RhdGljIGNsZWFyKCk6IFByb21pc2U8YW55PntcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuY2xlYXIoKCk9PntcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBNZXNzYWdlIGZyb20gXCIuL01lc3NhZ2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tncm91bmRVdGlsc3tcclxuXHJcbiAgICBzdGF0aWMgc2VuZE1lc3NhZ2VUb1RhYihtZXNzYWdlOiBvYmplY3QsIHRhYklkOiBudW1iZXJ8dW5kZWZpbmVkKXtcclxuICAgICAgICBpZighdGFiSWQpIHJldHVybjtcclxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJJZCwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNlbmRNZXNzYWdlVG9BY3RpdmVUYWIobWVzc2FnZSl7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIGZ1bmN0aW9uICh0YWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRhYnNbMF07XHJcbiAgICAgICAgICAgIGlmKGFjdGl2ZVRhYi5pZCl7Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCBtZXNzYWdlKTt9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJ1bkNvbnRlbnRTY3JpcHQoZmlsZTogc3RyaW5nLCBhbGxGcmFtZXM6IGJvb2xlYW4sIGZyYW1lSWQ6IG51bWJlciB8IHVuZGVmaW5lZCwgY2FsbGJhY2s/KXtcclxuICAgICAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHtcclxuICAgICAgICAgICAgZmlsZSxcclxuICAgICAgICAgICAgYWxsRnJhbWVzLFxyXG4gICAgICAgICAgICBmcmFtZUlkLFxyXG4gICAgICAgICAgICBydW5BdDogXCJkb2N1bWVudF9pZGxlXCJcclxuICAgICAgICB9LCBjYWxsYmFjayk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdle1xyXG4gIFxyXG4gIHB1YmxpYyBzdGF0aWMgSURfQ0xJQ0tFRF9FWFRFTlNJT05fSUNPTj0gXCJDTElDS0VEX0VYVEVOU0lPTl9JQ09OXCI7XHJcbiAgcHVibGljIHN0YXRpYyBJRF9CUk9XU0VEX1NVUFBPUlRFRF9TVE9SRT0gXCJCUk9XU0VEX1NVUFBPUlRFRF9TVE9SRVwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgSURfQ1JFQVRFX0NMSUVOVD0gXCJDUkVBVEVfQ0xJRU5UXCI7XHJcbiAgcHVibGljIHN0YXRpYyBJRF9PUEVOX0FGRklMSUFURV9UQUI9IFwiT1BFTl9BRkZJTElBVEVfVEFCXCI7XHJcbiAgcHVibGljIHN0YXRpYyBJRF9DUkVBVEVfU0FWSU5HPSBcIkNSRUFURV9TQVZJTkdcIjtcclxuXHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIGRhdGE6IGFueTtcclxuICBcclxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICB0aGlzLmlkPSBpZDtcclxuICAgIHRoaXMuZGF0YT0gZGF0YTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBjdXN0b21BbHBoYWJldCB9IGZyb20gJ25hbm9pZCc7XG5jb25zdCBuYW5vaWQgPSBjdXN0b21BbHBoYWJldCgnMTIzNDU2Nzg5MGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonLCAyMCk7XG5cbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBnZXRUaW1lU2luY2UodGltZVN0YW1wKSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBzZWNvbmRzUGFzdCA9IE1hdGguZmxvb3Iobm93LmdldFRpbWUoKS8xMDAwKSAtIHRpbWVTdGFtcDtcbiAgICBsZXQgdW5pdDtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYoc2Vjb25kc1Bhc3QgPCA2MCl7XG4gICAgICB1bml0PSAnc2Vjb25kJztcbiAgICAgIHZhbHVlPSBzZWNvbmRzUGFzdDtcbiAgICB9ZWxzZSBpZihzZWNvbmRzUGFzdCA8IDM2MDApe1xuICAgICAgdW5pdD0gJ21pbnV0ZSc7XG4gICAgICB2YWx1ZT0gTWF0aC5mbG9vcihzZWNvbmRzUGFzdC82MCk7XG4gICAgfWVsc2UgaWYoc2Vjb25kc1Bhc3QgPD0gODY0MDApe1xuICAgICAgdW5pdD0gJ2hvdXInO1xuICAgICAgdmFsdWU9IE1hdGguZmxvb3Ioc2Vjb25kc1Bhc3QvMzYwMCk7XG4gICAgfWVsc2UgaWYoc2Vjb25kc1Bhc3QgPD0gMjU5MjAwMCl7XG4gICAgICB1bml0PSAnZGF5JztcbiAgICAgIHZhbHVlPSBNYXRoLmZsb29yKHNlY29uZHNQYXN0Lzg2NDAwKTtcbiAgICB9XG4gICAgaWYoIXVuaXQpe1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCB0aW1lU2luY2U9IGAke3ZhbHVlfSAke3VuaXR9YDtcbiAgICBpZih2YWx1ZT4xKXtcbiAgICAgIHRpbWVTaW5jZSs9ICdzJztcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVTaW5jZTtcbiAgfVxuICBzdGF0aWMgYXN5bmMgc2xlZXAoc2Vjb25kcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgc2Vjb25kcyoxMDAwKSk7XG4gIH1cbiAgc3RhdGljIGFzeW5jIHNsZWVwTXMobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gIH1cbiAgc3RhdGljIGdldERvbWFpbih1cmwpIHtcbiAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2goLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1swLTldKlxcLik/KFteLzo/I10rKS9pKTtcbiAgICBpZiAobWF0Y2ggIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIGRvbWFpbiBmb3IgXCIrdXJsKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgdXVpZCgpe1xuICAgIHJldHVybiBuYW5vaWQoKTtcbiAgfVxuICBzdGF0aWMgc2VyaWFsaXplQXJyYXkoZm9ybTogSFRNTEZvcm1FbGVtZW50KSB7XG4gICAgY29uc3QgYXJyOiBBcnJheTx7bmFtZSx2YWx1ZX0+PSBbXTtcbiAgICBpZiAoIWZvcm0gfHwgZm9ybS5ub2RlTmFtZSAhPT0gXCJGT1JNXCIpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBmb3JtLmVsZW1lbnRzKSB7XG4gICAgICBpZiAoZWxlbWVudFsnbmFtZSddID09PSBcIlwiKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChlbGVtZW50Lm5vZGVOYW1lKSB7XG4gICAgICAgIGNhc2UgJ0lOUFVUJzpcbiAgICAgICAgICBzd2l0Y2ggKGVsZW1lbnRbJ3R5cGUnXSkge1xuICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICAgICAgY2FzZSAncGFzc3dvcmQnOlxuICAgICAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgICAgIGNhc2UgJ3Jlc2V0JzpcbiAgICAgICAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgICAgICAgIGFyci5wdXNoKHtuYW1lOiBlbGVtZW50WyduYW1lJ10sIHZhbHVlOiBlbGVtZW50Wyd2YWx1ZSddfSlcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50WydjaGVja2VkJ10pIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7bmFtZTogZWxlbWVudFsnbmFtZSddLCB2YWx1ZTogZWxlbWVudFsndmFsdWUnXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnVEVYVEFSRUEnOlxuICAgICAgICAgIGFyci5wdXNoKHtuYW1lOiBlbGVtZW50WyduYW1lJ10sIHZhbHVlOiBlbGVtZW50Wyd2YWx1ZSddfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1NFTEVDVCc6XG4gICAgICAgICAgc3dpdGNoIChlbGVtZW50Wyd0eXBlJ10pIHtcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdC1vbmUnOlxuICAgICAgICAgICAgICBhcnIucHVzaCh7bmFtZTogZWxlbWVudFsnbmFtZSddLCB2YWx1ZTogZWxlbWVudFsndmFsdWUnXX0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdC1tdWx0aXBsZSc6XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGVsZW1lbnRbJ29wdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHtuYW1lOiBlbGVtZW50WyduYW1lJ10sIHZhbHVlOiBvcHRpb24udmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdCVVRUT04nOlxuICAgICAgICAgIHN3aXRjaCAoZWxlbWVudFsndHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgICAgICAgYXJyLnB1c2goe25hbWU6IGVsZW1lbnRbJ25hbWUnXSwgdmFsdWU6IGVsZW1lbnRbJ3ZhbHVlJ119KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=