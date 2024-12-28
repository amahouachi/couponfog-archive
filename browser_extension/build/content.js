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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/core/Content.ts");
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

/***/ "./src/core/Content.ts":
/*!*****************************!*\
  !*** ./src/core/Content.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_Message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Message */ "./src/util/Message.ts");
/* harmony import */ var _view_StoreView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/StoreView */ "./src/view/StoreView.ts");
/* harmony import */ var _view_NoCoupons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/NoCoupons */ "./src/view/NoCoupons.ts");
/* harmony import */ var _view_NoStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/NoStore */ "./src/view/NoStore.ts");
/* harmony import */ var _Website__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Website */ "./src/core/Website.ts");
/* harmony import */ var _model_Client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/Client */ "./src/model/Client.ts");
/* harmony import */ var _util_Utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/Utils */ "./src/util/Utils.ts");








var currentView = null;
_model_Client__WEBPACK_IMPORTED_MODULE_6__["Client"].initialize();

function isSupportedMessage(id) {
  return id === _util_Message__WEBPACK_IMPORTED_MODULE_1__["default"].ID_BROWSED_SUPPORTED_STORE || id === _util_Message__WEBPACK_IMPORTED_MODULE_1__["default"].ID_CLICKED_EXTENSION_ICON;
} // Listen to messages from background
// https://developer.chrome.com/apps/messaging
// message.action determines the action to be done


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var store, website, _a;

    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!isSupportedMessage(message.id)) {
            return [2
            /*return*/
            ];
          }

          store = message.data;
          website = new _Website__WEBPACK_IMPORTED_MODULE_5__["Website"](store === null || store === void 0 ? void 0 : store.extensionSettings);
          _a = message.id;

          switch (_a) {
            case _util_Message__WEBPACK_IMPORTED_MODULE_1__["default"].ID_CLICKED_EXTENSION_ICON:
              return [3
              /*break*/
              , 1];

            case _util_Message__WEBPACK_IMPORTED_MODULE_1__["default"].ID_BROWSED_SUPPORTED_STORE:
              return [3
              /*break*/
              , 2];
          }

          return [3
          /*break*/
          , 4];

        case 1:
          if (currentView) {
            currentView.toggle();
            return [3
            /*break*/
            , 4];
          }

          if (store) {
            if (store.coupons.length > 0) {
              currentView = new _view_StoreView__WEBPACK_IMPORTED_MODULE_2__["StoreView"](store, website);
            } else {
              currentView = new _view_NoCoupons__WEBPACK_IMPORTED_MODULE_3__["NoCouponsView"]();
            }
          } else {
            currentView = new _view_NoStore__WEBPACK_IMPORTED_MODULE_4__["NoStoreView"]();
          }

          return [3
          /*break*/
          , 4];

        case 2:
          return [4
          /*yield*/
          , _util_Utils__WEBPACK_IMPORTED_MODULE_7__["Utils"].sleep(2)];

        case 3:
          _b.sent();

          if (store.coupons.length > 0 && website.shouldShowAutoApply()) {
            if (currentView) {
              currentView.close();
            }

            currentView = new _view_StoreView__WEBPACK_IMPORTED_MODULE_2__["StoreView"](store, website, true);
          }

          return [3
          /*break*/
          , 4];

        case 4:
          return [2
          /*return*/
          ];
      }
    });
  });
});

/***/ }),

/***/ "./src/core/Website.ts":
/*!*****************************!*\
  !*** ./src/core/Website.ts ***!
  \*****************************/
/*! exports provided: WebsiteSettings, Website */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsiteSettings", function() { return WebsiteSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Website", function() { return Website; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Utils */ "./src/util/Utils.ts");

 //import * as $ from 'jquery/dist/jquery.min';
//NOTE: for firefox, need to clone dispatched events otherwise javascript listeners
//on the host page cannot access it (permission denied accessing event.target)
//https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.cloneInto

var WebsiteSettings =
/** @class */
function () {
  function WebsiteSettings(settings) {
    var e_1, _a;

    this.autoApplyEnabled = 0;
    this.selectorCode = "";
    this.selectorApplyCode = "";
    this.selectorSubmitCode = "";
    this.selectorRemoveCode = "";
    this.selectorCheckoutTotal = "";
    this.methodApplyCode = "click";
    this.methodApplyCodeAsUser = "click";
    this.checkoutAmountBase = 1;
    this.waitBeforeCheckSuccess = 2000;
    this.waitBeforeApplyNext = 1000;
    this.waitAfterRemoveCode = 1000;
    this.checkSuccessExpression = "";
    this.checkoutUrlRegex = "";
    this.scriptBeforeApplyCode = "";

    if (settings) {
      try {
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object.keys(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;

          if (settings[key] !== undefined) {
            this[key] = settings[key];
          }
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
    }
  }

  return WebsiteSettings;
}();



var Website =
/** @class */
function () {
  function Website(extensionSettings) {
    this.settings = new WebsiteSettings(extensionSettings);
  }

  Website.prototype.shouldShowAutoApply = function () {
    return this.settings && this.isAutoApplyEnabled() && this.isOnCheckoutPage(document.location.href) && this.isCheckoutPageStructureValid() && this.getCurrentTotal(document) > 0;
  };

  Website.prototype.isAutoApplyEnabled = function () {
    if (this.settings) {
      return this.settings.autoApplyEnabled;
    }

    return false;
  };

  Website.prototype.isOnCheckoutPage = function (url) {
    if (!this.settings || !url) {
      return false;
    }

    var checkoutUrlRegex = this.settings.checkoutUrlRegex;

    if (checkoutUrlRegex === "") {
      return document.querySelector(this.settings.selectorCheckoutTotal) != null;
    }

    if (url.match(checkoutUrlRegex)) {
      return true;
    }

    return false;
  };

  Website.prototype.getCurrentTotal = function (checkoutPageHtml) {
    if (!this.settings) {
      return 0;
    }

    var checkoutAmount = 0;

    try {
      var checkoutAmountNode = checkoutPageHtml.querySelector(this.settings.selectorCheckoutTotal);
      var checkoutAmountText = checkoutAmountNode === null || checkoutAmountNode === void 0 ? void 0 : checkoutAmountNode.textContent; //let checkoutAmountText= $(checkoutPageHtml).find(this.settings.selectorCheckoutTotal).text();

      if (checkoutAmountText) {
        var matches = checkoutAmountText.match(/\$([0-9\.,]+)/i);

        if (matches) {
          var fixedAmountText = matches[1].replace(',', '');
          checkoutAmount = parseFloat((parseFloat(fixedAmountText) / this.settings.checkoutAmountBase).toFixed(2));
        }
      }
    } catch (e) {}

    return checkoutAmount;
  };

  Website.prototype.isCheckoutPageStructureValid = function () {
    if (this.getCodeInput() != null && this.getCheckoutTotalElement() != null) {
      if (this.settings.methodApplyCode === 'click') {
        return this.getApplyCodeButton() != null;
      } else {
        return this.getApplyCodeForm() != null;
      }
    }
  };

  Website.prototype.getCodeInput = function () {
    var input = document.querySelector(this.settings.selectorCode);

    if (input && input instanceof HTMLInputElement) {
      return input;
    }

    return null;
  };

  Website.prototype.getApplyCodeButton = function () {
    var button = document.querySelector(this.settings.selectorApplyCode);

    if (button) {
      return button;
    }

    return null;
  };

  Website.prototype.getApplyCodeForm = function () {
    var form = document.querySelector(this.settings.selectorSubmitCode);

    if (form && form instanceof HTMLFormElement) {
      return form;
    }

    return null;
  };

  Website.prototype.getCheckoutTotalElement = function () {
    return document.querySelector(this.settings.selectorCheckoutTotal);
  };

  Website.prototype.preApplyCode = function (code) {
    var e_2, _a;

    var input = this.getCodeInput();

    if (input) {
      input.value = code;

      try {
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(['input', 'change']), _c = _b.next(); !_c.done; _c = _b.next()) {
          var event_1 = _c.value;
          input.dispatchEvent(new Event(event_1, {
            bubbles: true
          }));
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
    }
    /*
        const $code= $(this.settings.selectorCode);
        $code[0].dispatchEvent(new Event('focus', {bubbles:true}));
        $code.val(code);
        for(const event of ['input', 'change']){
          $code[0].dispatchEvent(new Event(event, {bubbles:true}));
        }
        if(this.settings.scriptBeforeApplyCode!==""){
          //eval(this.settings.scriptBeforeApplyCode);
        }
    */

  };

  Website.prototype.postApplyCode = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var $remove;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            try {
              if (this.settings.selectorRemoveCode !== "") {
                $remove = document.querySelector(this.settings.selectorRemoveCode);

                if ($remove && $remove instanceof HTMLElement) {
                  $remove.click();
                }
              }
            } catch (e) {}

            return [4
            /*yield*/
            , _util_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].sleepMs(this.settings.waitAfterRemoveCode)];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Website.prototype.clickApplyButton = function () {
    var button = this.getApplyCodeButton();

    if (button) {
      if (button instanceof HTMLButtonElement || button instanceof HTMLInputElement) {
        if (button.disabled) {
          button.disabled = false;
        }
      }

      button.click();
    }
  };

  Website.prototype.applyUsingClick = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var currentTotal, e_3;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
              switch (_a.label) {
                case 0:
                  currentTotal = 0;
                  this.clickApplyButton();
                  return [4
                  /*yield*/
                  , _util_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].sleepMs(this.settings.waitBeforeCheckSuccess)];

                case 1:
                  _a.sent();

                  _a.label = 2;

                case 2:
                  _a.trys.push([2, 4,, 5]);

                  currentTotal = this.getCurrentTotal(document);
                  return [4
                  /*yield*/
                  , this.postApplyCode()];

                case 3:
                  _a.sent();

                  return [3
                  /*break*/
                  , 5];

                case 4:
                  e_3 = _a.sent();
                  console.log(e_3);
                  return [3
                  /*break*/
                  , 5];

                case 5:
                  resolve(currentTotal);
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        })];
      });
    });
  };

  Website.prototype.applyUsingForm = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var _this = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var currentTotal, form, formData, applyBtnName, applyBtnValue, response, checkoutPageHtml, parser, doc;

            var _a, _b;

            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
              switch (_c.label) {
                case 0:
                  currentTotal = 0;
                  form = this.getApplyCodeForm();
                  if (!form) return [3
                  /*break*/
                  , 5];
                  formData = _util_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].serializeArray(form);
                  applyBtnName = (_a = document.querySelector(this.settings.selectorApplyCode)) === null || _a === void 0 ? void 0 : _a.getAttribute('name');
                  applyBtnValue = (_b = document.querySelector(this.settings.selectorApplyCode)) === null || _b === void 0 ? void 0 : _b.getAttribute('value');

                  if (applyBtnName && applyBtnValue) {
                    formData.push({
                      name: applyBtnName,
                      value: applyBtnValue
                    });
                  }

                  return [4
                  /*yield*/
                  , fetch(form.action, {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.join('&')
                  })];

                case 1:
                  response = _c.sent();
                  if (!response.ok) return [3
                  /*break*/
                  , 4];
                  return [4
                  /*yield*/
                  , response.text()];

                case 2:
                  checkoutPageHtml = _c.sent();
                  parser = new DOMParser();
                  doc = parser.parseFromString(checkoutPageHtml, 'text/html');
                  currentTotal = this.getCurrentTotal(doc);
                  return [4
                  /*yield*/
                  , this.postApplyCode()];

                case 3:
                  _c.sent();

                  _c.label = 4;

                case 4:
                  resolve(currentTotal);
                  _c.label = 5;

                case 5:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        })];
      });
    });
  };

  Website.prototype.applyCode = function (code) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.preApplyCode(code);
            if (!(this.settings.methodApplyCode === "click")) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.applyUsingClick()];

          case 1:
            return [2
            /*return*/
            , _a.sent()];

          case 2:
            return [4
            /*yield*/
            , this.applyUsingForm()];

          case 3:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  };

  Website.prototype.applyCodeAsUser = function (code) {
    this.preApplyCode(code);

    if (this.settings.methodApplyCodeAsUser === "click") {
      this.clickApplyButton();
    } else {
      var $form = document.querySelector(this.settings.selectorSubmitCode);
      $form === null || $form === void 0 ? void 0 : $form.submit();
    }
  };

  return Website;
}();



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

/***/ "./src/model/Saving.ts":
/*!*****************************!*\
  !*** ./src/model/Saving.ts ***!
  \*****************************/
/*! exports provided: Saving */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Saving", function() { return Saving; });
var Saving =
/** @class */
function () {
  function Saving(storeId, couponId, total, discount) {
    this.storeId = storeId;
    this.couponId = couponId;
    this.total = total;
    this.discount = discount;
  }

  return Saving;
}();



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



/***/ }),

/***/ "./src/view/CouponView.ts":
/*!********************************!*\
  !*** ./src/view/CouponView.ts ***!
  \********************************/
/*! exports provided: CouponView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponView", function() { return CouponView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Utils */ "./src/util/Utils.ts");
/* harmony import */ var _HtmlView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HtmlView */ "./src/view/HtmlView.ts");




