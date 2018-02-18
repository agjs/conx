'use strict';

const { ERROR_THEME, SUCCESS_THEME, WARNING_THEME, DEFAULT_COLORS } = require('../src/constants');

/**
 * Exposing the conx class with its methods
 *
 * @param {objet} config - conx optionally takes three parameters, enabled, classes and theme
 */
function Conx(group, config = {}) {
  !localStorage.getItem('conx-groups')
    ? localStorage.setItem('conx-groups', JSON.stringify([]))
    : null;

  this.enabled = JSON.parse(localStorage.getItem('conx'));
  this.groups = JSON.parse(localStorage.getItem('conx-groups'));
  this.group = group;

  if (this.groups.indexOf(group) === -1) {
    this.enabled = false;
  }

  this.classes = config.classes;
  this.colors = DEFAULT_COLORS;
  this.theme = config.theme ||
    this.readCSSStyles() || {
      error: ERROR_THEME,
      success: SUCCESS_THEME,
      warn: WARNING_THEME,
    };
}

Conx.prototype = {
  /**
   * @description This method will iterate over the CSS files and look for provided CSS classes used for styling the logger.
   * @returns colors || false
   */
  toggle(group) {
    let groups = this.groups;
    const index = groups.indexOf(group);
    index === -1 ? groups.push(group) : groups.splice(index, 1);
    localStorage.setItem('conx-groups', JSON.stringify(groups));
  },
  readCSSStyles() {
    const errorClass = this.classes && this.classes.error ? this.classes.error : '.conx__error';
    const successClass =
      this.classes && this.classes.success ? this.classes.success : '.conx__success';
    const warnClass = this.classes && this.classes.warn ? this.classes.warn : '.conx__warn';
    if (document && document.styleSheets) {
      const colors = {};
      for (const element in document.styleSheets) {
        const stylesheet = document.styleSheets[element];
        if (stylesheet.cssRules) {
          for (const rule in stylesheet.cssRules) {
            const css = stylesheet.cssRules[rule].cssText;
            if (css) {
              if (css.indexOf(errorClass) >= 0) {
                colors.error = css.match(/{(.*?)}/)[1];
              }
              if (css.indexOf(successClass) >= 0) {
                colors.success = css.match(/{(.*?)}/)[1];
              }
              if (css.indexOf(warnClass) >= 0) {
                colors.warn = css.match(/{(.*?)}/)[1];
              }
            }
          }
        }
      }
      return Object.keys(colors).length !== 0 ? colors : '';
    }
    return false;
  },
  colorGenerator() {
    return '#' + (((1 << 24) * Math.random()) | 0).toString(16);
  },
  error(message) {
    if (this.enabled && this.validate(message)) {
      const err = new Error(message);
      console.error(`%c🔥  ${err.message}`, this.theme.error);
    }
  },
  sentry() {
    // TODO: sentry like behavior, create heroku instance etc.
    window.onerror = (message, url, lineNumber) => {
      console.log(`%cError in ${url} on line ${lineNumber} 🔥 ${message} 🔥`, this.theme.error);
      return true;
    };
  },
  validate(input) {
    if (input) return true;
    this.error('😭 Your logs should be explanatory, not empty.');
  },
  success(message) {
    if (this.enabled && this.validate(message)) {
      console.info(`%c ¯\_(ツ)_/¯ ${message}`, this.theme.success);
    }
  },
  warn(message) {
    if (this.enabled && this.validate(message)) {
      console.warn(`%c ⚠ ${message}`, this.theme.warn);
    }
  },
  rainbow(message) {
    if (this.enabled && this.validate(message)) {
      let styles = [];
      let string = '';
      message.split('').map(word => {
        styles.push(
          `color: ${this.colorGenerator()}; font-size: ${Math.floor(Math.random() * 50) + 14}px;`
        );
        string += `%c ${word}`;
      });
      console.log(string, ...styles);
    }
  },
  trace(title, callback, ...args) {
    if (this.enabled && this.validate(title) && typeof callback === 'function') {
      let string = '';
      if (callback.name) {
        string = `Function ${callback.name} finished in`;
      } else {
        string = 'Anonymous function finished in';
      }
      console.groupCollapsed(`${callback.name ? `${callback.name}()` : 'Anonymous function()'}`);
      console.time(string);
      callback(args);
      console.timeEnd(string);
      console.log('Function callstack:');
      console.log(
        new Error().stack
          .split('\n')
          .reverse()
          .slice(0, -2)
          .reverse()
          .join('\n')
      );
      console.groupEnd(`${callback.name ? `${callback.name}()` : 'Anonymous function()'}`);
    }
  },
  JSONViewer(data) {
    if (this.enabled && JSON.parse(JSON.stringify(data)).constructor === Object) {
      const form = new FormData();
      const xhttp = new XMLHttpRequest();
      const random = Math.random()
        .toString(36)
        .substr(2, 5);

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          window.open(`https://codebeautify.org/jsonviewer/${this.responseText}`);
        } else {
          // TODO: detect user browser and send them to proper browser extention url for enabling CORS
        }
      };

      form.append('title', random);
      form.append('content', JSON.stringify(data));
      form.append('viewname', 'jsonviewer');
      xhttp.open('POST', 'https://codebeautify.org/service/save', true);

      xhttp.send(form);
    }
  },
  table(arg) {
    if (this.enabled && this.validate(arg)) {
      let table = [];
      const flatten = object => {
        return Object.assign(
          {},
          ...(function _flatten(object, path = '') {
            return [].concat(
              ...Object.keys(object).map(key => {
                if (typeof object[key] === 'object') {
                  return _flatten(object[key], `${path}.${key}`);
                } else {
                  return { [`${path}.${key}`]: object[key] };
                }
              })
            );
          })(object)
        );
      };
      if (Array.isArray(arg)) {
        for (const element of arg) {
          table.push(flatten(element));
        }
        console.table(table);
        console.groupCollapsed('JSON View');
        console.log(JSON.stringify(arg));
        console.groupEnd('JSON View');
      } else if (typeof arg === 'object') {
        console.table([flatten(arg, Object.keys(arg))]);
      } else {
        this.error('table method accepts an array or an object!');
      }
    }
  },
};

module.exports = Conx;
