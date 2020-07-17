'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.register = undefined;

var _Admin = require('../../collections/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _universal = require('../../utilities/universal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @function to register a new user as admin.
 */
var register = exports.register = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var checMail, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload.password = (0, _universal.encryptpassword)(payload.password);
            _context.next = 3;
            return _Admin2.default.checkEmail(payload.email);

          case 3:
            checMail = _context.sent;

            if (!checMail) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', {
              checkEmail: true
            });

          case 6:
            _context.next = 8;
            return _Admin2.default.insertData(payload);

          case 8:
            data = _context.sent;
            return _context.abrupt('return', data);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @function to login in adim panel
 */
var login = exports.login = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
    var userData, loginToken, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userData = void 0;
            // check for auto login

            _context2.next = 3;
            return _Admin2.default.login(payload.username, (0, _universal.encryptpassword)(payload.password));

          case 3:
            userData = _context2.sent;

            if (userData) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', false);

          case 6:
            // generate login token
            loginToken = (0, _universal.generateToken)({
              when: (0, _universal.getTimeStamp)(),
              lastLogin: userData.lastLogin,
              userId: userData._id
            });
            _context2.next = 9;
            return _Admin2.default.onLoginDone(userData._id, payload, loginToken);

          case 9:
            data = _context2.sent;

            data.userId = data._id;
            data.loginToken = loginToken;
            return _context2.abrupt('return', data);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * @function to logout from applciation
 */
var logout = exports.logout = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(payload) {
    var update;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Admin2.default.updateData({ _id: payload.userId }, {
              $set: {
                updatedAt: (0, _universal.getTimeStamp)()
              },
              $pull: {
                auth: { token: payload.token }
              }
            });

          case 2:
            update = _context3.sent;

            if (update) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', false);

          case 5:
            return _context3.abrupt('return', update);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function logout(_x3) {
    return _ref3.apply(this, arguments);
  };
}();