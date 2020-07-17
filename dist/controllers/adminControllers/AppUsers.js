'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardDetails = exports.blockUnblock = exports.allBusiness = exports.allConsumers = undefined;

var _AppUsers = require('../../services/adminServices/AppUsers');

var _createErrors = require('../../utilities/createErrors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file: AppUsers.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @description: Queries related to application users.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @date: 16.Feb.2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author: Manish budhiraja
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * */

/**
 * @function to fetch list of all consumers
 */

var allConsumers = exports.allConsumers = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, payload, context) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!context.auth.isAuthenticated) {
              _context.next = 10;
              break;
            }

            payload.userId = context.auth.credentials.userId;
            _context.next = 4;
            return (0, _AppUsers.appConsumers)(payload);

          case 4:
            users = _context.sent;

            if (!users.notAdmin) {
              _context.next = 7;
              break;
            }

            throw new _createErrors.AuthenticationError({
              data: {
                reason: 'Unauthorized access to admin rights.',
                statusCode: 401
              }
            });

          case 7:
            return _context.abrupt('return', users);

          case 10:
            throw new _createErrors.AuthenticationError({
              data: {
                reason: context.auth.message,
                statusCode: 401
              }
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function allConsumers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @function to fetch list of all business
 */

var allBusiness = exports.allBusiness = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, payload, context) {
    var users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!context.auth.isAuthenticated) {
              _context2.next = 10;
              break;
            }

            payload.userId = context.auth.credentials.userId;
            _context2.next = 4;
            return (0, _AppUsers.appBusiness)(payload);

          case 4:
            users = _context2.sent;

            if (!users.notAdmin) {
              _context2.next = 7;
              break;
            }

            throw new _createErrors.AuthenticationError({
              data: {
                reason: 'Unauthorized access to admin rights.',
                statusCode: 401
              }
            });

          case 7:
            return _context2.abrupt('return', users);

          case 10:
            throw new _createErrors.AuthenticationError({
              data: {
                reason: context.auth.message,
                statusCode: 401
              }
            });

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function allBusiness(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * @function to block unblock user from using the app features. Takes userId and status args
 */

var blockUnblock = exports.blockUnblock = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root, payload, context) {
    var user, _status;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!context.auth.isAuthenticated) {
              _context3.next = 17;
              break;
            }

            payload.adminId = context.auth.credentials.userId;
            _context3.next = 4;
            return (0, _AppUsers.blockUnblockUser)(payload);

          case 4:
            user = _context3.sent;

            if (!user.notAdmin) {
              _context3.next = 9;
              break;
            }

            throw new _createErrors.AuthenticationError({
              data: {
                reason: 'Unauthorized access to admin rights.',
                statusCode: 401
              }
            });

          case 9:
            if (!user) {
              _context3.next = 14;
              break;
            }

            _status = payload.status == 1 ? 'unblocked' : 'blocked';
            return _context3.abrupt('return', (0, _createErrors.CustomSuccessResponse)({
              message: 'User has been successfully ' + _status
            }));

          case 14:
            throw new _createErrors.validationErrors({
              data: {
                reason: 'Failed to change status to ' + status + ' of user, please try again.',
                statusCode: 400
              }
            });

          case 15:
            _context3.next = 18;
            break;

          case 17:
            throw new _createErrors.AuthenticationError({
              data: {
                reason: context.auth.message,
                statusCode: 401
              }
            });

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function blockUnblock(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * @function to get details of dashboard like total consumers, business, dishes, revenue etc.
 */

var dashboardDetails = exports.dashboardDetails = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, payload, context) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!context.auth.isAuthenticated) {
              _context4.next = 10;
              break;
            }

            payload.userId = context.auth.credentials.userId;
            _context4.next = 4;
            return (0, _AppUsers.dasboardRecordsCounts)(payload);

          case 4:
            result = _context4.sent;

            if (!result.notAdmin) {
              _context4.next = 7;
              break;
            }

            throw new _createErrors.AuthenticationError({
              data: {
                reason: 'Unauthorized access to admin rights.',
                statusCode: 401
              }
            });

          case 7:
            return _context4.abrupt('return', result);

          case 10:
            throw new _createErrors.AuthenticationError({
              data: {
                reason: context.auth.message,
                statusCode: 401
              }
            });

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function dashboardDetails(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();