var CouponView =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CouponView, _super);

  function CouponView(parent, coupon) {
    var _this_1 = _super.call(this, "html/coupon.html") || this;

    _this_1.parent = parent;
    _this_1.coupon = coupon;

    _this_1.loaded.then(function () {
      _this_1.text('.cf-promocode', _this_1.coupon.code);

      if (_this_1.coupon.name && _this_1.coupon.name !== "") {
        _this_1.text('.cf-coupon-name', _this_1.coupon.name);
      }

      if ("lastApplyDate" in _this_1.coupon) {
        var timeSince = _util_Utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].getTimeSince(_this_1.coupon.lastApplyDate);

        if (timeSince) {
          _this_1.text('.cf-coupon-lastused', "Last used " + timeSince + " ago to save $" + _this_1.coupon.lastApplyDiscount.toFixed(2));

          _this_1.css('.cf-coupon-lastused', [{
            name: 'color',
            value: '#4CAF50'
          }]);
        }
      }

      _this_1.$html.addEventListener('click', function (evt) {
        _this_1.copyCouponToClipboard();
      });
    });

    return _this_1;
  }

  CouponView.prototype.copyCouponToClipboard = function () {
    this.copyToClipboard(this.coupon.code, this.$html);
    var copiedMessageSelector = '.copied';
    this.parent.hide(copiedMessageSelector);
    this.show(copiedMessageSelector);

    var _this = this;

    setTimeout(function () {
      _this.hide(copiedMessageSelector);
    }, 1500);
  };

  return CouponView;
}(_HtmlView__WEBPACK_IMPORTED_MODULE_2__["HtmlView"]);



/***/ }),

/***/ "./src/view/CouponsApplier.ts":
/*!************************************!*\
  !*** ./src/view/CouponsApplier.ts ***!
  \************************************/
/*! exports provided: CouponsApplierView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CouponsApplierView", function() { return CouponsApplierView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _model_Saving__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Saving */ "./src/model/Saving.ts");
/* harmony import */ var _util_Message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Message */ "./src/util/Message.ts");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Popup */ "./src/view/Popup.ts");
/* harmony import */ var _model_Client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/Client */ "./src/model/Client.ts");




 //import * as $ from 'jquery/dist/jquery.min';

var CouponsApplierView =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CouponsApplierView, _super);

  function CouponsApplierView(website, store) {
    var _this_1 = _super.call(this, "html/applycodes.html") || this;

    _this_1.originalTotal = 0;
    _this_1.previousTotal = 0;
    _this_1.totalApplied = 0;
    _this_1.preventCouponFormSubmit = false;
    _this_1.saving = null;
    _this_1.bestCoupon = null;
    _this_1.abortCodesApplication = false;
    _this_1.website = website;
    _this_1.store = store;

    _this_1.loaded.then(function () {
      _this_1.css('#cf-apply-modal-wrapper', [{
        name: 'display',
        value: 'block'
      }]);

      _this_1.originalTotal = website.getCurrentTotal(document);
      _this_1.previousTotal = _this_1.originalTotal;
    });

    return _this_1;
  } //quick access methods


  CouponsApplierView.prototype.getSetting = function (name) {
    return this.website.settings[name];
  };

  CouponsApplierView.prototype.getCoupons = function () {
    return this.store.coupons;
  };

  CouponsApplierView.prototype.getStoreId = function () {
    return this.store.id;
  };

  CouponsApplierView.prototype.getStoreName = function () {
    return this.store.name;
  };

  CouponsApplierView.prototype.applyCodes = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var $form, _a, _b, coupon, _c, success, currentTotal, e_1_1;

      var e_1, _d;

      var _this_1 = this;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_e) {
        switch (_e.label) {
          case 0:
            this.saving = null;

            if (this.getSetting('methodApplyCode') === "form") {
              this.preventCouponFormSubmit = true;
              $form = $(this.getSetting('selectorApplyCode')).closest('form');
              $form.on('submit', function (e) {
                if (_this_1.preventCouponFormSubmit) {
                  e.preventDefault();
                }
              });
            }

            _e.label = 1;

          case 1:
            _e.trys.push([1, 6, 7, 8]);

            _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.getCoupons()), _b = _a.next();
            _e.label = 2;

          case 2:
            if (!!_b.done) return [3
            /*break*/
            , 5];
            coupon = _b.value;

            if (this.abortCodesApplication) {
              return [2
              /*return*/
              ];
            }

            return [4
            /*yield*/
            , this.applyNextCode(Object.assign({}, coupon))];

          case 3:
            _c = _e.sent(), success = _c.success, currentTotal = _c.currentTotal;

            if (success) {
              this.recordCodeSuccess(coupon, currentTotal);
            }

            this.totalApplied++;
            this.previousTotal = currentTotal;
            _e.label = 4;

          case 4:
            _b = _a.next();
            return [3
            /*break*/
            , 2];

          case 5:
            return [3
            /*break*/
            , 8];

          case 6:
            e_1_1 = _e.sent();
            e_1 = {
              error: e_1_1
            };
            return [3
            /*break*/
            , 8];

          case 7:
            try {
              if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
            } finally {
              if (e_1) throw e_1.error;
            }

            return [7
            /*endfinally*/
            ];

          case 8:
            this.showVerificationResults();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  CouponsApplierView.prototype.refreshProgress = function () {
    this.text('#cf-applying-code-message', "Trying code " + (this.totalApplied + 1) + " of " + this.getCoupons().length);
    var width = Math.floor((this.totalApplied + 1) * 100 / this.getCoupons().length);
    this.css('#cf-apply-progress-status', [{
      name: 'width',
      value: width + "%"
    }]); //let elem = document.getElementById("cf-apply-progress-status");
    //elem.style.width = width + '%';
  };

  CouponsApplierView.prototype.checkCodeSuccess = function (currentTotal, originalTotal, previousTotal) {
    if (currentTotal < originalTotal) {
      if (currentTotal !== previousTotal) {
        return 1;
      } else if (this.getSetting('checkSuccessExpression') !== "") {
        var _this = this;

        return eval(this.getSetting('checkSuccessExpression'));
      }
    }

    return 0;
  };

  CouponsApplierView.prototype.recordCodeSuccess = function (coupon, currentTotal) {
    var discount = parseFloat((this.originalTotal - currentTotal).toFixed(2));
    var saving = new _model_Saving__WEBPACK_IMPORTED_MODULE_1__["Saving"](this.getStoreId(), coupon.id, currentTotal, discount);

    if (this.saving == null || currentTotal < this.saving.total) {
      this.saving = saving;
      this.bestCoupon = coupon;
    }

    chrome.runtime.sendMessage(new _util_Message__WEBPACK_IMPORTED_MODULE_2__["default"](_util_Message__WEBPACK_IMPORTED_MODULE_2__["default"].ID_CREATE_SAVING, {
      clientId: _model_Client__WEBPACK_IMPORTED_MODULE_4__["Client"].getId(),
      saving: saving
    }));
  };

  CouponsApplierView.prototype.applyNextCode = function (coupon) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var currentTotal, success;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.refreshProgress();
            return [4
            /*yield*/
            , this.website.applyCode(coupon.code)];

          case 1:
            currentTotal = _a.sent();
            success = this.checkCodeSuccess(currentTotal, this.originalTotal, this.previousTotal);
            return [2
            /*return*/
            , {
              success: success,
              currentTotal: currentTotal
            }];
        }
      });
    });
  };

  CouponsApplierView.prototype.open = function () {
    this.abortCodesApplication = false;

    _super.prototype.open.call(this);
  };

  CouponsApplierView.prototype.close = function () {
    this.preventCouponFormSubmit = false;
    this.abortCodesApplication = true;

    if (this.totalApplied === this.getCoupons().length) {
      if (this.saving != null && this.bestCoupon != null && this.website.settings.methodApplyCodeAsUser !== 'click') {
        this.website.applyCodeAsUser(this.bestCoupon.code);
      }
    }

    this.previousTotal = this.originalTotal;
    this.totalApplied = 0;
    this.saving = null;
    this.bestCoupon = null;

    _super.prototype.close.call(this);
  };

  CouponsApplierView.prototype.showVerificationResults = function () {
    var _a, _b; //this.$html.find('#cf-applyingCode-headline').hide();


    this.hide('#cf-applying-code-message');
    this.hide('#cf-apply-progress-wrapper');
    this.css('#cf-apply-modal-headline', [{
      name: "font-size",
      value: "30px"
    }, {
      name: 'font-weight',
      value: '700'
    }]);
    this.hide('#cf-apply-modal-headline');

    if (this.bestCoupon == null) {
      //$headline.text("Arghh!");
      //$headline.css("color","#6d8590");
      this.show('#cf-applycode-failed');
    } else {
      //$headline.text(this.bestCoupon.code);
      //$headline.css("color","#0d900d");
      var $successImg = this.find('#cf-apply-success-img');
      $successImg.src = "chrome-extension://" + chrome.runtime.id + "/images/apply-code-success.gif";
      this.show('#cf-apply-success-img');
      this.text('#cf-cart-code', "" + this.bestCoupon.code);
      this.text('#cf-cart-saving', "$" + ((_a = this.saving) === null || _a === void 0 ? void 0 : _a.discount.toFixed(2)));
      this.text('#cf-cart-before-code', "$" + this.originalTotal.toFixed(2));
      this.text('#cf-cart-after-code', "$" + ((_b = this.saving) === null || _b === void 0 ? void 0 : _b.total.toFixed(2)));
      this.show('#cf-applycode-success');

      if (this.website.settings.methodApplyCodeAsUser === 'click') {
        this.website.applyCodeAsUser(this.bestCoupon.code);
      } //this.reportSaving();

    }
  };

  return CouponsApplierView;
}(_Popup__WEBPACK_IMPORTED_MODULE_3__["Popup"]);



/***/ }),

/***/ "./src/view/HtmlView.ts":
/*!******************************!*\
  !*** ./src/view/HtmlView.ts ***!
  \******************************/
/*! exports provided: HtmlView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlView", function() { return HtmlView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");


var HtmlView =
/** @class */
function () {
  function HtmlView(url) {
    var _this = this;

    var template = document.createElement('template');
    template.innerHTML = "<div></div>";
    this.$html = template.content.firstChild;
    this.loaded = new Promise(function (resolve) {
      fetch(chrome.extension.getURL(url)).then(function (response) {
        //const parser = new DOMParser();
        response.text().then(function (html) {
          template.innerHTML = html;
          _this.$html = template.content.firstChild;
          resolve();
        });
      });
    });
  }

  HtmlView.prototype.text = function (selector, text) {
    var element = this.find(selector);

    if (element) {
      element.innerHTML = text;
    }
  };

  HtmlView.prototype.show = function (selector) {
    var element = this.find(selector);

    if (element) {
      element.style.display = 'block';
    }
  };

  HtmlView.prototype.hide = function (selector) {
    var element = this.find(selector);

    if (element) {
      element.style.display = 'none';
    }
  };

  HtmlView.prototype.append = function (selector, $html) {
    var element = this.find(selector);

    if (element) {
      element.appendChild($html);
    }
  };

  HtmlView.prototype.find = function (selector) {
    return this.$html.querySelector(selector);
  };

  HtmlView.prototype.css = function (selector, styles) {
    var e_1, _a;

    var element = this.find(selector);

    if (element) {
      try {
        for (var styles_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(styles), styles_1_1 = styles_1.next(); !styles_1_1.done; styles_1_1 = styles_1.next()) {
          var s = styles_1_1.value;
          element.style[s.name] = s.value;
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (styles_1_1 && !styles_1_1.done && (_a = styles_1["return"])) _a.call(styles_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
  }; //Must give a html element to attach to
  //in order to avoid scrolling-after-focus issue


  HtmlView.prototype.copyToClipboard = function (text, rootElement) {
    var activeElement = document.body;

    if (document.activeElement) {
      activeElement = document.activeElement;
    }

    var template = document.createElement('template');
    template.innerHTML = '<input type="text" name="tempCopyBuffer"/>';
    var copyBuffer = template.content.firstChild;
    rootElement.append(copyBuffer);
    copyBuffer.value = text;
    copyBuffer.focus();
    copyBuffer.select();
    document.execCommand('copy');
    activeElement.focus();
    copyBuffer.remove();
  };

  return HtmlView;
}();



/***/ }),

/***/ "./src/view/NoCoupons.ts":
/*!*******************************!*\
  !*** ./src/view/NoCoupons.ts ***!
  \*******************************/
/*! exports provided: NoCouponsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoCouponsView", function() { return NoCouponsView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _NoOffers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NoOffers */ "./src/view/NoOffers.ts");



var NoCouponsView =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NoCouponsView, _super);

  function NoCouponsView() {
    return _super.call(this, "Sorry, we have no active coupons for this site right now") || this;
  }

  return NoCouponsView;
}(_NoOffers__WEBPACK_IMPORTED_MODULE_1__["NoOffersView"]);



/***/ }),

/***/ "./src/view/NoOffers.ts":
/*!******************************!*\
  !*** ./src/view/NoOffers.ts ***!
  \******************************/
/*! exports provided: NoOffersView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoOffersView", function() { return NoOffersView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Popup */ "./src/view/Popup.ts");



var NoOffersView =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NoOffersView, _super);

  function NoOffersView(message) {
    var _this = _super.call(this, "html/nooffers.html") || this;

    _this.loaded.then(function () {
      _this.text('#cf-no-offers-message', message);
    });

    return _this;
  }

  return NoOffersView;
}(_Popup__WEBPACK_IMPORTED_MODULE_1__["Popup"]);



