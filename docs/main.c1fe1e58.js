// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"hBAB":[function(require,module,exports) {
module.exports = "loader_black.fd18bb1a.gif";
},{}],"B7ub":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loader_black = _interopRequireDefault(require("../img/loader_black.gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Loader = /*#__PURE__*/function () {
  function Loader(options) {
    _classCallCheck(this, Loader);

    this.elements = [];
    this.loaders = [];
    this.transitionEndEventName = getTransitionEndEventName();
    this.afterShowFired = false;
    this.afterHideFired = false;
    this.defaultOptions = {
      image: _loader_black.default,
      backgroundClass: "loader_background",
      loaderClass: "loader_inner"
    };
    this.options = _objectSpread({}, this.defaultOptions, {}, options);
  }

  _createClass(Loader, [{
    key: "create_loader",
    value: function create_loader() {
      var _this = this;

      var container = document.createElement("div");
      container.classList.add(this.options.backgroundClass);
      container.style.transition = 'all 200ms';
      var inner = document.createElement("div");
      inner.classList.add(this.options.loaderClass);
      var image = document.createElement("img");
      image.setAttribute("src", this.options.image);
      inner.appendChild(image);
      container.appendChild(inner);
      container.style.opacity = "0";
      container.addEventListener(this.transitionEndEventName, function (e) {
        if (e.target.style.opacity === "1") {
          // show animation finished
          if (_this.loaders.length >= _this.elements.length && _this.options.afterShow && !_this.afterShowFired) {
            _this.options.afterShow();

            _this.afterShowFired = true;
          }
        } else if (e.target.style.opacity === "0") {
          // hide animation finished
          _this.loaders.shift();

          _this.elements.shift();

          if (_this.options.afterHide && _this.loaders.length < 1 && !_this.afterHideFired) {
            _this.options.afterHide();

            _this.afterHideFired = true;
          }

          e.target.remove();
        }
      });
      return container;
    }
  }, {
    key: "show",
    value: function show(options) {
      var _this2 = this;

      this.afterShowFired = false;

      if (options && options.after && typeof options.after == "function") {
        this.options.afterShow = options.after;
      } else {
        this.options.afterShow = null;
      }

      if (options && options.elements) {
        if (options.elements.length > 1) {
          Array.from(options.elements).map(function (elem) {
            return _this2.elements.push(elem);
          });
        } else if (options.elements instanceof HTMLElement) {
          this.elements.push(options.elements);
        }
      } else {
        this.elements.push(document.querySelector('body'));
      }

      this.elements.map(function (element) {
        var loader = _this2.create_loader();

        if (!element.style.position) {
          element.style.position = 'relative';
        }

        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.width = '100%';
        loader.style.height = '100%';

        if (element.tagName.toLowerCase() === 'body') {
          loader.style.position = "fixed";
        } else {
          loader.style.position = "absolute";
        }

        _this2.loaders.push(loader);

        element.append(loader);
        setTimeout(function () {
          loader.style.opacity = "1";
        }, 50);
        return true;
      });
    }
  }, {
    key: "hide",
    value: function hide(options) {
      this.afterHideFired = false;

      if (options && options.after && typeof options.after == "function") {
        this.options.afterHide = options.after;
      } else {
        this.options.afterHide = null;
      }

      if (this.loaders) {
        this.loaders.map(function (element) {
          return setTimeout(function () {
            element.style.opacity = "0";
          }, 50);
        });
      }
    }
  }]);

  return Loader;
}();

function getTransitionEndEventName() {
  var transitions = {
    "transition": "transitionend",
    "OTransition": "oTransitionEnd",
    "MozTransition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  };
  var bodyStyle = document.body.style;

  for (var transition in transitions) {
    if (bodyStyle[transition] !== undefined) {
      return transitions[transition];
    }
  }
}

var _default = Loader;
exports.default = _default;
},{"../img/loader_black.gif":"hBAB"}],"FVPG":[function(require,module,exports) {
"use strict";

var _loader = _interopRequireDefault(require("./loader"));

var _loader_black = _interopRequireDefault(require("../img/loader_black.gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ldr = new _loader.default({
  image: _loader_black.default
});
document.querySelector('#show3').addEventListener('click', function (e) {
  e.preventDefault();
  ldr.show({
    after: function after() {
      window.setTimeout(function () {
        ldr.hide({
          after: function after() {
            alert('loading finished');
          }
        });
      }, 3000);
    }
  });
});
document.querySelector("#showPre").addEventListener("click", function (e) {
  e.preventDefault();
  ldr.show({
    elements: document.querySelectorAll("pre"),
    after: function after() {
      window.setTimeout(function () {
        ldr.hide({
          after: function after() {
            alert("loading finished");
          }
        });
      }, 3000);
    }
  });
});
},{"./loader":"B7ub","../img/loader_black.gif":"hBAB"}]},{},["FVPG"], null)
//# sourceMappingURL=main.c1fe1e58.js.map