'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _good = require('good');

var _good2 = _interopRequireDefault(_good);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _public = require('./public');

var _public2 = _interopRequireDefault(_public);

var _faqs = require('./faqs');

var _faqs2 = _interopRequireDefault(_faqs);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _config2.default.get('app');

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */

// import Auth from './auth';
/* ----------------------------------------------------------------------
   * @ description : Here config all hapi plugIns and custom plugIns.
----------------------------------------------------------------------- */

exports.default = [
/* -----------------------
      Register inert
    ------------------------ */
{
  plugin: _inert2.default,
  options: {}
},

/* -----------------------
      Register vision
    ------------------------ */
{
  plugin: _vision2.default,
  options: {}
},

/* ------------------
      Register good
    ------------------ */

{
  plugin: _good2.default,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: "Squeeze",
        args: [{
          log: '*',
          response: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
},

/* ---------------------------
      Setting up the jwt auth.
    ---------------------------- 
{
  plugin: Auth,
  options: {},
},
*/
/* ---------------------------
      Restfull Api's.
    ---------------------------- */
{
  plugin: _rest2.default,
  options: {}
},

/* ---------------------------
      Init the public route.
    ---------------------------- */
{
  plugin: _public2.default,
  options: {}
}, {
  plugin: _faqs2.default,
  options: {}
}];