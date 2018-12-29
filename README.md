![conx](src/assets/logo.png)

**conx** aka consoleX is an elegant extension to native Javascript [console
API](https://developer.mozilla.org/en/docs/Web/API/console) which allows you to decorate your
consoles and adept them to your project style. **conx** provides group logging similar to
[debug](https://www.npmjs.com/package/debug) which allows you to see only specific logs instead of
logging all of them at the same time.

**conx** is tiny, zero dependencies module.

Compared to extremly popular module [colors](https://www.npmjs.com/package/colors), **conx** allows
you to fully customize your output by using your own CSS.

Besides customization, **conx** comes with various custom methods that will make your usage of
Console feel better than ever.

# Motivation

If you are wondering why another console module, it's simple, improvements. **conx** uses all the
native browser functionality, empowering it further and filling in the gaps. Regardless of the
built-in browser debugger, most developers are still using Console as the main tool for debugging
and figuring out the data. **conx** brings visibility improvements as well as several extremely
useful methods for working with JSON-like data. Lastly, if you are a creative individual, you will
love your new shiny Console view.

# Installation

npm install conx --save

# Usage

```javascript
window.logger = require('conx')('groupName', { options });

logger.error('An error occurred..');
logger.success('Yay, everything is awesome..');
logger.warn('Be warned..');
```

**conx** is disabled by default. To enable it, do the following your in your Console:

```javascript
logger.toggle();
```

You can disable it in the same fashion.

Since we want to persist our state so **conx** knows what to log and what not, we are storing in in
the localStorage.

---

## Group Name

**conx** uses a concept of grouping consoles from different instances.

```javascript
// file 1: app.js
const logger = require('conx')('application');
logger.success('Yay!');

// file 2: server.js
const logger = require('conx')('server');
logger2.warn('Beware champion!');
```

When you start using the **conx** methods, you will notice that nothing shows up in the console.
That's because you have to toggle them before they show up. If we want our application logs to be
shown, we simply toggle them:

```javascript
logger.toggleGroup('groupName');
```

Calling the same methods will toggle them off.

This functionality allows you to group your messages by type and toggle them on and off when needed.
Essentially, this enables us to focus on the logs we really care about.

## Options

**conx** constructor takes two parameters, a name of the group and optionally, an options object.

```javascript
{
    theme: {},
    classes: {}
}
```

##### theme

theme option allows you to set your **conx** theme by passing the CSS directly into the options
literal. This key has the highest precedence which means that if you pass both, theme and classes
properties, theme values will be applied. This is for the sake of performances and **recommended**
way of using CSS. The reason is, **this.readCSSStyles** method will have to iterate through your
entire CSS file or files, looking for the provided classes.

```javascript
{
    error: "color: #ffffff; background: red;",
    warn: "...",
    success: "..."
}
```

---

##### classes

classes option accepts class names as values where **conx** will iterate over your CSS files and
grab values from there. This can be super handy if you want to use your SASS/LESS default layout to
style your logs. This is **not the recommended** way of using CSS with **conx**.

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

Most methods are self-explanatory and they don't differ from original naming conventions from native
console API so if you have used them before, you will have an easy time using them with conx.

### .error(String | Number)

### .warn(String | Number)

### .success(String | Number)

### .table(Array | Object)

### .rainbow(String)

## Examples

#### Example with default properties

```javascript
window.log = new conx('group-name');
log.success('Everything is awesome!');
```

#### Example with theme property

```javascript
window.log = new conx('group-name', {
  theme: {
    error: 'color: #fff; background-color: red;',
    success: 'color: #fff; background-color: green;',
    warn: 'color: #444; background-color: yellow;',
  },
});

log.error('The dark side.');
```

#### Example with classes property

```javascript
window.conx = new conx('group-name', {
  classes: {
    error: '.errorClass from your CSS file',
    success: '...',
    warn: '...',
  },
});
```

## Demo

- clone the repository
- npm install
- npm run demo
- open http://localhost:8080/demo/index.html
- open the console and enjoy conx :-)

# License

(The MIT License)

Copyright (c) 2017 Aleksandar Grbic <mailto:hi@aleksandar.xyz>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the 'Software'), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
