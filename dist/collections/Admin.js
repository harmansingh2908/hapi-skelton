'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file: Admin.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @description: collection for Admin.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @date: 14.02.2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author: Sheenam Narula
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * */

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _universal = require('../utilities/universal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var AdminClass = function () {
  function AdminClass() {
    _classCallCheck(this, AdminClass);
  }

  _createClass(AdminClass, null, [{
    key: 'checkEmail',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.findOne({ email: email }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkEmail(_x) {
        return _ref.apply(this, arguments);
      }

      return checkEmail;
    }()
  }, {
    key: 'insertData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(Data) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', this(Data).save());

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function insertData(_x2) {
        return _ref2.apply(this, arguments);
      }

      return insertData;
    }()
  }, {
    key: 'checkToken',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this.findOne({
                  'auth.token': token
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkToken(_x3) {
        return _ref3.apply(this, arguments);
      }

      return checkToken;
    }()
  }, {
    key: 'findUserByCondition',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(condition) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', this.findOne(condition));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findUserByCondition(_x4) {
        return _ref4.apply(this, arguments);
      }

      return findUserByCondition;
    }()
  }, {
    key: 'findRecordsByCondition',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(condition) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', this.find(condition));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function findRecordsByCondition(_x5) {
        return _ref5.apply(this, arguments);
      }

      return findRecordsByCondition;
    }()
  }, {
    key: 'updateData',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(condition, query) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', this.findOneAndUpdate(condition, query, { new: true }));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateData(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return updateData;
    }()
  }, {
    key: 'login',
    value: function login(username, password) {
      return this.findOne({
        email: username,
        password: password
      });
    }
  }, {
    key: 'onLoginDone',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userId, payload, loginToken) {
        var updateData, condition, userData;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                updateData = {};
                condition = {};


                updateData = {
                  $push: {
                    auth: {
                      token: loginToken,
                      when: (0, _universal.getTimeStamp)()
                    }
                  },
                  $set: {
                    updatedAt: (0, _universal.getTimeStamp)()
                  }
                };
                condition = {
                  _id: userId
                };

                _context7.next = 6;
                return this.findOneAndUpdate(condition, updateData, { new: true });

              case 6:
                userData = _context7.sent;
                return _context7.abrupt('return', userData);

              case 8:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onLoginDone(_x8, _x9, _x10) {
        return _ref7.apply(this, arguments);
      }

      return onLoginDone;
    }()
  }]);

  return AdminClass;
}();

var AdminSchema = new Schema({
  fullName: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'admin'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    default: ''
  },
  auth: [{
    token: {
      type: String,
      default: ''
    },
    when: {
      type: Number,
      default: _universal.getTimeStamp
    }
  }],
  createdAt: {
    type: Number,
    default: _universal.getTimeStamp
  },
  updatedAt: {
    type: Number,
    default: _universal.getTimeStamp
  },
  resetPwdToken: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

AdminSchema.loadClass(AdminClass);

exports.default = _mongoose2.default.model('Admin', AdminSchema);