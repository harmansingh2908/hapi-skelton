'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.failActionJoi = exports.failAction = exports.successAction = undefined;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Admin = require('../collections/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* -----------------------------------------------------------------------
   * @ description : Here defines all rest functions.
----------------------------------------------------------------------- */

var _config$get = _config2.default.get('app'),
    jwtKey = _config$get.jwtKey;

var successAction = exports.successAction = function successAction(data) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'OK';
  return {
    statusCode: 200,
    message: message,
    data: data ? data : undefined // eslint-disable-line
  };
};

var failAction = exports.failAction = function failAction(errorMessage) {
  throw _boom2.default.badRequest(errorMessage);
};

var failActionJoi = exports.failActionJoi = function failActionJoi(request, h, error) {
  var errorMessage = '';
  if (error.output.payload.message.indexOf('[') > -1) {
    errorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
  } else {
    errorMessage = error.output.payload.message;
  }
  errorMessage = errorMessage.replace(/"/g, '');
  errorMessage = errorMessage.replace('[', '');
  errorMessage = errorMessage.replace(']', '');
  error.output.payload.message = errorMessage;
  delete error.output.payload.validation;
  throw _boom2.default.badRequest(errorMessage);
};