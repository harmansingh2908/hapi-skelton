'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contact = undefined;

var _rest = require('../utilities/rest');

var _mail = require('../utilities/mail');

var Mail = _interopRequireWildcard(_mail);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @file: contact.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @description: Controller for contact.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @date: 11.May.2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @author: Manish Budhiraja
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * */

var contact = exports.contact = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, h) {
    var payload, sendStr, emailData, sendStrUser, emailDataUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = request.payload;
            _context.prev = 1;

            // Mail to customer.
            sendStr = Mail.formatHTML({
              fileName: 'contact.html',
              username: 'Admin',
              message: '' + payload.message.capitalizeFirstLetter()
            });
            emailData = {
              to: 'manish.budhraja@ignivasolutions.com',
              subject: 'Contact Email',
              html: sendStr
            };


            Mail.sendMail(emailData, function (err, res) {});

            // mail to user.
            sendStrUser = Mail.formatHTML({
              fileName: 'contact.html',
              username: payload.name,
              message: 'Your message has been sent to admin successfully. NextFoodies Team will contact you shortly. Thanks for your patience.'
            });
            emailDataUser = {
              to: payload.email,
              subject: 'Thanks for writing to us.',
              html: sendStrUser
            };


            Mail.sendMail(emailDataUser, function (err, res) {});
            return _context.abrupt('return', (0, _rest.successAction)(null, 'Success'));

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](1);

            (0, _rest.failAction)(_context.t0.message);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function contact(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();