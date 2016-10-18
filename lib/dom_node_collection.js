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
