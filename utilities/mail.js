/* -----------------------------------------------------------------------
   * @ description : Here initialising nodemailer transport for sending mails.
----------------------------------------------------------------------- */

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import fs from 'fs';
import path from 'path';
import config from 'config';
import logger from './logger';
import handlebars from 'handlebars';

const { smtpUser, smtpPass, smtpPort, smtpServer, mailFrom, templatePath } = config.get('smtp');
const { baseurl, fburl, twitterurl, instaurl } = config.get('urls');
const { logo, fb, twitter, insta } = config.get('images');

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: smtpServer, // hostname
    port: smtpPort, // port for secure SMTP
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })
);

export const subjects = {
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

export const formatHTML = request => {
  const templatepath = path.join(__dirname, templatePath);

  const emailTemplate = fs.readFileSync(
    path.resolve(`${templatepath}${request.fileName}`),
    'UTF-8'
  );

  /******** Replace dynamic values in email template. ********/
  let template = handlebars.compile(emailTemplate);
  let replacements = {
    link: `${baseurl}${request.link}`,
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
  let htmlToSend = template(replacements);
  return htmlToSend;
};

export const sendMail = (request, cb) => {
  let options = {
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
    options.attachments = [
      {
        // use URL as an attachment
        filename: 'invoice.pdf',
        path: request.attachment
      }
    ];
  }

  transporter.sendMail(options, function(error, info) {
    // send mail with defined transport object
    logger.info(error, info);
    cb(error, info);
  });
};
