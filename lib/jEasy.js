/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1) ;

	let documentReady = false;
	const documentReadyCallbacks = [];

	const $l = function(arg) {

	  let arrayify = [];

	  if (typeof arg === "string") {
	    const allSelectors = document.querySelectorAll(arg);
	    arrayify = arrayify.concat(Array.from(allSelectors));
	  }
	  //How the hell would you even be able to test this?
	  else if (arg instanceof HTMLElement) {
	    arrayify.push(arg);
	  }

	  else if (typeof arg === 'function') {
	    saveDocReadyCallback(arg);
	  }

	  return new DOMNodeCollection(arrayify);
	};

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
	  options.method = options.method.toUpperCase();

	  if (args.method === "GET"){
	    args.url += "?" + toQueryString(args.data);
	  }

	  req.open(options.method, options.url, true);

	  req.onload = event => {
	    if (req.status === 200) {
	      args.success(req.response);
	    } else {
	      args.error(req.response);
	    }
	  }


	  req.send(JSON.stringify(options.data));

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


	const saveDocReadyCallback = function(callback) {
	  if (documentReady === false) {
	    documentReadyCallbacks.push();
	  } else {
	    callback();
	  }
	};


	document.addEventListener(DOMContentLoaded, () => {
	  documentReady = true;
	  documentReadyCallbacks.forEach(callback => callback());
	});
	window.$l = $l;


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(array) {
	    this.array = array;
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

	    return allTheParents;
	  }

	  find(selector) {
	    const matchingNodes = [];
	    this.each ( node => {
	      const matching = node.querySelectorAll(selector);
	      matchingNodes = matchingNodes.concat(Array.from(matching));
	    });

	    return new DOMNodeCollection(matchingNodes);
	  }

	  on(type, listener) {

	    this.forEach( node => {
	      const handlerKey = `jEasy key - ${type}`;
	      if (typeof node[handlerKey] === 'undefined') {
	        node[handlerKey] = [];
	      }

	      node[handlerKey].push(listener);
	    });
	  }

	  // come back to this later
	  off(type, listener) {

	    this.forEach(node => {
	      const handlerKey = `jEasy key - ${type}`;
	      node[handlerKey] = [];
	    });
	  }

	}






	// this.array.forEach( (el) => {
	//   if (el.children.length === 0) {
	//     return [];
	//   } else {
	//     const el.children + ;
	//
	//   }
	 // }
	// ul.append(collection)



	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);