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