/***/ }),

/***/ "./src/view/NoStore.ts":
/*!*****************************!*\
  !*** ./src/view/NoStore.ts ***!
  \*****************************/
/*! exports provided: NoStoreView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoStoreView", function() { return NoStoreView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _NoOffers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NoOffers */ "./src/view/NoOffers.ts");



var NoStoreView =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NoStoreView, _super);

  function NoStoreView() {
    return _super.call(this, "Sorry, this site is not supported") || this;
  }

  return NoStoreView;
}(_NoOffers__WEBPACK_IMPORTED_MODULE_1__["NoOffersView"]);



/***/ }),

/***/ "./src/view/Popup.ts":
/*!***************************!*\
  !*** ./src/view/Popup.ts ***!
  \***************************/
/*! exports provided: Popup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return Popup; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _HtmlView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HtmlView */ "./src/view/HtmlView.ts");

 //import * as $ from 'jquery/dist/jquery.min';

var Popup =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Popup, _super);

  function Popup(url) {
    var _this = _super.call(this, url) || this;

    _this.isOpen = false;
    _this.ready = new Promise(function (resolve) {
      _this.loaded.then(function () {
        _this.cfRoot = document.createElement('div');

        var shadowRoot = _this.cfRoot.attachShadow({
          mode: 'open'
        });

        fetch(chrome.extension.getURL("css/app.css"), {
          method: 'GET'
        }).then(function (resp) {
          return resp.text();
        }).then(function (css) {
          var _a;

          shadowRoot.innerHTML += "<style>" + css + "</style>";
          shadowRoot.appendChild(_this.$html);

          _this.cfRoot.setAttribute('id', 'crContainer');

          _this.cfRoot.setAttribute('style', 'all:initial');

          (_a = _this.find('#cf-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            _this.close();
          }); //$(this.cfRoot).append($('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL("app.css") + '" >'));
          //      $('<link rel="stylesheet" type="text/css" href="' + chrome.extension.getURL("app.css") + '" >').appendTo("head");
          // @ts-ignore

          var logo = _this.find('#cf-logo-img');

          logo.src = chrome.runtime.getURL("images/cflogo.png");

          _this.open();

          resolve();
        });
      });
    });
    return _this;
  }

  Popup.prototype.open = function () {
    document.body.append(this.cfRoot);
    this.isOpen = true;
  };

  Popup.prototype.close = function () {
    this.cfRoot.remove();
    this.isOpen = false;
  };

  Popup.prototype.toggle = function () {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  return Popup;
}(_HtmlView__WEBPACK_IMPORTED_MODULE_1__["HtmlView"]);



/***/ }),

/***/ "./src/view/StoreView.ts":
/*!*******************************!*\
  !*** ./src/view/StoreView.ts ***!
  \*******************************/
/*! exports provided: StoreView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreView", function() { return StoreView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_Message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Message */ "./src/util/Message.ts");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Popup */ "./src/view/Popup.ts");
/* harmony import */ var _CouponView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CouponView */ "./src/view/CouponView.ts");
/* harmony import */ var _model_Client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/Client */ "./src/model/Client.ts");
/* harmony import */ var _CouponsApplier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CouponsApplier */ "./src/view/CouponsApplier.ts");







