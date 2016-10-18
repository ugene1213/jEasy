const DomNodeCollection = require('./dom_node_collection.js') ;

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
