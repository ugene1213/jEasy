const DOMNodeCollection = require('./dom_node_collection') ;

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
