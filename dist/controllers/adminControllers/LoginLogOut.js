'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutUser = exports.loginUser = exports.registerUser = undefined;

var _LoginLogOut = require('../../services/adminServices/LoginLogOut');

var _createErrors = require('../../utilities/createErrors');

var _validations = require('../../utilities/validations.js');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* -----------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @ description : This is the user controller layer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ----------------------------------------------------------------------- */

var registerUser = exports.registerUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, payload, context) {
    var registerResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!_validations2.default.password(payload.password)) {
              _context.next = 4;
              break;
            }

            throw new _createErrors.InvalidFields({
              data: {
                field: 'password',
                reason: _validations2.default.password(payload.password),
                statusCode: 400
              }
            });

          case 4:
            if (!(_validations2.default.isEmail(payload.email) == false)) {
              _context.next = 6;
              break;
            }

            throw new _createErrors.InvalidFields({
              data: {
                field: 'email',
                reason: 'Please enter a valid email',
                statusCode: 400
              }
            });

          case 6:
            _context.next = 8;
            return (0, _LoginLogOut.register)(payload);

          case 8:
            registerResult = _context.sent;

            if (!registerResult.checkEmail) {
              _context.next = 13;
              break;
            }

            throw new _createErrors.AlreadyRegistered({
              data: {
                reason: 'email exists',
                statusCode: 400
              }
            });

          case 13:
            return _context.abrupt('return', (0, _createErrors.CustomSuccessResponse)({
              message: 'User has been successfully registered.'
            }));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function registerUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var loginUser = exports.loginUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, payload, context) {
    var userData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _LoginLogOut.login)(payload);

          case 2:
            userData = _context2.sent;

            if (!userData) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', userData);

          case 7:
            throw new _createErrors.AuthenticationError({
              data: {
                reason: 'Invalid Credentials.',
                statusCode: 400
              }
            });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function loginUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var logoutUser = exports.logoutUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root, payload, context) {
    var userId, token;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!context.auth.isAuthenticated) {
              _context3.next = 7;
              break;
            }

            userId = context.auth.credentials.userId, token = context.auth.credentials.token;
            _context3.next = 4;
            return (0, _LoginLogOut.logout)({ userId: userId, token: token });

          case 4:
            return _context3.abrupt('return', (0, _createErrors.CustomSuccessResponse)({ message: 'User has been logged out successfully.' }));

          case 7:
            throw new _createErrors.AuthenticationError({
              data: {
                reason: context.auth.message,
                statusCode: 401
              }
            });

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function logoutUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();