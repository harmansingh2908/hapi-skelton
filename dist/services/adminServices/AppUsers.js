'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dasboardRecordsCounts = exports.blockUnblockUser = exports.appConsumers = exports.appBusiness = undefined;

var _user = require('../../collections/user');

var _user2 = _interopRequireDefault(_user);

var _mail = require('../../utilities/mail');

var Mail = _interopRequireWildcard(_mail);

var _methods = require('../../utilities/methods');

var _methods2 = _interopRequireDefault(_methods);

var _Notifications = require('../../collections/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _universal = require('../../utilities/universal');

var _Dishes = require('../../collections/Dishes');

var _Dishes2 = _interopRequireDefault(_Dishes);

var _Admin = require('../../collections/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _FoodSubscriptions = require('../../collections/FoodSubscriptions');

var _FoodSubscriptions2 = _interopRequireDefault(_FoodSubscriptions);

var _SubscriptionMethods = require('../../utilities/SubscriptionMethods');

var _Orders = require('../../collections/Orders');

var _Orders2 = _interopRequireDefault(_Orders);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file: AppUsers.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @description: Services related to app users.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @date: 09.02.2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author: Manish Budhiraja
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * */

/**
 * @function to fetch list of all business
 */

var appBusiness = exports.appBusiness = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var isAdmin, query;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Admin2.default.findUserByCondition({
              _id: payload.userId
            });

          case 2:
            isAdmin = _context.sent;

            if (isAdmin) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', {
              notAdmin: true
            });

          case 5:
            query = {
              isDeleted: false,
              $or: [{ 'business.type': 'Chef' }, { 'business.type': 'Driver' }, { 'business.type': 'Dietician' }]
            };
            _context.next = 8;
            return _user2.default.find(query).sort({
              'business.createdAt': -1
            });

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function appBusiness(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @function to fetch list of all consumers
 */

var appConsumers = exports.appConsumers = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
    var isAdmin, query;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Admin2.default.findUserByCondition({
              _id: payload.userId
            });

          case 2:
            isAdmin = _context2.sent;

            if (isAdmin) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', {
              notAdmin: true
            });

          case 5:
            query = { 'business.type': '', isDeleted: false };
            _context2.next = 8;
            return _user2.default.findUsers(query);

          case 8:
            return _context2.abrupt('return', _context2.sent);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function appConsumers(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * @function to udpate User collection based on action performed by admin.
 */

var blockUnblockUser = exports.blockUnblockUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(payload) {
    var isAdmin, condition, query, user, suspendedMessage, sendStr, emailData, message, title, notificationData, notificationSuccess, count, publishedArray;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Admin2.default.findUserByCondition({
              _id: payload.adminId
            });

          case 2:
            isAdmin = _context3.sent;

            if (isAdmin) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', {
              notAdmin: true
            });

          case 5:
            condition = {
              _id: payload.userId
            };
            query = {
              isActive: payload.status,
              updatedAt: (0, _universal.getTimeStamp)()
            };
            _context3.next = 9;
            return _user2.default.updateData(condition, query);

          case 9:
            user = _context3.sent;

            if (!user) {
              _context3.next = 31;
              break;
            }

            suspendedMessage = 'Your account has been suspended due to violating our terms & conditions.\nPlease contact us at nextfoodie@support.com';


            if (payload.status === 1) {
              suspendedMessage = 'Your account has been activated';
            }

            sendStr = Mail.formatHTML({
              fileName: 'accountSuspened.html',
              username: user.firstName,
              message: suspendedMessage
            });
            emailData = {
              to: user.email,
              subject: payload.status === 0 ? Mail.subjects.accountSuspended : Mail.subjects.accountActivated,
              html: sendStr
            };


            Mail.sendMail(emailData, function (err, res) {});

            message = {}, title = payload.status == 0 ? 'suspened' : 'activated';

            message.to = user.deviceInfo.token;
            message.notification = {
              title: 'Account ' + title,
              body: suspendedMessage
            };
            message.data = {
              type: 1,
              activeRole: 0
            };
            if (user.notifications !== 0 && user.deviceInfo.token !== '') {
              (0, _methods2.default)(message);
            }

            notificationData = {
              senderId: 'Admin',
              receiverId: user._id,
              message: 'Your account has been ' + title + '.',
              type: 1, // sent by admin
              action: 'accountSuspened',
              activeRole: 0
            };
            _context3.next = 24;
            return _Notifications2.default.insertData(notificationData);

          case 24:
            notificationSuccess = _context3.sent;

            if (!notificationSuccess) {
              _context3.next = 31;
              break;
            }

            _context3.next = 28;
            return _Notifications2.default.count({
              receiverId: user._id,
              status: false
            });

          case 28:
            count = _context3.sent;
            publishedArray = [user._id];

            if (count > 0) {
              (0, _SubscriptionMethods.publishSubscriptionData)({ count: count, type: 'notification', publishedArray: publishedArray });
            }

          case 31:
            ;
            return _context3.abrupt('return', user);

          case 33:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function blockUnblockUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * @function to get details of dashboard like total consumers, business, dishes, revenue etc.
 */

var dasboardRecordsCounts = exports.dasboardRecordsCounts = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(payload) {
    var isAdmin, query, pendingBusinessQuery, approvedBusinees, revenueQuery, consumers, business, pendingBusiness, totalDishes, totalSubs, totalOrders, totalDisputes, totalRevenue;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Admin2.default.findUserByCondition({
              _id: payload.userId
            });

          case 2:
            isAdmin = _context4.sent;

            if (isAdmin) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', {
              notAdmin: true
            });

          case 5:
            query = { 'business.type': '', isDeleted: false };
            pendingBusinessQuery = {
              isDeleted: false,
              'business.status': 'Pending'
            };
            approvedBusinees = {
              isDeleted: false,
              'business.status': 'Accepted'
            };
            revenueQuery = {
              status: { $in: ['Delivered', 'Reported', 'Resolved'] }
            };
            _context4.next = 11;
            return _user2.default.getCount(query);

          case 11:
            consumers = _context4.sent;
            _context4.next = 14;
            return _user2.default.getCount(approvedBusinees);

          case 14:
            business = _context4.sent;
            _context4.next = 17;
            return _user2.default.getCount(pendingBusinessQuery);

          case 17:
            pendingBusiness = _context4.sent;
            _context4.next = 20;
            return _Dishes2.default.getCount({ isDeleted: false });

          case 20:
            totalDishes = _context4.sent;
            _context4.next = 23;
            return _FoodSubscriptions2.default.getCount({ isDeleted: false });

          case 23:
            totalSubs = _context4.sent;
            _context4.next = 26;
            return _Orders2.default.getCount({});

          case 26:
            totalOrders = _context4.sent;
            _context4.next = 29;
            return _Orders2.default.getCount({
              status: { $in: ['Reported'] }
            });

          case 29:
            totalDisputes = _context4.sent;
            _context4.next = 32;
            return _Orders2.default.calculateTotalRevenue(revenueQuery);

          case 32:
            totalRevenue = _context4.sent;
            return _context4.abrupt('return', {
              totalConsumers: consumers,
              totalBusiness: business,
              totalDishes: totalDishes,
              totalBusinessApprovalsPending: pendingBusiness,
              totalDisputes: totalDisputes,
              totalRevenue: totalRevenue,
              totalOrders: totalOrders,
              totalSubscriptions: totalSubs
            });

          case 34:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function dasboardRecordsCounts(_x4) {
    return _ref4.apply(this, arguments);
  };
}();