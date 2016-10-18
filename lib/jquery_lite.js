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

	const DomNodeCollection = __webpack_require__(1) ;

	const $l = function(arg) {

	  let arrayify = [];

	  if (typeof arg === "string") {
	    const allSelectors = document.querySelectorAll(arg);
	    arrayify = arrayify.concat(Array.from(allSelectors));
	  }

	  if (arg instanceof HTMLElement) {
	    arrayify.push(arg);
	  }

	  return new DomNodeCollection(arrayify);
	};

	window.$l = $l;


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DomNodeCollection {
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
	    if (arg instanceof DomNodeCollection) {
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
	    return new DomNodeCollection(allTheChildren);
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

	}




	// this.array.forEach( (el) => {
	//   if (el.children.length === 0) {
	//     return [];
	//   } else {
	//     const el.children + ;
	//
	//   }
	// }
	// }
	// ul.append(collection)



	module.exports = DomNodeCollection;


/***/ }
/******/ ]);