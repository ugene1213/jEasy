/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(obj) {
    this.array = Array.from(obj);
  }

  html() {
    if (arguments.length === 1) {
      this.array.forEach( (el) => {
        el.innerHTML = arguments[0];
      });
    } else {
      return this.array[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      for (var i = 0; i < this.array.length; i++) {
        for (var j = 0; j < arg.array.length; j++) {
          this.array[i].innerHTML += arg.array[j].outerHTML;
        }
      }
    } else if (typeof arg === 'string') {
      for (let j = 0; j < this.array.length; j++) {
        this.array[j].innerHTML += arg;
      }
    } else if (arg instanceof HTMLElement) {
      for (let j = 0; j < this.array.length; j++) {
        this.array[j].innerHTML += arg.outerHTML;
      }
    }
  }


  attr(attributeName) {
    return this.array[0].getAttribute(attributeName);
  }

  addClass(newClass) {
    this.array.forEach( (el) => el.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.array.forEach( (el) => el.classList.remove(oldClass));
  }

  children() {
    let allTheChildren = [];
    this.array.forEach( (el) => {
      const queue = [el];

      while (queue.length > 0) {

        const node = queue.shift();
        const children = Array.from(node.children);

        while (children.length > 0) {
          let child = children.pop();
          allTheChildren.push(child);
          queue.push(child);
        }
      }
    });
    return new DOMNodeCollection(allTheChildren);
  }

  parent(){
    const allTheParents = [];
    for (var i = 0; i < this.array.length; i++) {
      let currentEl = this.array[i];
      while (currentEl.parentNode !== null) {
        allTheParents.push(currentEl.parentNode);
        currentEl = currentEl.parentNode;
      }
    }

    return new DOMNodeCollection(allTheParents);
  }

  find(selector) {
    let matchingNodes = [];
    this.array.forEach( node => {
      const matching = node.querySelectorAll(selector);
      matchingNodes = matchingNodes.concat(Array.from(matching));
    });

    return new DOMNodeCollection(matchingNodes);
  }

  on(type, listener) {

    this.array.forEach( node => {
      node.addEventListener(type, listener);
      const handlerKey = `jEasy key - ${type}`;
      if (typeof node[handlerKey] === 'undefined') {
        node[handlerKey] = [];
      }

      node[handlerKey].push(listener);
    });
  }

  off(type, listener) {

    this.array.forEach(node => {
      node.removeEventListener(type, listener);
      const handlerKey = `jEasy key - ${type}`;
      node[handlerKey] = [];
    });
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0) ;

let documentReady = false;
const documentReadyCallbacks = [];

const $l = function(arg) {

  let arrayify = [];

  if (typeof arg === "string") {
    const allSelectors = document.querySelectorAll(arg);
    arrayify = arrayify.concat(Array.from(allSelectors));
  }

  else if (arg instanceof HTMLElement) {
    arrayify.push(arg);
  }

  else if (typeof arg === 'function') {
    saveDocReadyCallback(arg);
  }

  return new DOMNodeCollection(arrayify);
};

$l.extend = (obj, ...otherObjects) => {
  otherObjects.forEach(otherObject => {
    let keys = Object.keys(otherObject);
    keys.forEach((key) => {
      obj[key] = otherObject[key];
    });
  });
  return obj;
}

$l.ajax = args => {
  const req = new XMLHttpRequest();
  const defaults = {
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {}
  };


  args = $l.extend(defaults, args);
  args.method = args.method.toUpperCase();

  if (args.method === "GET"){
    args.url += "?" + makeQueryString(args.data);
  }

  req.open(args.method, args.url, true);

  req.onload = event => {
    if (req.status === 200) {
      args.success(req.response);
    } else {
      args.error(req.response);
    }
  }


  req.send(JSON.stringify(args.data));

};


const makeQueryString = (obj) => {
  let query = "";

  for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        result += property + "=" + obj[property] + "&";
      }
  }

  return query.substring(0,query.length - 1);
};


const ReadyCallback = function(callback) {
  if (documentReady === false) {
    documentReadyCallbacks.push(callback);
  } else {
    callback();
  }
};


document.addEventListener("DOMContentLoaded", () => {
  documentReady = true;
  documentReadyCallbacks.forEach(callback => callback());
});

window.$l = $l;


/***/ })
/******/ ]);
//# sourceMappingURL=jEasy.js.map