var StoreView =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(StoreView, _super);

  function StoreView(store, website, hideCoupons) {
    if (hideCoupons === void 0) {
      hideCoupons = false;
    }

    var _this = _super.call(this, "html/coupons.html") || this;

    _this.store = store;
    _this.website = website;

    _this.ready.then(function () {
      var e_1, _a;

      _this.text('#couponsTotal', "" + _this.store.coupons.length);

      _this.text('#storeName', _this.store.name);

      var _loop_1 = function _loop_1(coupon) {
        var couponView = new _CouponView__WEBPACK_IMPORTED_MODULE_3__["CouponView"](_this, coupon);
        couponView.loaded.then(function () {
          _this.append('.cf-coupons', couponView.$html);
        });
      };

      try {
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.store.coupons), _c = _b.next(); !_c.done; _c = _b.next()) {
          var coupon = _c.value;

          _loop_1(coupon);
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

      if (_this.website.shouldShowAutoApply()) {
        _this.show('#applyCodesDiv');

        _this.find('#cf-coupons-apply-button').addEventListener('click', function () {
          _this.close();

          var couponsApplier = new _CouponsApplier__WEBPACK_IMPORTED_MODULE_5__["CouponsApplierView"](_this.website, _this.store);
          couponsApplier.loaded.then(function () {
            couponsApplier.applyCodes();
          });
          chrome.runtime.sendMessage(new _util_Message__WEBPACK_IMPORTED_MODULE_1__["default"](_util_Message__WEBPACK_IMPORTED_MODULE_1__["default"].ID_OPEN_AFFILIATE_TAB, {
            clientId: _model_Client__WEBPACK_IMPORTED_MODULE_4__["Client"].getId(),
            storeId: _this.store.id
          }));
        });

        _this.find('#cf-coupons-apply-show-coupons').addEventListener('click', function () {
          _this.show('.cf-coupons');

          _this.hide('#cf-coupons-apply-show-coupons');
        });
      } else {
        _this.hide('#applyCodesDiv');
      }

      if (!hideCoupons) {
        _this.show('.cf-coupons');

        _this.hide('#cf-coupons-apply-show-coupons');
      } else {
        _this.show('#cf-coupons-apply-show-coupons');

        _this.hide('.cf-coupons');

        _this.css('#cf-content', [{
          name: 'height',
          value: 'auto'
        }]);
      }
    });

    return _this;
  }

  return StoreView;
}(_Popup__WEBPACK_IMPORTED_MODULE_2__["Popup"]);



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25hbm9pZC9pbmRleC5icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uYW5vaWQvdXJsLWFscGhhYmV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvQ29udGVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9XZWJzaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbC9DbGllbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL1NhdmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZS9Mb2NhbFN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9Db3Vwb25WaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0NvdXBvbnNBcHBsaWVyLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L0h0bWxWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L05vQ291cG9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9Ob09mZmVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy9Ob1N0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L1BvcHVwLnRzIiwid2VicGFjazovLy8uL3NyYy92aWV3L1N0b3JlVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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dGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb3JlL0NvbnRlbnQudHNcIik7XG4iLCIvLyBUaGlzIGZpbGUgcmVwbGFjZXMgYGluZGV4LmpzYCBpbiBidW5kbGVycyBsaWtlIHdlYnBhY2sgb3IgUm9sbHVwLFxuLy8gYWNjb3JkaW5nIHRvIGBicm93c2VyYCBjb25maWcgaW4gYHBhY2thZ2UuanNvbmAuXG5cbmltcG9ydCB7IHVybEFscGhhYmV0IH0gZnJvbSAnLi91cmwtYWxwaGFiZXQvaW5kZXguanMnXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8vIEFsbCBidW5kbGVycyB3aWxsIHJlbW92ZSB0aGlzIGJsb2NrIGluIHRoZSBwcm9kdWN0aW9uIGJ1bmRsZS5cbiAgaWYgKFxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgJiZcbiAgICB0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJ1xuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnUmVhY3QgTmF0aXZlIGRvZXMgbm90IGhhdmUgYSBidWlsdC1pbiBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzIHVzZSBgbmFub2lkL25vbi1zZWN1cmVgLiAnICtcbiAgICAgICAgJ0ZvciBzZWN1cmUgSURzLCBpbXBvcnQgYHJlYWN0LW5hdGl2ZS1nZXQtcmFuZG9tLXZhbHVlc2AgJyArXG4gICAgICAgICdiZWZvcmUgTmFubyBJRC4gSWYgeW91IHVzZSBFeHBvLCBpbnN0YWxsIGBleHBvLXJhbmRvbWAgJyArXG4gICAgICAgICdhbmQgdXNlIGBuYW5vaWQvYXN5bmNgLidcbiAgICApXG4gIH1cbiAgaWYgKHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQWRkIGBpZiAoIXdpbmRvdy5jcnlwdG8pIHdpbmRvdy5jcnlwdG8gPSB3aW5kb3cubXNDcnlwdG9gICcgK1xuICAgICAgICAnYmVmb3JlIE5hbm8gSUQgdG8gZml4IElFIDExIHN1cHBvcnQnXG4gICAgKVxuICB9XG4gIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgaGF2ZSBzZWN1cmUgcmFuZG9tIGdlbmVyYXRvci4gJyArXG4gICAgICAgICdJZiB5b3UgZG9u4oCZdCBuZWVkIHVucHJlZGljdGFibGUgSURzLCB5b3UgY2FuIHVzZSBuYW5vaWQvbm9uLXNlY3VyZS4nXG4gICAgKVxuICB9XG59XG5cbmxldCByYW5kb20gPSBieXRlcyA9PiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcblxubGV0IGN1c3RvbVJhbmRvbSA9IChhbHBoYWJldCwgc2l6ZSwgZ2V0UmFuZG9tKSA9PiB7XG4gIC8vIEZpcnN0LCBhIGJpdG1hc2sgaXMgbmVjZXNzYXJ5IHRvIGdlbmVyYXRlIHRoZSBJRC4gVGhlIGJpdG1hc2sgbWFrZXMgYnl0ZXNcbiAgLy8gdmFsdWVzIGNsb3NlciB0byB0aGUgYWxwaGFiZXQgc2l6ZS4gVGhlIGJpdG1hc2sgY2FsY3VsYXRlcyB0aGUgY2xvc2VzdFxuICAvLyBgMl4zMSAtIDFgIG51bWJlciwgd2hpY2ggZXhjZWVkcyB0aGUgYWxwaGFiZXQgc2l6ZS5cbiAgLy8gRm9yIGV4YW1wbGUsIHRoZSBiaXRtYXNrIGZvciB0aGUgYWxwaGFiZXQgc2l6ZSAzMCBpcyAzMSAoMDAwMTExMTEpLlxuICAvLyBgTWF0aC5jbHozMmAgaXMgbm90IHVzZWQsIGJlY2F1c2UgaXQgaXMgbm90IGF2YWlsYWJsZSBpbiBicm93c2Vycy5cbiAgbGV0IG1hc2sgPSAoMiA8PCAoTWF0aC5sb2coYWxwaGFiZXQubGVuZ3RoIC0gMSkgLyBNYXRoLkxOMikpIC0gMVxuICAvLyBUaG91Z2gsIHRoZSBiaXRtYXNrIHNvbHV0aW9uIGlzIG5vdCBwZXJmZWN0IHNpbmNlIHRoZSBieXRlcyBleGNlZWRpbmdcbiAgLy8gdGhlIGFscGhhYmV0IHNpemUgYXJlIHJlZnVzZWQuIFRoZXJlZm9yZSwgdG8gcmVsaWFibHkgZ2VuZXJhdGUgdGhlIElELFxuICAvLyB0aGUgcmFuZG9tIGJ5dGVzIHJlZHVuZGFuY3kgaGFzIHRvIGJlIHNhdGlzZmllZC5cblxuICAvLyBOb3RlOiBldmVyeSBoYXJkd2FyZSByYW5kb20gZ2VuZXJhdG9yIGNhbGwgaXMgcGVyZm9ybWFuY2UgZXhwZW5zaXZlLFxuICAvLyBiZWNhdXNlIHRoZSBzeXN0ZW0gY2FsbCBmb3IgZW50cm9weSBjb2xsZWN0aW9uIHRha2VzIGEgbG90IG9mIHRpbWUuXG4gIC8vIFNvLCB0byBhdm9pZCBhZGRpdGlvbmFsIHN5c3RlbSBjYWxscywgZXh0cmEgYnl0ZXMgYXJlIHJlcXVlc3RlZCBpbiBhZHZhbmNlLlxuXG4gIC8vIE5leHQsIGEgc3RlcCBkZXRlcm1pbmVzIGhvdyBtYW55IHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cbiAgLy8gVGhlIG51bWJlciBvZiByYW5kb20gYnl0ZXMgZ2V0cyBkZWNpZGVkIHVwb24gdGhlIElEIHNpemUsIG1hc2ssXG4gIC8vIGFscGhhYmV0IHNpemUsIGFuZCBtYWdpYyBudW1iZXIgMS42ICh1c2luZyAxLjYgcGVha3MgYXQgcGVyZm9ybWFuY2VcbiAgLy8gYWNjb3JkaW5nIHRvIGJlbmNobWFya3MpLlxuXG4gIC8vIGAtfmYgPT4gTWF0aC5jZWlsKGYpYCBpZiBmIGlzIGEgZmxvYXRcbiAgLy8gYC1+aSA9PiBpICsgMWAgaWYgaSBpcyBhbiBpbnRlZ2VyXG4gIGxldCBzdGVwID0gLX4oKDEuNiAqIG1hc2sgKiBzaXplKSAvIGFscGhhYmV0Lmxlbmd0aClcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGxldCBpZCA9ICcnXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxldCBieXRlcyA9IGdldFJhbmRvbShzdGVwKVxuICAgICAgLy8gQSBjb21wYWN0IGFsdGVybmF0aXZlIGZvciBgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwOyBpKyspYC5cbiAgICAgIGxldCBqID0gc3RlcFxuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAvLyBBZGRpbmcgYHx8ICcnYCByZWZ1c2VzIGEgcmFuZG9tIGJ5dGUgdGhhdCBleGNlZWRzIHRoZSBhbHBoYWJldCBzaXplLlxuICAgICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tqXSAmIG1hc2tdIHx8ICcnXG4gICAgICAgIC8vIGBpZC5sZW5ndGggKyAxID09PSBzaXplYCBpcyBhIG1vcmUgY29tcGFjdCBvcHRpb24uXG4gICAgICAgIGlmIChpZC5sZW5ndGggPT09ICtzaXplKSByZXR1cm4gaWRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubGV0IGN1c3RvbUFscGhhYmV0ID0gKGFscGhhYmV0LCBzaXplKSA9PiBjdXN0b21SYW5kb20oYWxwaGFiZXQsIHNpemUsIHJhbmRvbSlcblxubGV0IG5hbm9pZCA9IChzaXplID0gMjEpID0+IHtcbiAgbGV0IGlkID0gJydcbiAgbGV0IGJ5dGVzID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSlcblxuICAvLyBBIGNvbXBhY3QgYWx0ZXJuYXRpdmUgZm9yIGBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKylgLlxuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgLy8gSXQgaXMgaW5jb3JyZWN0IHRvIHVzZSBieXRlcyBleGNlZWRpbmcgdGhlIGFscGhhYmV0IHNpemUuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBtYXNrIHJlZHVjZXMgdGhlIHJhbmRvbSBieXRlIGluIHRoZSAwLTI1NSB2YWx1ZVxuICAgIC8vIHJhbmdlIHRvIHRoZSAwLTYzIHZhbHVlIHJhbmdlLiBUaGVyZWZvcmUsIGFkZGluZyBoYWNrcywgc3VjaFxuICAgIC8vIGFzIGVtcHR5IHN0cmluZyBmYWxsYmFjayBvciBtYWdpYyBudW1iZXJzLCBpcyB1bm5lY2Nlc3NhcnkgYmVjYXVzZVxuICAgIC8vIHRoZSBiaXRtYXNrIHRyaW1zIGJ5dGVzIGRvd24gdG8gdGhlIGFscGhhYmV0IHNpemUuXG4gICAgbGV0IGJ5dGUgPSBieXRlc1tzaXplXSAmIDYzXG4gICAgaWYgKGJ5dGUgPCAzNikge1xuICAgICAgLy8gYDAtOWEtemBcbiAgICAgIGlkICs9IGJ5dGUudG9TdHJpbmcoMzYpXG4gICAgfSBlbHNlIGlmIChieXRlIDwgNjIpIHtcbiAgICAgIC8vIGBBLVpgXG4gICAgICBpZCArPSAoYnl0ZSAtIDI2KS50b1N0cmluZygzNikudG9VcHBlckNhc2UoKVxuICAgIH0gZWxzZSBpZiAoYnl0ZSA8IDYzKSB7XG4gICAgICBpZCArPSAnXydcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgKz0gJy0nXG4gICAgfVxuICB9XG4gIHJldHVybiBpZFxufVxuXG5leHBvcnQgeyBuYW5vaWQsIGN1c3RvbUFscGhhYmV0LCBjdXN0b21SYW5kb20sIHVybEFscGhhYmV0LCByYW5kb20gfVxuIiwiLy8gVGhpcyBhbHBoYWJldCB1c2VzIGBBLVphLXowLTlfLWAgc3ltYm9scy4gVGhlIGdlbmV0aWMgYWxnb3JpdGhtIGhlbHBlZFxuLy8gb3B0aW1pemUgdGhlIGd6aXAgY29tcHJlc3Npb24gZm9yIHRoaXMgYWxwaGFiZXQuXG5sZXQgdXJsQWxwaGFiZXQgPVxuICAnTW9kdWxlU3ltYmhhc093blByLTAxMjM0NTY3ODlBQkNERUZHSE5SVmZnY3RpVXZ6X0txWVRKa0x4cFpYSWpRVydcblxuZXhwb3J0IHsgdXJsQWxwaGFiZXQgfVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCBNZXNzYWdlIGZyb20gXCIuLi91dGlsL01lc3NhZ2VcIjtcclxuaW1wb3J0IHtTdG9yZX0gZnJvbSBcIi4uL21vZGVsL1N0b3JlXCI7XHJcbmltcG9ydCB7UG9wdXB9IGZyb20gXCIuLi92aWV3L1BvcHVwXCI7XHJcbmltcG9ydCB7U3RvcmVWaWV3fSBmcm9tIFwiLi4vdmlldy9TdG9yZVZpZXdcIjtcclxuaW1wb3J0IHtOb0NvdXBvbnNWaWV3fSBmcm9tIFwiLi4vdmlldy9Ob0NvdXBvbnNcIjtcclxuaW1wb3J0IHtOb1N0b3JlVmlld30gZnJvbSBcIi4uL3ZpZXcvTm9TdG9yZVwiO1xyXG5pbXBvcnQge1dlYnNpdGV9IGZyb20gXCIuL1dlYnNpdGVcIjtcclxuaW1wb3J0IHtDbGllbnR9IGZyb20gXCIuLi9tb2RlbC9DbGllbnRcIjtcclxuaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcclxuXHJcbnZhciBjdXJyZW50VmlldzogUG9wdXB8bnVsbD0gbnVsbDtcclxuQ2xpZW50LmluaXRpYWxpemUoKTtcclxuXHJcbmZ1bmN0aW9uIGlzU3VwcG9ydGVkTWVzc2FnZShpZDogc3RyaW5nKXtcclxuICByZXR1cm4gaWQ9PT1NZXNzYWdlLklEX0JST1dTRURfU1VQUE9SVEVEX1NUT1JFfHxpZD09PU1lc3NhZ2UuSURfQ0xJQ0tFRF9FWFRFTlNJT05fSUNPTjtcclxufVxyXG5cclxuLy8gTGlzdGVuIHRvIG1lc3NhZ2VzIGZyb20gYmFja2dyb3VuZFxyXG4vLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2FwcHMvbWVzc2FnaW5nXHJcbi8vIG1lc3NhZ2UuYWN0aW9uIGRldGVybWluZXMgdGhlIGFjdGlvbiB0byBiZSBkb25lXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihhc3luYyAobWVzc2FnZTogTWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICBpZighaXNTdXBwb3J0ZWRNZXNzYWdlKG1lc3NhZ2UuaWQpKXtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgbGV0IHN0b3JlPSBtZXNzYWdlLmRhdGEgYXMgU3RvcmU7XHJcbiAgbGV0IHdlYnNpdGU9IG5ldyBXZWJzaXRlKHN0b3JlPy5leHRlbnNpb25TZXR0aW5ncyk7XHJcbiAgc3dpdGNoKG1lc3NhZ2UuaWQpe1xyXG4gICAgY2FzZSBNZXNzYWdlLklEX0NMSUNLRURfRVhURU5TSU9OX0lDT046XHJcbiAgICAgIGlmKGN1cnJlbnRWaWV3KXtcclxuICAgICAgICBjdXJyZW50Vmlldy50b2dnbGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBpZihzdG9yZSl7XHJcbiAgICAgICAgaWYoc3RvcmUuY291cG9ucy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICBjdXJyZW50Vmlldz0gbmV3IFN0b3JlVmlldyhzdG9yZSwgd2Vic2l0ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBjdXJyZW50Vmlldz0gbmV3IE5vQ291cG9uc1ZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGN1cnJlbnRWaWV3PSBuZXcgTm9TdG9yZVZpZXcoKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgTWVzc2FnZS5JRF9CUk9XU0VEX1NVUFBPUlRFRF9TVE9SRTpcclxuICAgICAgYXdhaXQgVXRpbHMuc2xlZXAoMik7XHJcbiAgICAgIGlmKHN0b3JlLmNvdXBvbnMubGVuZ3RoPjAgJiYgd2Vic2l0ZS5zaG91bGRTaG93QXV0b0FwcGx5KCkpe1xyXG4gICAgICAgIGlmKGN1cnJlbnRWaWV3KXtcclxuICAgICAgICAgIGN1cnJlbnRWaWV3LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnRWaWV3PSBuZXcgU3RvcmVWaWV3KHN0b3JlLCB3ZWJzaXRlLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn0pO1xyXG5cclxuIiwiaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4uL3V0aWwvVXRpbHNcIjtcbi8vaW1wb3J0ICogYXMgJCBmcm9tICdqcXVlcnkvZGlzdC9qcXVlcnkubWluJztcbi8vTk9URTogZm9yIGZpcmVmb3gsIG5lZWQgdG8gY2xvbmUgZGlzcGF0Y2hlZCBldmVudHMgb3RoZXJ3aXNlIGphdmFzY3JpcHQgbGlzdGVuZXJzXG4vL29uIHRoZSBob3N0IHBhZ2UgY2Fubm90IGFjY2VzcyBpdCAocGVybWlzc2lvbiBkZW5pZWQgYWNjZXNzaW5nIGV2ZW50LnRhcmdldClcbi8vaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Nb3ppbGxhL1RlY2gvWFBDT00vTGFuZ3VhZ2VfQmluZGluZ3MvQ29tcG9uZW50cy51dGlscy5jbG9uZUludG9cblxuZXhwb3J0IGNsYXNzIFdlYnNpdGVTZXR0aW5nc3tcbiAgcHVibGljIGF1dG9BcHBseUVuYWJsZWQ6IG51bWJlcj0gMDtcbiAgcHVibGljIHNlbGVjdG9yQ29kZTogc3RyaW5nPSBcIlwiO1xuICBwdWJsaWMgc2VsZWN0b3JBcHBseUNvZGU6IHN0cmluZz0gXCJcIjtcbiAgcHVibGljIHNlbGVjdG9yU3VibWl0Q29kZTogc3RyaW5nPSBcIlwiO1xuICBwdWJsaWMgc2VsZWN0b3JSZW1vdmVDb2RlOiBzdHJpbmc9IFwiXCI7XG4gIHB1YmxpYyBzZWxlY3RvckNoZWNrb3V0VG90YWw6IHN0cmluZz0gXCJcIjtcbiAgcHVibGljIG1ldGhvZEFwcGx5Q29kZTogc3RyaW5nPSBcImNsaWNrXCI7XG4gIHB1YmxpYyBtZXRob2RBcHBseUNvZGVBc1VzZXI6IHN0cmluZz0gXCJjbGlja1wiO1xuICBwdWJsaWMgY2hlY2tvdXRBbW91bnRCYXNlOiBudW1iZXI9IDE7XG4gIHB1YmxpYyB3YWl0QmVmb3JlQ2hlY2tTdWNjZXNzOiBudW1iZXI9IDIwMDA7XG4gIHB1YmxpYyB3YWl0QmVmb3JlQXBwbHlOZXh0OiBudW1iZXI9IDEwMDA7XG4gIHB1YmxpYyB3YWl0QWZ0ZXJSZW1vdmVDb2RlOiBudW1iZXI9IDEwMDA7XG4gIHB1YmxpYyBjaGVja1N1Y2Nlc3NFeHByZXNzaW9uOiBzdHJpbmc9IFwiXCI7XG4gIHB1YmxpYyBjaGVja291dFVybFJlZ2V4OiBzdHJpbmc9IFwiXCI7XG4gIHB1YmxpYyBzY3JpcHRCZWZvcmVBcHBseUNvZGU6IHN0cmluZz0gXCJcIjtcblxuICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuICAgIGlmKHNldHRpbmdzKXtcbiAgICAgIGZvcihjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcykpe1xuICAgICAgICBpZihzZXR0aW5nc1trZXldIT09dW5kZWZpbmVkKXtcbiAgICAgICAgICB0aGlzW2tleV09IHNldHRpbmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBXZWJzaXRlIHtcbiAgcHVibGljIHNldHRpbmdzOiBXZWJzaXRlU2V0dGluZ3M7XG4gIGNvbnN0cnVjdG9yKGV4dGVuc2lvblNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5ncz0gbmV3IFdlYnNpdGVTZXR0aW5ncyhleHRlbnNpb25TZXR0aW5ncyk7XG4gIH1cbiAgc2hvdWxkU2hvd0F1dG9BcHBseSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1xuICAgICAgJiYgdGhpcy5pc0F1dG9BcHBseUVuYWJsZWQoKVxuICAgICAgJiYgdGhpcy5pc09uQ2hlY2tvdXRQYWdlKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpXG4gICAgICAmJiB0aGlzLmlzQ2hlY2tvdXRQYWdlU3RydWN0dXJlVmFsaWQoKVxuICAgICAgJiYgdGhpcy5nZXRDdXJyZW50VG90YWwoZG9jdW1lbnQpID4gMDtcbiAgfVxuICBpc0F1dG9BcHBseUVuYWJsZWQoKSB7XG4gICAgaWYodGhpcy5zZXR0aW5ncyl7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5hdXRvQXBwbHlFbmFibGVkO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNPbkNoZWNrb3V0UGFnZSh1cmw6IHN0cmluZykgOiBib29sZWFue1xuICAgIGlmKCF0aGlzLnNldHRpbmdzIHx8ICF1cmwpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjaGVja291dFVybFJlZ2V4PSB0aGlzLnNldHRpbmdzLmNoZWNrb3V0VXJsUmVnZXg7XG4gICAgaWYoY2hlY2tvdXRVcmxSZWdleD09PVwiXCIpe1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5zZWxlY3RvckNoZWNrb3V0VG90YWwpIT1udWxsO1xuICAgIH1cbiAgICBpZiAodXJsLm1hdGNoKGNoZWNrb3V0VXJsUmVnZXgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGdldEN1cnJlbnRUb3RhbChjaGVja291dFBhZ2VIdG1sOiBEb2N1bWVudCkgOiBudW1iZXIge1xuICAgIGlmKCF0aGlzLnNldHRpbmdzKXtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBsZXQgY2hlY2tvdXRBbW91bnQ6IG51bWJlcj0gMDtcbiAgICB0cnl7XG4gICAgICBsZXQgY2hlY2tvdXRBbW91bnROb2RlPSBjaGVja291dFBhZ2VIdG1sLnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5zZWxlY3RvckNoZWNrb3V0VG90YWwpO1xuICAgICAgbGV0IGNoZWNrb3V0QW1vdW50VGV4dD0gY2hlY2tvdXRBbW91bnROb2RlPy50ZXh0Q29udGVudDtcbiAgICAgIC8vbGV0IGNoZWNrb3V0QW1vdW50VGV4dD0gJChjaGVja291dFBhZ2VIdG1sKS5maW5kKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JDaGVja291dFRvdGFsKS50ZXh0KCk7XG4gICAgICBpZihjaGVja291dEFtb3VudFRleHQpe1xuICAgICAgICBsZXQgbWF0Y2hlcyA9IGNoZWNrb3V0QW1vdW50VGV4dC5tYXRjaCgvXFwkKFswLTlcXC4sXSspL2kpO1xuICAgICAgICBpZihtYXRjaGVzKXtcbiAgICAgICAgICBsZXQgZml4ZWRBbW91bnRUZXh0PSBtYXRjaGVzWzFdLnJlcGxhY2UoJywnLCAnJyk7XG4gICAgICAgICAgY2hlY2tvdXRBbW91bnQ9IHBhcnNlRmxvYXQoKHBhcnNlRmxvYXQoZml4ZWRBbW91bnRUZXh0KS90aGlzLnNldHRpbmdzLmNoZWNrb3V0QW1vdW50QmFzZSkudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9Y2F0Y2ggKGUpIHtcbiAgICB9XG4gICAgcmV0dXJuIGNoZWNrb3V0QW1vdW50O1xuICB9XG4gIGlzQ2hlY2tvdXRQYWdlU3RydWN0dXJlVmFsaWQoKXtcbiAgICBpZih0aGlzLmdldENvZGVJbnB1dCgpIT1udWxsICYmIHRoaXMuZ2V0Q2hlY2tvdXRUb3RhbEVsZW1lbnQoKSE9bnVsbCl7XG4gICAgICBpZih0aGlzLnNldHRpbmdzLm1ldGhvZEFwcGx5Q29kZT09PSdjbGljaycpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcHBseUNvZGVCdXR0b24oKSE9bnVsbDtcbiAgICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBcHBseUNvZGVGb3JtKCkhPW51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldENvZGVJbnB1dCgpOiBIVE1MSW5wdXRFbGVtZW50fG51bGwge1xuICAgIGNvbnN0IGlucHV0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JDb2RlKSBhcyBIVE1MRWxlbWVudHxudWxsO1xuICAgIGlmKGlucHV0ICYmIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCl7XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGdldEFwcGx5Q29kZUJ1dHRvbigpOiBIVE1MRWxlbWVudHxudWxse1xuICAgIGNvbnN0IGJ1dHRvbj0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLnNlbGVjdG9yQXBwbHlDb2RlKSBhcyBIVE1MRWxlbWVudHxudWxsO1xuICAgIGlmKGJ1dHRvbil7XG4gICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBnZXRBcHBseUNvZGVGb3JtKCk6IEhUTUxGb3JtRWxlbWVudHxudWxse1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JTdWJtaXRDb2RlKSBhcyBIVE1MRWxlbWVudHxudWxsO1xuICAgIGlmKGZvcm0gJiYgZm9ybSBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCl7XG4gICAgICByZXR1cm4gZm9ybSBhcyBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGdldENoZWNrb3V0VG90YWxFbGVtZW50KCk6IEhUTUxFbGVtZW50fG51bGx7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5zZWxlY3RvckNoZWNrb3V0VG90YWwpO1xuICB9XG4gIHByZUFwcGx5Q29kZShjb2RlKSB7XG4gICAgY29uc3QgaW5wdXQ9IHRoaXMuZ2V0Q29kZUlucHV0KCk7XG4gICAgaWYoaW5wdXQpe1xuICAgICAgaW5wdXQudmFsdWU9Y29kZTtcbiAgICAgIGZvcihjb25zdCBldmVudCBvZiBbJ2lucHV0JywgJ2NoYW5nZSddKXtcbiAgICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZXZlbnQsIHtidWJibGVzOnRydWV9KSk7XG4gICAgICB9XG5cbiAgICB9XG4vKlxuICAgIGNvbnN0ICRjb2RlPSAkKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JDb2RlKTtcbiAgICAkY29kZVswXS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZm9jdXMnLCB7YnViYmxlczp0cnVlfSkpO1xuICAgICRjb2RlLnZhbChjb2RlKTtcbiAgICBmb3IoY29uc3QgZXZlbnQgb2YgWydpbnB1dCcsICdjaGFuZ2UnXSl7XG4gICAgICAkY29kZVswXS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChldmVudCwge2J1YmJsZXM6dHJ1ZX0pKTtcbiAgICB9XG4gICAgaWYodGhpcy5zZXR0aW5ncy5zY3JpcHRCZWZvcmVBcHBseUNvZGUhPT1cIlwiKXtcbiAgICAgIC8vZXZhbCh0aGlzLnNldHRpbmdzLnNjcmlwdEJlZm9yZUFwcGx5Q29kZSk7XG4gICAgfVxuKi9cbiAgfVxuICBhc3luYyBwb3N0QXBwbHlDb2RlKCkge1xuICAgIHRyeXtcbiAgICAgIGlmKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JSZW1vdmVDb2RlIT09XCJcIil7XG4gICAgICAgIGNvbnN0ICRyZW1vdmU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5zZWxlY3RvclJlbW92ZUNvZGUpO1xuICAgICAgICBpZigkcmVtb3ZlICYmICRyZW1vdmUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XG4gICAgICAgICAgJHJlbW92ZS5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfWNhdGNoIChlKSB7XG4gICAgfVxuICAgIGF3YWl0IFV0aWxzLnNsZWVwTXModGhpcy5zZXR0aW5ncy53YWl0QWZ0ZXJSZW1vdmVDb2RlKTtcbiAgfVxuICBjbGlja0FwcGx5QnV0dG9uKCkge1xuICAgIGNvbnN0IGJ1dHRvbj0gdGhpcy5nZXRBcHBseUNvZGVCdXR0b24oKTtcbiAgICBpZihidXR0b24pe1xuICAgICAgaWYoYnV0dG9uIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQgfHwgYnV0dG9uIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCl7XG4gICAgICAgIGlmKGJ1dHRvbi5kaXNhYmxlZCl7XG4gICAgICAgICAgYnV0dG9uLmRpc2FibGVkPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgfVxuICB9XG4gIGFzeW5jIGFwcGx5VXNpbmdDbGljaygpIDogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMocmVzb2x2ZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRUb3RhbD0gMDtcbiAgICAgIHRoaXMuY2xpY2tBcHBseUJ1dHRvbigpO1xuICAgICAgYXdhaXQgVXRpbHMuc2xlZXBNcyh0aGlzLnNldHRpbmdzLndhaXRCZWZvcmVDaGVja1N1Y2Nlc3MpO1xuICAgICAgdHJ5e1xuICAgICAgICBjdXJyZW50VG90YWw9IHRoaXMuZ2V0Q3VycmVudFRvdGFsKGRvY3VtZW50KTtcbiAgICAgICAgYXdhaXQgdGhpcy5wb3N0QXBwbHlDb2RlKCk7XG4gICAgICB9Y2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKGN1cnJlbnRUb3RhbCk7XG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgYXBwbHlVc2luZ0Zvcm0oKSA6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRUb3RhbD0gMDtcbiAgICAgIGxldCBmb3JtID0gdGhpcy5nZXRBcHBseUNvZGVGb3JtKCk7XG4gICAgICBpZihmb3JtKXtcbiAgICAgICAgbGV0IGZvcm1EYXRhPSBVdGlscy5zZXJpYWxpemVBcnJheShmb3JtKTtcbiAgICAgICAgY29uc3QgYXBwbHlCdG5OYW1lPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JBcHBseUNvZGUpPy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAgICAgY29uc3QgYXBwbHlCdG5WYWx1ZT0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLnNlbGVjdG9yQXBwbHlDb2RlKT8uZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICBpZihhcHBseUJ0bk5hbWUgJiYgYXBwbHlCdG5WYWx1ZSl7XG4gICAgICAgICAgZm9ybURhdGEucHVzaCggeyBuYW1lOiBhcHBseUJ0bk5hbWUgLCB2YWx1ZTogYXBwbHlCdG5WYWx1ZSB9ICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2U9IGF3YWl0IGZldGNoKGZvcm0uYWN0aW9uLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib2R5OiBmb3JtRGF0YS5qb2luKCcmJylcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHJlc3BvbnNlLm9rKXtcbiAgICAgICAgICBjb25zdCBjaGVja291dFBhZ2VIdG1sPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY2hlY2tvdXRQYWdlSHRtbCwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgIGN1cnJlbnRUb3RhbD0gdGhpcy5nZXRDdXJyZW50VG90YWwoZG9jKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBvc3RBcHBseUNvZGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGN1cnJlbnRUb3RhbCk7XG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgJC5wb3N0KCRmb3JtLmFjdGlvbiwgJC5wYXJhbShmb3JtRGF0YSkpXG4gICAgICAgICAgICAgICAgICAudGhlbiggYXN5bmMgKGNoZWNrb3V0UGFnZUh0bWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRvdGFsPSB0aGlzLmdldEN1cnJlbnRUb3RhbChjaGVja291dFBhZ2VIdG1sKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wb3N0QXBwbHlDb2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3VycmVudFRvdGFsKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAqL1xuXG4gICAgICB9XG4gICAgfSkpO1xuICB9XG4gIGFzeW5jIGFwcGx5Q29kZShjb2RlOiBzdHJpbmcpIDogUHJvbWlzZTxudW1iZXI+IHtcbiAgICB0aGlzLnByZUFwcGx5Q29kZShjb2RlKTtcbiAgICBpZih0aGlzLnNldHRpbmdzLm1ldGhvZEFwcGx5Q29kZT09PVwiY2xpY2tcIil7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5hcHBseVVzaW5nQ2xpY2soKTtcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFwcGx5VXNpbmdGb3JtKCk7XG4gICAgfVxuICB9XG4gIGFwcGx5Q29kZUFzVXNlcihjb2RlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnByZUFwcGx5Q29kZShjb2RlKTtcbiAgICBpZih0aGlzLnNldHRpbmdzLm1ldGhvZEFwcGx5Q29kZUFzVXNlcj09PVwiY2xpY2tcIil7XG4gICAgICB0aGlzLmNsaWNrQXBwbHlCdXR0b24oKTtcbiAgICB9ZWxzZXtcbiAgICAgIGxldCAkZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnR8bnVsbD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3JTdWJtaXRDb2RlKTtcbiAgICAgICRmb3JtPy5zdWJtaXQoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBMb2NhbFN0b3JhZ2UgZnJvbSBcIi4uL3NlcnZpY2UvTG9jYWxTdG9yYWdlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiLi4vdXRpbC9VdGlsc1wiO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4uL3V0aWwvTWVzc2FnZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2xpZW50IHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGlkKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgc3RhdGljIGdldElkKCl7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlLmlkO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KFV0aWxzLnV1aWQoKSk7XG4gICAgTG9jYWxTdG9yYWdlLnNldChcImNsaWVudF9pZFwiLCBjbGllbnQuaWQpO1xuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgaW5pdGlhbGl6ZSgpIDogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgfVxuICAgIGxldCBjbGllbnRJZCA9IGF3YWl0IExvY2FsU3RvcmFnZS5nZXQoXCJjbGllbnRfaWRcIik7XG4gICAgaWYgKGNsaWVudElkKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBDbGllbnQoY2xpZW50SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IENsaWVudC5jcmVhdGUoKTtcbiAgICAgIC8vY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2UoTWVzc2FnZS5JRF9DUkVBVEVfQ0xJRU5ULCB0aGlzLl9pbnN0YW5jZS5pZCkpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFNhdmluZ3tcbiAgcHVibGljIHN0b3JlSWQ6IG51bWJlcjtcbiAgcHVibGljIGNvdXBvbklkOiBudW1iZXI7XG4gIHB1YmxpYyB0b3RhbDogbnVtYmVyO1xuICBwdWJsaWMgZGlzY291bnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihzdG9yZUlkOiBudW1iZXIsIGNvdXBvbklkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGRpc2NvdW50OiBudW1iZXIpIHtcbiAgICB0aGlzLnN0b3JlSWQ9IHN0b3JlSWQ7XG4gICAgdGhpcy5jb3Vwb25JZD0gY291cG9uSWQ7XG4gICAgdGhpcy50b3RhbD0gdG90YWw7XG4gICAgdGhpcy5kaXNjb3VudD0gZGlzY291bnQ7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsU3RvcmFnZXtcclxuICBzdGF0aWMgYXN5bmMgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+e1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KGtleSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgcmVzb2x2ZShkYXRhW2tleV0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIHN0YXRpYyBhc3luYyBzZXQoa2V5OiBzdHJpbmcsIGRhdGE6IE9iamVjdCk6IFByb21pc2U8YW55PntcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7W2tleV06IGRhdGF9LCAoKSA9PiB7XHJcbiAgICAgICAgLy9UT0RPIG1heWJlIGNoZWNrIGlmIGRhdGEgd3JpdHRlbiBjb3JyZWN0bHlcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBjbGVhcigpOiBQcm9taXNlPGFueT57XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmNsZWFyKCgpPT57XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdle1xyXG4gIFxyXG4gIHB1YmxpYyBzdGF0aWMgSURfQ0xJQ0tFRF9FWFRFTlNJT05fSUNPTj0gXCJDTElDS0VEX0VYVEVOU0lPTl9JQ09OXCI7XHJcbiAgcHVibGljIHN0YXRpYyBJRF9CUk9XU0VEX1NVUFBPUlRFRF9TVE9SRT0gXCJCUk9XU0VEX1NVUFBPUlRFRF9TVE9SRVwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgSURfQ1JFQVRFX0NMSUVOVD0gXCJDUkVBVEVfQ0xJRU5UXCI7XHJcbiAgcHVibGljIHN0YXRpYyBJRF9PUEVOX0FGRklMSUFURV9UQUI9IFwiT1BFTl9BRkZJTElBVEVfVEFCXCI7XHJcbiAgcHVibGljIHN0YXRpYyBJRF9DUkVBVEVfU0FWSU5HPSBcIkNSRUFURV9TQVZJTkdcIjtcclxuXHJcbiAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIGRhdGE6IGFueTtcclxuICBcclxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICB0aGlzLmlkPSBpZDtcclxuICAgIHRoaXMuZGF0YT0gZGF0YTtcclxuICB9XHJcbn0iLCJpbXBvcnQgeyBjdXN0b21BbHBoYWJldCB9IGZyb20gJ25hbm9pZCc7XG5jb25zdCBuYW5vaWQgPSBjdXN0b21BbHBoYWJldCgnMTIzNDU2Nzg5MGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonLCAyMCk7XG5cbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBnZXRUaW1lU2luY2UodGltZVN0YW1wKSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBzZWNvbmRzUGFzdCA9IE1hdGguZmxvb3Iobm93LmdldFRpbWUoKS8xMDAwKSAtIHRpbWVTdGFtcDtcbiAgICBsZXQgdW5pdDtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYoc2Vjb25kc1Bhc3QgPCA2MCl7XG4gICAgICB1bml0PSAnc2Vjb25kJztcbiAgICAgIHZhbHVlPSBzZWNvbmRzUGFzdDtcbiAgICB9ZWxzZSBpZihzZWNvbmRzUGFzdCA8IDM2MDApe1xuICAgICAgdW5pdD0gJ21pbnV0ZSc7XG4gICAgICB2YWx1ZT0gTWF0aC5mbG9vcihzZWNvbmRzUGFzdC82MCk7XG4gICAgfWVsc2UgaWYoc2Vjb25kc1Bhc3QgPD0gODY0MDApe1xuICAgICAgdW5pdD0gJ2hvdXInO1xuICAgICAgdmFsdWU9IE1hdGguZmxvb3Ioc2Vjb25kc1Bhc3QvMzYwMCk7XG4gICAgfWVsc2UgaWYoc2Vjb25kc1Bhc3QgPD0gMjU5MjAwMCl7XG4gICAgICB1bml0PSAnZGF5JztcbiAgICAgIHZhbHVlPSBNYXRoLmZsb29yKHNlY29uZHNQYXN0Lzg2NDAwKTtcbiAgICB9XG4gICAgaWYoIXVuaXQpe1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCB0aW1lU2luY2U9IGAke3ZhbHVlfSAke3VuaXR9YDtcbiAgICBpZih2YWx1ZT4xKXtcbiAgICAgIHRpbWVTaW5jZSs9ICdzJztcbiAgICB9XG4gICAgcmV0dXJuIHRpbWVTaW5jZTtcbiAgfVxuICBzdGF0aWMgYXN5bmMgc2xlZXAoc2Vjb25kcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgc2Vjb25kcyoxMDAwKSk7XG4gIH1cbiAgc3RhdGljIGFzeW5jIHNsZWVwTXMobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gIH1cbiAgc3RhdGljIGdldERvbWFpbih1cmwpIHtcbiAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2goLyg/Omh0dHBzPzpcXC9cXC8pPyg/Ond3d1swLTldKlxcLik/KFteLzo/I10rKS9pKTtcbiAgICBpZiAobWF0Y2ggIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIGRvbWFpbiBmb3IgXCIrdXJsKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgdXVpZCgpe1xuICAgIHJldHVybiBuYW5vaWQoKTtcbiAgfVxuICBzdGF0aWMgc2VyaWFsaXplQXJyYXkoZm9ybTogSFRNTEZvcm1FbGVtZW50KSB7XG4gICAgY29uc3QgYXJyOiBBcnJheTx7bmFtZSx2YWx1ZX0+PSBbXTtcbiAgICBpZiAoIWZvcm0gfHwgZm9ybS5ub2RlTmFtZSAhPT0gXCJGT1JNXCIpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBmb3JtLmVsZW1lbnRzKSB7XG4gICAgICBpZiAoZWxlbWVudFsnbmFtZSddID09PSBcIlwiKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChlbGVtZW50Lm5vZGVOYW1lKSB7XG4gICAgICAgIGNhc2UgJ0lOUFVUJzpcbiAgICAgICAgICBzd2l0Y2ggKGVsZW1lbnRbJ3R5cGUnXSkge1xuICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICAgICAgY2FzZSAncGFzc3dvcmQnOlxuICAgICAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgICAgIGNhc2UgJ3Jlc2V0JzpcbiAgICAgICAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgICAgICAgIGFyci5wdXNoKHtuYW1lOiBlbGVtZW50WyduYW1lJ10sIHZhbHVlOiBlbGVtZW50Wyd2YWx1ZSddfSlcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50WydjaGVja2VkJ10pIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7bmFtZTogZWxlbWVudFsnbmFtZSddLCB2YWx1ZTogZWxlbWVudFsndmFsdWUnXX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnVEVYVEFSRUEnOlxuICAgICAgICAgIGFyci5wdXNoKHtuYW1lOiBlbGVtZW50WyduYW1lJ10sIHZhbHVlOiBlbGVtZW50Wyd2YWx1ZSddfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1NFTEVDVCc6XG4gICAgICAgICAgc3dpdGNoIChlbGVtZW50Wyd0eXBlJ10pIHtcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdC1vbmUnOlxuICAgICAgICAgICAgICBhcnIucHVzaCh7bmFtZTogZWxlbWVudFsnbmFtZSddLCB2YWx1ZTogZWxlbWVudFsndmFsdWUnXX0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdC1tdWx0aXBsZSc6XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIGVsZW1lbnRbJ29wdGlvbnMnXSkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHtuYW1lOiBlbGVtZW50WyduYW1lJ10sIHZhbHVlOiBvcHRpb24udmFsdWV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdCVVRUT04nOlxuICAgICAgICAgIHN3aXRjaCAoZWxlbWVudFsndHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgICAgICAgYXJyLnB1c2goe25hbWU6IGVsZW1lbnRbJ25hbWUnXSwgdmFsdWU6IGVsZW1lbnRbJ3ZhbHVlJ119KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbn1cbiIsImltcG9ydCB7VXRpbHN9IGZyb20gXCIuLi91dGlsL1V0aWxzXCI7XG5pbXBvcnQge0h0bWxWaWV3fSBmcm9tIFwiLi9IdG1sVmlld1wiO1xuXG5leHBvcnQgY2xhc3MgQ291cG9uVmlldyBleHRlbmRzIEh0bWxWaWV3IHtcbiAgcHJpdmF0ZSBwYXJlbnQ7XG4gIHByaXZhdGUgY291cG9uO1xuICBjb25zdHJ1Y3RvcihwYXJlbnQsY291cG9uKSB7XG4gICAgc3VwZXIoXCJodG1sL2NvdXBvbi5odG1sXCIpO1xuICAgIHRoaXMucGFyZW50PXBhcmVudDtcbiAgICB0aGlzLmNvdXBvbj1jb3Vwb247XG4gICAgdGhpcy5sb2FkZWQudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnRleHQoJy5jZi1wcm9tb2NvZGUnLCB0aGlzLmNvdXBvbi5jb2RlKTtcbiAgICAgIGlmKHRoaXMuY291cG9uLm5hbWUgJiYgdGhpcy5jb3Vwb24ubmFtZSE9PVwiXCIpe1xuICAgICAgICB0aGlzLnRleHQoJy5jZi1jb3Vwb24tbmFtZScsIHRoaXMuY291cG9uLm5hbWUpO1xuICAgICAgfVxuICAgICAgaWYoXCJsYXN0QXBwbHlEYXRlXCIgaW4gdGhpcy5jb3Vwb24pe1xuICAgICAgICBsZXQgdGltZVNpbmNlPSBVdGlscy5nZXRUaW1lU2luY2UodGhpcy5jb3Vwb24ubGFzdEFwcGx5RGF0ZSk7XG4gICAgICAgIGlmKHRpbWVTaW5jZSl7XG4gICAgICAgICAgdGhpcy50ZXh0KCcuY2YtY291cG9uLWxhc3R1c2VkJyxgTGFzdCB1c2VkICR7dGltZVNpbmNlfSBhZ28gdG8gc2F2ZSAkJHt0aGlzLmNvdXBvbi5sYXN0QXBwbHlEaXNjb3VudC50b0ZpeGVkKDIpfWApO1xuICAgICAgICAgIHRoaXMuY3NzKCcuY2YtY291cG9uLWxhc3R1c2VkJywgW3tuYW1lOiAnY29sb3InLCB2YWx1ZTogJyM0Q0FGNTAnfV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLiRodG1sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHtcbiAgICAgICAgdGhpcy5jb3B5Q291cG9uVG9DbGlwYm9hcmQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29weUNvdXBvblRvQ2xpcGJvYXJkKCkge1xuICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkKHRoaXMuY291cG9uLmNvZGUsIHRoaXMuJGh0bWwgYXMgSFRNTEVsZW1lbnQpO1xuICAgIGNvbnN0IGNvcGllZE1lc3NhZ2VTZWxlY3Rvcj0gJy5jb3BpZWQnO1xuICAgIHRoaXMucGFyZW50LmhpZGUoY29waWVkTWVzc2FnZVNlbGVjdG9yKTtcbiAgICB0aGlzLnNob3coY29waWVkTWVzc2FnZVNlbGVjdG9yKTtcbiAgICBsZXQgX3RoaXM9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5oaWRlKGNvcGllZE1lc3NhZ2VTZWxlY3Rvcik7XG4gICAgfSwxNTAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtTYXZpbmd9IGZyb20gXCIuLi9tb2RlbC9TYXZpbmdcIjtcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuLi91dGlsL01lc3NhZ2VcIjtcbmltcG9ydCB7UG9wdXB9IGZyb20gXCIuL1BvcHVwXCI7XG5pbXBvcnQge1dlYnNpdGV9IGZyb20gXCIuLi9jb3JlL1dlYnNpdGVcIjtcbmltcG9ydCB7Q291cG9ufSBmcm9tIFwiLi4vbW9kZWwvQ291cG9uXCI7XG5pbXBvcnQge0NsaWVudH0gZnJvbSBcIi4uL21vZGVsL0NsaWVudFwiO1xuaW1wb3J0IHtTdG9yZX0gZnJvbSBcIi4uL21vZGVsL1N0b3JlXCI7XG4vL2ltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5Lm1pbic7XG5cbmV4cG9ydCBjbGFzcyBDb3Vwb25zQXBwbGllclZpZXcgZXh0ZW5kcyBQb3B1cCB7XG4gIHByaXZhdGUgb3JpZ2luYWxUb3RhbD0gMDtcbiAgcHJpdmF0ZSBwcmV2aW91c1RvdGFsPSAwO1xuICBwcml2YXRlIHRvdGFsQXBwbGllZD0gMDtcbiAgcHJpdmF0ZSBwcmV2ZW50Q291cG9uRm9ybVN1Ym1pdD0gZmFsc2U7XG4gIHByaXZhdGUgc2F2aW5nOiBTYXZpbmd8bnVsbD0gbnVsbDtcbiAgcHJpdmF0ZSBiZXN0Q291cG9uOiBDb3Vwb258bnVsbD0gbnVsbDtcbiAgcHJpdmF0ZSB3ZWJzaXRlOiBXZWJzaXRlO1xuICBwcml2YXRlIHN0b3JlOiBTdG9yZTtcbiAgcHJpdmF0ZSBhYm9ydENvZGVzQXBwbGljYXRpb249IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcih3ZWJzaXRlOiBXZWJzaXRlLCBzdG9yZTogU3RvcmUpIHtcbiAgICBzdXBlcihcImh0bWwvYXBwbHljb2Rlcy5odG1sXCIpO1xuICAgIHRoaXMud2Vic2l0ZT0gd2Vic2l0ZTtcbiAgICB0aGlzLnN0b3JlPSBzdG9yZTtcbiAgICB0aGlzLmxvYWRlZC50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuY3NzKCcjY2YtYXBwbHktbW9kYWwtd3JhcHBlcicsW3tuYW1lOiAnZGlzcGxheScsIHZhbHVlOiAnYmxvY2snfV0pO1xuICAgICAgdGhpcy5vcmlnaW5hbFRvdGFsPSB3ZWJzaXRlLmdldEN1cnJlbnRUb3RhbChkb2N1bWVudCk7XG4gICAgICB0aGlzLnByZXZpb3VzVG90YWw9IHRoaXMub3JpZ2luYWxUb3RhbDtcbiAgICB9KTtcbiAgfVxuICAvL3F1aWNrIGFjY2VzcyBtZXRob2RzXG4gIGdldFNldHRpbmcobmFtZSl7XG4gICAgcmV0dXJuIHRoaXMud2Vic2l0ZS5zZXR0aW5nc1tuYW1lXTtcbiAgfVxuICBnZXRDb3Vwb25zKCl7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY291cG9ucztcbiAgfVxuICBnZXRTdG9yZUlkKCl7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuaWQ7XG4gIH1cbiAgZ2V0U3RvcmVOYW1lKCl7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUubmFtZTtcbiAgfVxuICBhc3luYyBhcHBseUNvZGVzKCl7XG4gICAgdGhpcy5zYXZpbmc9IG51bGw7XG4gICAgaWYodGhpcy5nZXRTZXR0aW5nKCdtZXRob2RBcHBseUNvZGUnKT09PVwiZm9ybVwiKXtcbiAgICAgIHRoaXMucHJldmVudENvdXBvbkZvcm1TdWJtaXQ9IHRydWU7XG4gICAgICBsZXQgJGZvcm0gPSAkKHRoaXMuZ2V0U2V0dGluZygnc2VsZWN0b3JBcHBseUNvZGUnKSkuY2xvc2VzdCgnZm9ybScpO1xuICAgICAgJGZvcm0ub24oJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGlmKHRoaXMucHJldmVudENvdXBvbkZvcm1TdWJtaXQpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGZvcihjb25zdCBjb3Vwb24gb2YgdGhpcy5nZXRDb3Vwb25zKCkpe1xuICAgICAgaWYodGhpcy5hYm9ydENvZGVzQXBwbGljYXRpb24pe1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQge3N1Y2Nlc3MsIGN1cnJlbnRUb3RhbH0gPSBhd2FpdCB0aGlzLmFwcGx5TmV4dENvZGUoT2JqZWN0LmFzc2lnbih7fSwgY291cG9uKSk7XG4gICAgICBpZihzdWNjZXNzKXtcbiAgICAgICAgdGhpcy5yZWNvcmRDb2RlU3VjY2Vzcyhjb3Vwb24sIGN1cnJlbnRUb3RhbCk7XG4gICAgICB9XG4gICAgICB0aGlzLnRvdGFsQXBwbGllZCsrO1xuICAgICAgdGhpcy5wcmV2aW91c1RvdGFsPSBjdXJyZW50VG90YWw7XG4gICAgfVxuICAgIHRoaXMuc2hvd1ZlcmlmaWNhdGlvblJlc3VsdHMoKTtcbiAgfVxuICByZWZyZXNoUHJvZ3Jlc3MoKXtcbiAgICB0aGlzLnRleHQoJyNjZi1hcHBseWluZy1jb2RlLW1lc3NhZ2UnLGBUcnlpbmcgY29kZSAke3RoaXMudG90YWxBcHBsaWVkKzF9IG9mICR7dGhpcy5nZXRDb3Vwb25zKCkubGVuZ3RofWApO1xuICAgIGxldCB3aWR0aD0gTWF0aC5mbG9vcigoKHRoaXMudG90YWxBcHBsaWVkKzEpKjEwMCkvdGhpcy5nZXRDb3Vwb25zKCkubGVuZ3RoKTtcbiAgICB0aGlzLmNzcygnI2NmLWFwcGx5LXByb2dyZXNzLXN0YXR1cycsW3tuYW1lOiAnd2lkdGgnLCB2YWx1ZTogYCR7d2lkdGh9JWB9XSk7XG4gICAgLy9sZXQgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2YtYXBwbHktcHJvZ3Jlc3Mtc3RhdHVzXCIpO1xuICAgIC8vZWxlbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgJyUnO1xuICB9XG4gIGNoZWNrQ29kZVN1Y2Nlc3MoY3VycmVudFRvdGFsOiBudW1iZXIsIG9yaWdpbmFsVG90YWw6IG51bWJlciwgcHJldmlvdXNUb3RhbDogbnVtYmVyKSA6IG51bWJlciB7XG4gICAgaWYoY3VycmVudFRvdGFsPG9yaWdpbmFsVG90YWwpe1xuICAgICAgaWYoY3VycmVudFRvdGFsIT09cHJldmlvdXNUb3RhbCl7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfWVsc2UgaWYodGhpcy5nZXRTZXR0aW5nKCdjaGVja1N1Y2Nlc3NFeHByZXNzaW9uJykhPT1cIlwiKXtcbiAgICAgICAgY29uc3QgX3RoaXM9IHRoaXM7XG4gICAgICAgIHJldHVybiBldmFsKHRoaXMuZ2V0U2V0dGluZygnY2hlY2tTdWNjZXNzRXhwcmVzc2lvbicpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmVjb3JkQ29kZVN1Y2Nlc3MoY291cG9uLCBjdXJyZW50VG90YWw6IG51bWJlcikge1xuICAgIGNvbnN0IGRpc2NvdW50PSBwYXJzZUZsb2F0KCh0aGlzLm9yaWdpbmFsVG90YWwtY3VycmVudFRvdGFsKS50b0ZpeGVkKDIpKTtcbiAgICBjb25zdCBzYXZpbmc9IG5ldyBTYXZpbmcodGhpcy5nZXRTdG9yZUlkKCksIGNvdXBvbi5pZCwgY3VycmVudFRvdGFsLCBkaXNjb3VudCk7XG4gICAgaWYodGhpcy5zYXZpbmc9PW51bGwgfHwgY3VycmVudFRvdGFsPHRoaXMuc2F2aW5nLnRvdGFsKXtcbiAgICAgIHRoaXMuc2F2aW5nPSBzYXZpbmc7XG4gICAgICB0aGlzLmJlc3RDb3Vwb249IGNvdXBvbjtcbiAgICB9XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2UoTWVzc2FnZS5JRF9DUkVBVEVfU0FWSU5HLCB7Y2xpZW50SWQ6IENsaWVudC5nZXRJZCgpLCBzYXZpbmd9KSk7XG4gIH1cbiAgYXN5bmMgYXBwbHlOZXh0Q29kZShjb3Vwb24pIHtcbiAgICB0aGlzLnJlZnJlc2hQcm9ncmVzcygpO1xuICAgIGNvbnN0IGN1cnJlbnRUb3RhbD0gYXdhaXQgdGhpcy53ZWJzaXRlLmFwcGx5Q29kZShjb3Vwb24uY29kZSk7XG4gICAgY29uc3Qgc3VjY2Vzcz0gdGhpcy5jaGVja0NvZGVTdWNjZXNzKGN1cnJlbnRUb3RhbCwgdGhpcy5vcmlnaW5hbFRvdGFsLCB0aGlzLnByZXZpb3VzVG90YWwpO1xuICAgIHJldHVybiB7c3VjY2VzcywgY3VycmVudFRvdGFsfTtcbiAgfVxuICBvcGVuKCkge1xuICAgIHRoaXMuYWJvcnRDb2Rlc0FwcGxpY2F0aW9uPSBmYWxzZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnByZXZlbnRDb3Vwb25Gb3JtU3VibWl0PSBmYWxzZTtcbiAgICB0aGlzLmFib3J0Q29kZXNBcHBsaWNhdGlvbj0gdHJ1ZTtcbiAgICBpZih0aGlzLnRvdGFsQXBwbGllZD09PXRoaXMuZ2V0Q291cG9ucygpLmxlbmd0aCl7XG4gICAgICBpZih0aGlzLnNhdmluZyE9bnVsbCAmJiB0aGlzLmJlc3RDb3Vwb24hPW51bGwgJiYgdGhpcy53ZWJzaXRlLnNldHRpbmdzLm1ldGhvZEFwcGx5Q29kZUFzVXNlciE9PSdjbGljaycpe1xuICAgICAgICB0aGlzLndlYnNpdGUuYXBwbHlDb2RlQXNVc2VyKHRoaXMuYmVzdENvdXBvbi5jb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wcmV2aW91c1RvdGFsPSB0aGlzLm9yaWdpbmFsVG90YWw7XG4gICAgdGhpcy50b3RhbEFwcGxpZWQ9IDA7XG4gICAgdGhpcy5zYXZpbmc9IG51bGw7XG4gICAgdGhpcy5iZXN0Q291cG9uPSBudWxsO1xuICAgIHN1cGVyLmNsb3NlKCk7XG4gIH1cbiAgc2hvd1ZlcmlmaWNhdGlvblJlc3VsdHMoKSB7XG4gICAgLy90aGlzLiRodG1sLmZpbmQoJyNjZi1hcHBseWluZ0NvZGUtaGVhZGxpbmUnKS5oaWRlKCk7XG4gICAgdGhpcy5oaWRlKCcjY2YtYXBwbHlpbmctY29kZS1tZXNzYWdlJyk7XG4gICAgdGhpcy5oaWRlKCcjY2YtYXBwbHktcHJvZ3Jlc3Mtd3JhcHBlcicpO1xuICAgIHRoaXMuY3NzKCcjY2YtYXBwbHktbW9kYWwtaGVhZGxpbmUnLCBbe25hbWU6IFwiZm9udC1zaXplXCIsdmFsdWU6IFwiMzBweFwifSx7bmFtZTogJ2ZvbnQtd2VpZ2h0JywgdmFsdWU6ICc3MDAnfV0pO1xuICAgIHRoaXMuaGlkZSgnI2NmLWFwcGx5LW1vZGFsLWhlYWRsaW5lJyk7XG4gICAgaWYodGhpcy5iZXN0Q291cG9uPT1udWxsKXtcbiAgICAgIC8vJGhlYWRsaW5lLnRleHQoXCJBcmdoaCFcIik7XG4gICAgICAvLyRoZWFkbGluZS5jc3MoXCJjb2xvclwiLFwiIzZkODU5MFwiKTtcbiAgICAgIHRoaXMuc2hvdygnI2NmLWFwcGx5Y29kZS1mYWlsZWQnKTtcbiAgICB9ZWxzZXtcbiAgICAgIC8vJGhlYWRsaW5lLnRleHQodGhpcy5iZXN0Q291cG9uLmNvZGUpO1xuICAgICAgLy8kaGVhZGxpbmUuY3NzKFwiY29sb3JcIixcIiMwZDkwMGRcIik7XG4gICAgICBjb25zdCAkc3VjY2Vzc0ltZz0gdGhpcy5maW5kKCcjY2YtYXBwbHktc3VjY2Vzcy1pbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgJHN1Y2Nlc3NJbWcuc3JjPSBgY2hyb21lLWV4dGVuc2lvbjovLyR7Y2hyb21lLnJ1bnRpbWUuaWR9L2ltYWdlcy9hcHBseS1jb2RlLXN1Y2Nlc3MuZ2lmYDtcbiAgICAgIHRoaXMuc2hvdygnI2NmLWFwcGx5LXN1Y2Nlc3MtaW1nJyk7XG4gICAgICB0aGlzLnRleHQoJyNjZi1jYXJ0LWNvZGUnLGAke3RoaXMuYmVzdENvdXBvbi5jb2RlfWApO1xuICAgICAgdGhpcy50ZXh0KCcjY2YtY2FydC1zYXZpbmcnLGAkJHt0aGlzLnNhdmluZz8uZGlzY291bnQudG9GaXhlZCgyKX1gKTtcbiAgICAgIHRoaXMudGV4dCgnI2NmLWNhcnQtYmVmb3JlLWNvZGUnLGAkJHt0aGlzLm9yaWdpbmFsVG90YWwudG9GaXhlZCgyKX1gKTtcbiAgICAgIHRoaXMudGV4dCgnI2NmLWNhcnQtYWZ0ZXItY29kZScsYCQke3RoaXMuc2F2aW5nPy50b3RhbC50b0ZpeGVkKDIpfWApO1xuICAgICAgdGhpcy5zaG93KCcjY2YtYXBwbHljb2RlLXN1Y2Nlc3MnKTtcbiAgICAgIGlmKHRoaXMud2Vic2l0ZS5zZXR0aW5ncy5tZXRob2RBcHBseUNvZGVBc1VzZXI9PT0nY2xpY2snKXtcbiAgICAgICAgdGhpcy53ZWJzaXRlLmFwcGx5Q29kZUFzVXNlcih0aGlzLmJlc3RDb3Vwb24uY29kZSk7XG4gICAgICB9XG4gICAgICAvL3RoaXMucmVwb3J0U2F2aW5nKCk7XG4gICAgfVxuICB9XG4gIC8qXG4gIHJlcG9ydFNhdmluZygpIHtcbiAgICBjb25zdCBtZXNzYWdlPSB7XG4gICAgICAgIGFjdGlvbjogXCJjcmVhdGVfc2F2aW5nXCIsXG4gICAgICAgIHNhdmluZzogSlNPTi5zdHJpbmdpZnkoc2Vzc2lvbi5zYXZpbmcpXG4gICAgICB9O1xuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgICAgbWVzc2FnZSwgKHJlc3BvbmUpID0+IHt9XG4gICAgKTtcbiAgfSovXG59XG4iLCIvL2ltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5Lm1pbic7XG5pbXBvcnQgdmFsaWRhdGUgPSBXZWJBc3NlbWJseS52YWxpZGF0ZTtcblxuZXhwb3J0IGNsYXNzIEh0bWxWaWV3IHtcbiAgcHVibGljIGxvYWRlZDogUHJvbWlzZTx2b2lkPjtcbiAgcHVibGljICRodG1sOiBFbGVtZW50O1xuICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gXCI8ZGl2PjwvZGl2PlwiO1xuICAgIHRoaXMuJGh0bWw9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RDaGlsZCBhcyBFbGVtZW50O1xuICAgIHRoaXMubG9hZGVkPSBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIGZldGNoKGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKHVybCkpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAvL2NvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgICByZXNwb25zZS50ZXh0KCkudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICB0aGlzLiRodG1sPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0Q2hpbGQgYXMgRWxlbWVudDtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuICB0ZXh0KHNlbGVjdG9yOiBzdHJpbmcsdGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgZWxlbWVudD0gdGhpcy5maW5kKHNlbGVjdG9yKTtcbiAgICBpZihlbGVtZW50KXtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MPSB0ZXh0O1xuICAgIH1cbiAgfVxuICBzaG93KHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZWxlbWVudD0gdGhpcy5maW5kKHNlbGVjdG9yKTtcbiAgICBpZihlbGVtZW50KXtcbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheT0gJ2Jsb2NrJztcbiAgICB9XG4gIH1cbiAgaGlkZShzZWxlY3Rvcikge1xuICAgIGNvbnN0IGVsZW1lbnQ9IHRoaXMuZmluZChzZWxlY3Rvcik7XG4gICAgaWYoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXk9ICdub25lJztcbiAgICB9XG4gIH1cbiAgYXBwZW5kKHNlbGVjdG9yLCAkaHRtbCkge1xuICAgIGNvbnN0IGVsZW1lbnQ9IHRoaXMuZmluZChzZWxlY3Rvcik7XG4gICAgaWYoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKCRodG1sKTtcbiAgICB9XG4gIH1cbiAgZmluZChzZWxlY3Rvcik6IEhUTUxFbGVtZW50e1xuICAgIHJldHVybiB0aGlzLiRodG1sLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9XG4gIGNzcyhzZWxlY3Rvcjogc3RyaW5nLCBzdHlsZXM6IEFycmF5PHtuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9Pil7XG4gICAgY29uc3QgZWxlbWVudD0gdGhpcy5maW5kKHNlbGVjdG9yKTtcbiAgICBpZihlbGVtZW50KXtcbiAgICAgIGZvcihjb25zdCBzIG9mIHN0eWxlcyl7XG4gICAgICAgIGVsZW1lbnQuc3R5bGVbcy5uYW1lXT0gcy52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy9NdXN0IGdpdmUgYSBodG1sIGVsZW1lbnQgdG8gYXR0YWNoIHRvXG4gIC8vaW4gb3JkZXIgdG8gYXZvaWQgc2Nyb2xsaW5nLWFmdGVyLWZvY3VzIGlzc3VlXG4gIGNvcHlUb0NsaXBib2FyZCh0ZXh0LCByb290RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgYWN0aXZlRWxlbWVudD0gZG9jdW1lbnQuYm9keTtcbiAgICBpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KXtcbiAgICAgIGFjdGl2ZUVsZW1lbnQ9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgfVxuICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInRlbXBDb3B5QnVmZmVyXCIvPic7XG4gICAgY29uc3QgY29weUJ1ZmZlcj0gdGVtcGxhdGUuY29udGVudC5maXJzdENoaWxkIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcm9vdEVsZW1lbnQuYXBwZW5kKGNvcHlCdWZmZXIpO1xuICAgIGNvcHlCdWZmZXIudmFsdWU9IHRleHQ7XG4gICAgY29weUJ1ZmZlci5mb2N1cygpO1xuICAgIGNvcHlCdWZmZXIuc2VsZWN0KCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICBhY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgY29weUJ1ZmZlci5yZW1vdmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtOb09mZmVyc1ZpZXd9IGZyb20gXCIuL05vT2ZmZXJzXCI7XG5cbmV4cG9ydCBjbGFzcyBOb0NvdXBvbnNWaWV3IGV4dGVuZHMgTm9PZmZlcnNWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJTb3JyeSwgd2UgaGF2ZSBubyBhY3RpdmUgY291cG9ucyBmb3IgdGhpcyBzaXRlIHJpZ2h0IG5vd1wiKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4vUG9wdXBcIjtcblxuZXhwb3J0IGNsYXNzIE5vT2ZmZXJzVmlldyBleHRlbmRzIFBvcHVwe1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgc3VwZXIoXCJodG1sL25vb2ZmZXJzLmh0bWxcIik7XG4gICAgdGhpcy5sb2FkZWQudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnRleHQoJyNjZi1uby1vZmZlcnMtbWVzc2FnZScsbWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7Tm9PZmZlcnNWaWV3fSBmcm9tIFwiLi9Ob09mZmVyc1wiO1xuXG5leHBvcnQgY2xhc3MgTm9TdG9yZVZpZXcgZXh0ZW5kcyBOb09mZmVyc1ZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIlNvcnJ5LCB0aGlzIHNpdGUgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtIdG1sVmlld30gZnJvbSBcIi4vSHRtbFZpZXdcIjtcbi8vaW1wb3J0ICogYXMgJCBmcm9tICdqcXVlcnkvZGlzdC9qcXVlcnkubWluJztcblxuZXhwb3J0IGNsYXNzIFBvcHVwIGV4dGVuZHMgSHRtbFZpZXcge1xuICAvLyBAdHMtaWdub3JlXG4gIHByb3RlY3RlZCBjZlJvb3Q6IEhUTUxFbGVtZW50O1xuICBwdWJsaWMgaXNPcGVuOiBib29sZWFuPSBmYWxzZTtcbiAgcHVibGljIHJlYWR5OiBQcm9taXNlPHZvaWQ+O1xuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xuICAgIHN1cGVyKHVybCk7XG4gICAgdGhpcy5yZWFkeT0gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmxvYWRlZC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jZlJvb3Q9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5jZlJvb3QuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICAgICAgZmV0Y2goY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoXCJjc3MvYXBwLmNzc1wiKSwgeyBtZXRob2Q6ICdHRVQnIH0pLnRoZW4ocmVzcCA9PiByZXNwLnRleHQoKSkudGhlbihjc3MgPT4ge1xuICAgICAgICAgIHNoYWRvd1Jvb3QuaW5uZXJIVE1MICs9IGA8c3R5bGU+JHtjc3N9PC9zdHlsZT5gO1xuICAgICAgICAgIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy4kaHRtbCk7XG4gICAgICAgICAgdGhpcy5jZlJvb3Quc2V0QXR0cmlidXRlKCdpZCcsJ2NyQ29udGFpbmVyJyk7XG4gICAgICAgICAgdGhpcy5jZlJvb3Quc2V0QXR0cmlidXRlKCdzdHlsZScsJ2FsbDppbml0aWFsJyk7XG4gICAgICAgICAgdGhpcy5maW5kKCcjY2YtY2xvc2UnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyQodGhpcy5jZlJvb3QpLmFwcGVuZCgkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTChcImFwcC5jc3NcIikgKyAnXCIgPicpKTtcbi8vICAgICAgJCgnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCInICsgY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoXCJhcHAuY3NzXCIpICsgJ1wiID4nKS5hcHBlbmRUbyhcImhlYWRcIik7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGNvbnN0IGxvZ289IHRoaXMuZmluZCgnI2NmLWxvZ28taW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgICBsb2dvLnNyYz0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwiaW1hZ2VzL2NmbG9nby5wbmdcIik7XG4gICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLmNmUm9vdCk7XG4gICAgdGhpcy5pc09wZW49IHRydWU7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5jZlJvb3QucmVtb3ZlKCk7XG4gICAgdGhpcy5pc09wZW49IGZhbHNlO1xuICB9XG4gIHRvZ2dsZSgpe1xuICAgIGlmKHRoaXMuaXNPcGVuKXtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4uL3V0aWwvTWVzc2FnZVwiO1xuaW1wb3J0IHtQb3B1cH0gZnJvbSBcIi4vUG9wdXBcIjtcbmltcG9ydCB7V2Vic2l0ZX0gZnJvbSBcIi4uL2NvcmUvV2Vic2l0ZVwiO1xuaW1wb3J0IHtTdG9yZX0gZnJvbSBcIi4uL21vZGVsL1N0b3JlXCI7XG5pbXBvcnQge0NvdXBvblZpZXd9IGZyb20gXCIuL0NvdXBvblZpZXdcIjtcbmltcG9ydCB7Q2xpZW50fSBmcm9tIFwiLi4vbW9kZWwvQ2xpZW50XCI7XG5pbXBvcnQge0NvdXBvbnNBcHBsaWVyVmlld30gZnJvbSBcIi4vQ291cG9uc0FwcGxpZXJcIjtcblxuZXhwb3J0IGNsYXNzIFN0b3JlVmlldyBleHRlbmRzIFBvcHVwIHtcbiAgcHJpdmF0ZSB3ZWJzaXRlOiBXZWJzaXRlO1xuICBwcml2YXRlIHN0b3JlOiBTdG9yZTtcbiAgY29uc3RydWN0b3Ioc3RvcmU6IFN0b3JlLCB3ZWJzaXRlOiBXZWJzaXRlLCBoaWRlQ291cG9ucz0gZmFsc2UpIHtcbiAgICBzdXBlcihcImh0bWwvY291cG9ucy5odG1sXCIpO1xuICAgIHRoaXMuc3RvcmU9IHN0b3JlO1xuICAgIHRoaXMud2Vic2l0ZT0gd2Vic2l0ZTtcbiAgICB0aGlzLnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy50ZXh0KCcjY291cG9uc1RvdGFsJyxgJHt0aGlzLnN0b3JlLmNvdXBvbnMubGVuZ3RofWApO1xuICAgICAgdGhpcy50ZXh0KCcjc3RvcmVOYW1lJyx0aGlzLnN0b3JlLm5hbWUpO1xuICAgICAgZm9yKGNvbnN0IGNvdXBvbiBvZiB0aGlzLnN0b3JlLmNvdXBvbnMpIHtcbiAgICAgICAgY29uc3QgY291cG9uVmlldz0gbmV3IENvdXBvblZpZXcodGhpcyxjb3Vwb24pO1xuICAgICAgICBjb3Vwb25WaWV3LmxvYWRlZC50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFwcGVuZCgnLmNmLWNvdXBvbnMnLCBjb3Vwb25WaWV3LiRodG1sKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZih0aGlzLndlYnNpdGUuc2hvdWxkU2hvd0F1dG9BcHBseSgpKSB7XG4gICAgICAgIHRoaXMuc2hvdygnI2FwcGx5Q29kZXNEaXYnKTtcbiAgICAgICAgdGhpcy5maW5kKCcjY2YtY291cG9ucy1hcHBseS1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgY29uc3QgY291cG9uc0FwcGxpZXI9IG5ldyBDb3Vwb25zQXBwbGllclZpZXcodGhpcy53ZWJzaXRlLCB0aGlzLnN0b3JlKTtcbiAgICAgICAgICBjb3Vwb25zQXBwbGllci5sb2FkZWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb3Vwb25zQXBwbGllci5hcHBseUNvZGVzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2UoTWVzc2FnZS5JRF9PUEVOX0FGRklMSUFURV9UQUIsIHtcbiAgICAgICAgICAgICAgY2xpZW50SWQ6IENsaWVudC5nZXRJZCgpLFxuICAgICAgICAgICAgICBzdG9yZUlkOiB0aGlzLnN0b3JlLmlkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZmluZCgnI2NmLWNvdXBvbnMtYXBwbHktc2hvdy1jb3Vwb25zJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaG93KCcuY2YtY291cG9ucycpO1xuICAgICAgICAgIHRoaXMuaGlkZSgnI2NmLWNvdXBvbnMtYXBwbHktc2hvdy1jb3Vwb25zJyk7XG4gICAgICAgIH0pO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuaGlkZSgnI2FwcGx5Q29kZXNEaXYnKTtcbiAgICAgIH1cbiAgICAgIGlmKCFoaWRlQ291cG9ucykge1xuICAgICAgICB0aGlzLnNob3coJy5jZi1jb3Vwb25zJyk7XG4gICAgICAgIHRoaXMuaGlkZSgnI2NmLWNvdXBvbnMtYXBwbHktc2hvdy1jb3Vwb25zJyk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5zaG93KCcjY2YtY291cG9ucy1hcHBseS1zaG93LWNvdXBvbnMnKTtcbiAgICAgICAgdGhpcy5oaWRlKCcuY2YtY291cG9ucycpO1xuICAgICAgICB0aGlzLmNzcygnI2NmLWNvbnRlbnQnLCBbe25hbWU6ICdoZWlnaHQnLHZhbHVlOiAnYXV0byd9XSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=