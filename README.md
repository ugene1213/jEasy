# jEasy

jEasy is a library that I implemented that supports basic DOM manipulation, ajax requests, and event handling.

## Using This Library

To use this library, clone this library into your local machine by running the following command:

```
git clone https://github.com/ugene1213/jEasy

```

Run webpack on your local machine in the console so that all necessary files are bundled (click [here](http://webpack.github.io/docs/installation.html) to download webpack)

Add the following script in the head of your HTML file:

```html
<src type="text/javascript" src="${Path to this file}/lib/jEasy.js">

```

##Features

The most essential aspect of this  this library is the `$l` function, which provides different utility depending on the type of the argument that is passed in. These arguments include:

1. HTML element - This will create an HTML element and wrap the element in a `JEasyQuery` object

```javascript
const $element = $l("<li>hello</li>");
```


2. CSS selector - This returns a JEasyQuery object that contains an array of all the HTML elements that match the provided selector:

```javascript
const $allElements = $l("li");
```

3. Function - This saves the function and runs when the DOM is ready:

```javascript
$l(() => console.log("The DOM has fully loaded!"););
```

##Useful Methods From the API

jEasy has many useful methods that supplement the core features described above. Some of these include:

1. addClass(newClass) - This adds a class to the specified DOM element. If the DOM object contains more than one
element, then each element will have the specified class added.

```javascript
let $elements = $l("li");
$elements.addClass("ingredients"); // <li class="ingredients">xxx</li>
```

2. children() - returns all the descendants of the DOM elements as a JEasyQuery object .

3. find(selector) - finds all appearances of the 'selector' element in the DOM elements.

For other methods, please consult the code in the docs.


##Making Ajax requests

JEasy's ajax method uses the XMLHttpRequest API to send and receive data from a server:
```javascript
   $l.ajax({
     url: "api.openweathermap.org/data/2.5/weather?zip=10001,us",
     method: "GET",
     success: (data) => { console.log(data); },
     error: (data) => { console.log("An error occurred."); }
   });
```

```javascript
   $l.ajax({
     url: "/gadgets",
     method: "POST",
     data: formData,
     dataType: "json",
     content-type: 'application/json',
     success: (data) => { console.log("It did work"); },
     error: (data) => { console.log("It didn't "); }
   });
```
