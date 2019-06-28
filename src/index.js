'use strict';
import { ERROR_THEME, SUCCESS_THEME, WARNING_THEME, DEFAULT_COLORS } from '../src/constants';

export default class Conx {
  constructor(group, config = {}) {
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
      this._readCSSStyles() || {
        error: ERROR_THEME,
        success: SUCCESS_THEME,
        warn: WARNING_THEME,
      };
    this.sentry();
  }

  toggle() {
    const isEnabled = localStorage.getItem('conx');
    if (isEnabled) {
      localStorage.removeItem('conx');
    } else {
      localStorage.setItem('conx', true);
    }
  }

  toggleGroup(group) {
    let groups = this.groups;
    const index = groups.indexOf(group);
    index === -1 ? groups.push(group) : groups.splice(index, 1);
    localStorage.setItem('conx-groups', JSON.stringify(groups));
  }

  error(message) {
    if (this._isValid(message)) {
      const err = new Error(message);
      console.error(`%c🔥  ${err.message}`, this.theme.error);
    }
  }

  sentry() {
    window.onerror = (message, url, lineNumber) => {
      console.error(`%cError in ${url} on line ${lineNumber} 🔥 ${message} 🔥`, this.theme.error);
      return true;
    };
  }

  success(message) {
    if (this._isValid(message)) {
      console.info(`%c ¯\_(ツ)_/¯ ${message}`, this.theme.success);
    }
  }

  warn(message) {
    if (this._isValid(message)) {
      console.warn(`%c ⚠ ${message}`, this.theme.warn);
    }
  }

  rainbow(message) {
    if (this._isValid(message)) {
      let styles = [];
      let string = '';
      message.split('').map(word => {
        styles.push(
          `color: ${this._colorGenerator()}; font-size: ${Math.floor(Math.random() * 50) + 14}px;`
        );
        string += `%c ${word}`;
      });
      console.log(string, ...styles);
    }
  }

  /**
   * Compared to the native table, conx table flattens and shows nested objects too. In addition to
   * that, conx table also handles circular references as well.
   *
   * @param {*} An object | array
   * @memberof Conx
   */
  table(arg) {
    if (this._isValid(arg)) {
      let table = [];
      if (Array.isArray(arg)) {
        for (const element of arg) {
          table.push(this._flatten(element));
        }
        console.table(table);
      } else if (typeof arg === 'object') {
        console.table([this._flatten(JSON.parse(this._circular(arg)), Object.keys(arg))]);
      } else {
        this.error('table method accepts an array or an object!');
      }
    }
  }

  _readCSSStyles() {
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
  }

  _isValid(arg) {
    return this.enabled && this._validate(arg);
  }

  _validate(input) {
    if (input) return true;
    this.error('😭 Your logs should be explanatory, not empty.');
  }

  _colorGenerator() {
    return '#' + (((1 << 24) * Math.random()) | 0).toString(16);
  }

  _flatten(object) {
    return Object.assign(
      {},
      ...(function flatten(object, path = '') {
        return [].concat(
          ...Object.keys(object).map(key => {
            if (typeof object[key] === 'object') {
              return flatten(object[key], `${path}.${key}`);
            } else {
              return { [`${path}.${key}`]: object[key] };
            }
          })
        );
      })(object)
    );
  }

  _circular(object) {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (_, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    return JSON.stringify(object, getCircularReplacer());
  }
}
