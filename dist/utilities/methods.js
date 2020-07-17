'use strict';
/*
 * @file: methods.js
 * @description: Common Methods
 * @date: 07:02:2018
 * @author: Sheenam Narula
 * */

// Send Push Notification to device.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMultiNotifications = exports.generalMethod = exports.getUnAvailabileChefs = exports.getFavChefs = exports.locationBasedChef2 = exports.locationBasedChef = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _user = require('../collections/user');

var _user2 = _interopRequireDefault(_user);

var _Availability = require('../collections/Availability');

var _Availability2 = _interopRequireDefault(_Availability);

var _Notifications = require('../collections/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _SubscriptionMethods = require('./SubscriptionMethods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _config$get = _config2.default.get('fcm'),
    serverKey = _config$get.serverKey;

/* eslint-disable */


var sendFCM = function sendFCM(message) {
  var FCM = require('fcm-node');
  var fcm = new FCM(serverKey);
  message.notification.sound = 'default';
  message.notification.show_in_foreground = true;
  message.show_in_foreground = true;
  message.content_available = true;
  message.priority = 'high';
  message.notification.click_action = 'notifications.nextFoodie';
  fcm.send(message, function (err, messageId) {
    if (err) {
      _logger2.default.info('FCM error ===> ', err);
    } else {
      _logger2.default.info('FCM success ===> ', messageId);
    }
  });
};
exports.default = sendFCM;
/* eslint-enable */

// METHOD TO FIND CHEF ON LOC BASED
// type - trending or filtered or foodbank
//chefsArray - availability based

var locationBasedChef = exports.locationBasedChef = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(position, maxDistance, rating, chefsArray, type, limit, skip, availability, userId, deliveryOffered) {
    var match, chefs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            match = void 0;

            if (type == 'filteredChefs' && availability === 2) {
              // Not checking availability of chefs
              match = {
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'filteredChefs' && availability === 1) {
              // only availabile chefs
              match = {
                _id: {
                  $nin: chefsArray
                },
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'filteredChefs' && availability === 0) {
              // not availabile chefs
              match = {
                _id: {
                  $in: chefsArray
                },
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'filteredDishes') {
              match = {
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'trending') {
              match = {
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'foodBank' && availability === 2) {
              // Not checking availability of chefs
              match = {
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'isFBSubs.status': 'Accepted',
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'foodBank' && availability === 1) {
              // only availabile chefs
              match = {
                _id: {
                  $nin: chefsArray
                },
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'isFBSubs.status': 'Accepted',
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'foodBank' && availability === 0) {
              // not availabile chefs
              match = {
                _id: {
                  $in: chefsArray
                },
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'isFBSubs.status': 'Accepted',
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type === 'slugifiedChefs') {
              match = {
                _id: {
                  $in: chefsArray
                },
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            }

            if (deliveryOffered !== 2) {
              // Delivery Availablility Check 0-not, 1- yes, 2 - all
              match = _extends({}, match, {
                'business.isDeliveryAvailable': deliveryOffered ? true : false
              });
            }

            // have to remove this
            if (maxDistance !== 0) {
              maxDistance += 2;
            }

            _context.next = 6;
            return _user2.default.aggregate([{
              $geoNear: {
                near: [position.location[0], position.location[1]],
                maxDistance: maxDistance / 111 * 1.6, //maxDistance / 69,
                distanceField: 'distance'
                // sort: 'distance',
              }
            }, {
              $match: match
            }, {
              $sort: {
                'business.ratings.avgRatings': rating
              }
            },
            //{ $project: { _id : 1 } }
            {
              $skip: skip
            }, {
              $limit: limit
            }]);

          case 6:
            chefs = _context.sent;
            _context.next = 9;
            return getFavChefs(chefs, chefsArray, userId);

          case 9:
            return _context.abrupt('return', _context.sent);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function locationBasedChef(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref.apply(this, arguments);
  };
}();
// without limit and skip
var locationBasedChef2 = exports.locationBasedChef2 = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(position, maxDistance, rating, chefsArray, type, limit, skip, userId) {
    var match, chefs;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            match = void 0;

            if (type == 'filteredChefs') {
              match = {
                _id: {
                  $in: chefsArray
                },
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'filteredDishes') {
              match = {
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'trending') {
              match = {
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            } else if (type == 'foodBank') {
              match = {
                _id: {
                  $in: chefsArray
                },
                'business.type': 'Chef',
                isActive: 1,
                isDeleted: 0,
                'isFBSubs.status': 'Accepted',
                'phoneVerified.status': true,
                'business.status': 'Accepted',
                activeRole: 1

              };
            }

            // // have to remove this
            if (maxDistance !== 0) {
              maxDistance += 2;
            }

            _context2.next = 5;
            return _user2.default.aggregate([{
              $geoNear: {
                near: [position.location[0], position.location[1]],
                maxDistance: maxDistance / 111 * 1.6, //maxDistance / 69,
                distanceField: 'distance'
                // sort: 'distance',
              }
            }, {
              $match: match
            }, {
              $sort: {
                'business.ratings.avgRatings': rating
              }
            }]);

          case 5:
            chefs = _context2.sent;
            return _context2.abrupt('return', chefs);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function locationBasedChef2(_x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18) {
    return _ref2.apply(this, arguments);
  };
}();

var getFavChefs = exports.getFavChefs = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(chefs, chefsArray, userId) {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', Promise.all(chefs.map(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(chef) {
                var a, i, userDetails, chefDetails, isFollowed, index;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        a = [];

                        for (i = 0; i < chefsArray.length; i++) {
                          a.push(chefsArray[i].toString());
                        }
                        chefsArray = a;
                        chef.isAvailable = chefsArray.indexOf(chef._id.toString()) < 0 ? true : false;

                        chef.isFav = false;
                        chef.isFollowed = false;

                        if (!userId) {
                          _context3.next = 17;
                          break;
                        }

                        _context3.next = 9;
                        return _user2.default.findOne({ _id: userId });

                      case 9:
                        userDetails = _context3.sent;

                        if (!userDetails) {
                          _context3.next = 17;
                          break;
                        }

                        _context3.next = 13;
                        return _user2.default.findOne({ _id: chef._id });

                      case 13:
                        chefDetails = _context3.sent;

                        if (chefDetails) {
                          isFollowed = chefDetails.followers.indexOf(userId);

                          chef.isFollowed = isFollowed < 0 ? false : true;
                        }
                        index = _lodash2.default.findIndex(userDetails.favouriteList, { favId: chef._id.toString() });

                        chef.isFav = index < 0 ? false : true;

                      case 17:
                        return _context3.abrupt('return', chef);

                      case 18:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x22) {
                return _ref4.apply(this, arguments);
              };
            }())));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getFavChefs(_x19, _x20, _x21) {
    return _ref3.apply(this, arguments);
  };
}();

var getUnAvailabileChefs = exports.getUnAvailabileChefs = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var startDate, endDate, availabilityFilteredChefs;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            startDate = (0, _moment2.default)(new Date()).startOf('day').format('x'), endDate = (0, _moment2.default)(new Date()).endOf('day').format('x');
            _context5.next = 3;
            return _Availability2.default.findRecordsByConditionFields({
              status: 0,
              startDate: startDate,
              endDate: endDate
            }, {
              userId: 1
            });

          case 3:
            availabilityFilteredChefs = _context5.sent;
            return _context5.abrupt('return', availabilityFilteredChefs.map(function (chef) {
              return _mongoose2.default.Types.ObjectId(chef.userId);
            }));

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getUnAvailabileChefs() {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * @function to get user details.
 */
var generalMethod = exports.generalMethod = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(report) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', report.map(function (element) {
              _user2.default.findUserByCondition({ _id: element.reportedBy }).then(function (resolve) {
                element.userDetails = resolve;
              }).catch(function (err) {});
              return element;
            }));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function generalMethod(_x23) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * @function to send notifications to multiple users.
 */
var sendMultiNotifications = exports.sendMultiNotifications = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(payload) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            payload.receiversArray.forEach(function () {
              var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(receiver) {
                var receiverDetails, message, notificationData, publishedArray, count;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!(receiver !== '')) {
                          _context7.next = 16;
                          break;
                        }

                        _context7.next = 3;
                        return _user2.default.findUserByCondition({ _id: receiver });

                      case 3:
                        receiverDetails = _context7.sent;
                        message = {
                          to: receiverDetails.deviceInfo.token,
                          notification: {
                            title: payload.title ? payload.title : 'NextFoodie',
                            body: payload.body
                          },
                          data: {
                            action: payload.action,
                            type: payload.type,
                            activeRole: receiverDetails.activeRole
                          }
                        };

                        if (receiverDetails.notifications !== 0) {
                          sendFCM(message);
                        };

                        notificationData = {
                          senderId: payload.senderId,
                          receiverId: receiverDetails._id,
                          message: payload.body,
                          type: payload.type,
                          action: payload.action,
                          activeRole: receiverDetails.activeRole,
                          data: {
                            _id: payload.notificationDataId
                          }
                        };
                        _context7.next = 10;
                        return _Notifications2.default.insertData(notificationData);

                      case 10:
                        if (!_context7.sent) {
                          _context7.next = 16;
                          break;
                        }

                        publishedArray = [receiverDetails._id];
                        _context7.next = 14;
                        return _Notifications2.default.count({
                          receiverId: receiverDetails._id,
                          status: false
                        });

                      case 14:
                        count = _context7.sent;

                        if (count > 0) {
                          (0, _SubscriptionMethods.publishSubscriptionData)({ count: count, type: 'notification', publishedArray: publishedArray });
                        }

                      case 16:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              }));

              return function (_x25) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 1:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function sendMultiNotifications(_x24) {
    return _ref7.apply(this, arguments);
  };
}();