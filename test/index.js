const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const assert = require('assert');
const expect = chai.expect;

chai.use(sinonChai);

var conx = require('../src/logger');
window.logger = new conx({});

describe('logging', function() {
  it('should log to console', function() {
    const spy = sinon.spy(console, 'log');
    log('aleksandar');
    assert(spy.calledWith('aleksandar'));
    spy.restore();
  });
});
