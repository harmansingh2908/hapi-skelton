'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* ------------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * @ description : Here we are creating the privacy page plugin.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ------------------------------------------------------------------------------------------------- */


// import StaticContent from '../collections/StaticContent';
var _config$get = _config2.default.get('smtp'),
    invoicePath = _config$get.invoicePath;

exports.default = {
  name: 'FAQs',
  version: '1.0.0',
  register: function register(server, options) {
    server.route({
      path: '/faqs',
      method: 'GET',
      handler: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, h) {
          var templatepath, mainTemp, template, replacements, cond;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  templatepath = _path2.default.join(__dirname, invoicePath + 'FAQs.html');
                  mainTemp = _fs2.default.readFileSync(_path2.default.resolve('' + templatepath), 'UTF-8');
                  template = _handlebars2.default.compile(mainTemp);
                  replacements = {};

                  // Find FAQs content and show result.

                  cond = {
                    type: 'faqs'
                  };
                  // let result = await StaticContent.findRecordByCondition(cond);
                  // if (result) {
                  //   replacements = {
                  //     ...replacements,
                  //     content: result.content
                  //   };
                  // }

                  return _context.abrupt('return', template(replacements));

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        function handler(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return handler;
      }()
    });
  }
};