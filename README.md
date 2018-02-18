![conx](src/assets/logo.png)

**conx** is an elegant extension to native Javascript [console API](https://developer.mozilla.org/en/docs/Web/API/console) which allows you to decorate your consoles and adept them to your project style. **conx** provides group logging similar to [debug](https://www.npmjs.com/package/debug) which allows you to see only specific logs instead of logging all of them at the same time.

**conx** is tiny, zero dependencies module.

Compared to extremly popular module [colors](https://www.npmjs.com/package/colors), **conx** allows you to fully customize your output by using your own CSS.

Besides customization, **conx** comes with various custom methods that will make your usage of Console feel better than ever.

# Installation

[![Greenkeeper badge](https://badges.greenkeeper.io/agjs/conx.svg)](https://greenkeeper.io/)

npm install conx --save

# Usage

```javascript
window.logger = require('conx')({ options });

logger.error('An error occurred..');
logger.success('Yay, everything is awesome..');
logger.warn('Be warned..');
```

If you are not using webpack or browserify, you can include conx as a script in your HTML file

```html
    <script src="./node_modules/conx/dist/conx.min.js">
```

![conx](screenshot.png)

## Options

**conx** is enabled by default but you must manually toggle specific groups that you want to see under your Console window.

```javascript
{
    enabled: Boolean,
    theme: {},
    classes: {}
}
```

##### enabled

conx is disabled by default. You can enable it by either setting { enabled : true } in the options literal or by using localStorage. This is more convenient way since it gives you ability to switch logs on and off faster. You can set it in localStorage by typing this in your console:

```javascript
localStorage.set('conx', true);
// or
localStorage.conx = true;
```

You can disable it in the same fashion.

---

##### theme

theme option allows you to set your conx theme by passing the CSS directly into the options literal. This key has the highest precedence which means that if you pass both, theme and classes properties, theme values will be applied.

```javascript
{
    error: "color: #ffffff; background: red;",
    warn: "...",
    success: "..."
}
```

---

##### classes

classes option accepts class names as values where logger will iterate over your CSS files and grab values from there. This can be super handy if you want to use your SASS/LESS default layout to style your logs.

Your CSS file

```styleshees
.error_class {
    color: #ffffff;
    background: red;
}
.warn_class {...}
.success_class {...}
```

Logger instance

```javascript
{
    classes: {
        error: '.error_class',
        warn: '.warn_class'
        success: '.success_class'
    }
}
```

If none are passed (theme nor classes), conx will fallback to its default values

```javascript
{
   error: 'color: #ffffff; background-color: #f44283; padding: 10px;',
   success: 'color: #ffffff; background-color: #41f491; padding: 10px;',
   warn: 'color: #444; background-color: #d0d628; padding: 10px;'
}
```

---

## Methods

Most methods are self-explanatory and they don't differ from original naming conventions from native console API so if you have used them before, you will have an easy time using them with conx.

### .error(String | Number)

### .warn(String | Number)

### .success(String | Number)

### .log(String | Number)

### .table(Array | Object)

### .rainbow(String)

### .JSON(Array | Object)

## Examples

#### Example with default properties

```javascript
window.conx = new conx({
  enabled: true,
  // or in your console, localStorage.conx=true
});

conx.success('Everything is awesome!');
```

#### Example with theme property

```javascript
window.conx = new conx({
  enabled: true,
  // or in your console, localStorage.conx=true
  theme: {
    error: 'color: #fff; background-color: red;',
    success: 'color: #fff; background-color: green;',
    warn: 'color: #444; background-color: yellow;',
  },
});

conx.error('The dark side.');
```

#### Example with classes property

```javascript
window.conx = new conx({
  enabled: true,
  // or in your console, localStorage.conx=true
  classes: {
    error: '.errorClass from your CSS file',
    success: '...',
    warn: '...',
  },
});
```

# License

(The MIT License)

Copyright (c) 2017 Aleksandar Grbic <mailto:hi@aleksandar.xyz>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
