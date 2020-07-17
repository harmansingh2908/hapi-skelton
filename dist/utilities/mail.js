'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = exports.formatHTML = exports.subjects = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config$get = _config2.default.get('smtp'),
    smtpUser = _config$get.smtpUser,
    smtpPass = _config$get.smtpPass,
    smtpPort = _config$get.smtpPort,
    smtpServer = _config$get.smtpServer,
    mailFrom = _config$get.mailFrom,
    templatePath = _config$get.templatePath; /* -----------------------------------------------------------------------
                                                * @ description : Here initialising nodemailer transport for sending mails.
                                             ----------------------------------------------------------------------- */

var _config$get2 = _config2.default.get('urls'),
    baseurl = _config$get2.baseurl,
    fburl = _config$get2.fburl,
    twitterurl = _config$get2.twitterurl,
    instaurl = _config$get2.instaurl;

var _config$get3 = _config2.default.get('images'),
    logo = _config$get3.logo,
    fb = _config$get3.fb,
    twitter = _config$get3.twitter,
    insta = _config$get3.insta;

var transporter = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
  host: smtpServer, // hostname
  port: smtpPort, // port for secure SMTP
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
}));

var subjects = exports.subjects = {
  userVerification: 'Verify Email',
  forgetPassword: 'Forget Password',
  dishVerification: 'Dish Verification',
  subsVerification: 'Subscription Verification',
  resetPassword: 'Reset Password',
  accountSuspended: 'Account Suspended',
  accountActivated: 'Account Activated',
  postRemoval: 'Log Post Removed',
  orderInvoice: 'Invoice - Order Number',
  businessStatus: 'Business Status'
};

var formatHTML = exports.formatHTML = function formatHTML(request) {
  var templatepath = _path2.default.join(__dirname, templatePath);

  var emailTemplate = _fs2.default.readFileSync(_path2.default.resolve('' + templatepath + request.fileName), 'UTF-8');

  /******** Replace dynamic values in email template. ********/
  var template = _handlebars2.default.compile(emailTemplate);
  var replacements = {
    link: '' + baseurl + request.link,
    username: request.username.capitalizeEachLetter(),
    message: request.message,
    reason: request.reason,
    logo: logo,
    url: baseurl,
    twitter: twitter,
    fb: fb,
    insta: insta,
    twitterurl: twitterurl,
    fburl: fburl,
    instaurl: instaurl
  };
  var htmlToSend = template(replacements);
  return htmlToSend;
};

var sendMail = exports.sendMail = function sendMail(request, cb) {
  var options = {
    from: mailFrom,
    to: request.to, // list of receivers
    subject: request.subject, // Subject line
    // text: '', // plaintext body
    html: request.html // html body
    // replyTo: ""
  };

  if (request.cc) {
    options.cc = request.cc;
  }
  if (request.replyTo) {
    options.replyTo = request.replyTo;
  }

  if (request.attachment) {
    options.attachments = [{ // use URL as an attachment
      filename: 'invoice.pdf',
      path: request.attachment
    }];
  };

  transporter.sendMail(options, function (error, info) {
    // send mail with defined transport object
    _logger2.default.info(error, info);
    cb(error, info);
  });
};