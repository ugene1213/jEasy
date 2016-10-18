const DOMNodeCollection = require('./dom_node_collection.js') ;

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

  return new DomNodeCollection(arrayify);
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
