/*
 * @file: contact.js
 * @description: Controller for contact.
 * @date: 11.May.2018
 * @author: Manish Budhiraja
 * */

import { failAction, successAction } from '../utilities/rest';
import * as Mail from '../utilities/mail';

export const contact = async (request, h) => {
  const { payload } = request;
  try {
    // Mail to customer.
    const sendStr = Mail.formatHTML({
      fileName: 'contact.html',
      username: 'Admin',
      message: `${payload.message.capitalizeFirstLetter()}`
    });

    const emailData = {
      to: 'manish.budhraja@ignivasolutions.com',
      subject: 'Contact Email',
      html: sendStr
    };

    Mail.sendMail(emailData, function(err, res) {});

    // mail to user.
    const sendStrUser = Mail.formatHTML({
      fileName: 'contact.html',
      username: payload.name,
      message:
        'Your message has been sent to admin successfully. NextFoodies Team will contact you shortly. Thanks for your patience.'
    });

    const emailDataUser = {
      to: payload.email,
      subject: 'Thanks for writing to us.',
      html: sendStrUser
    };

    Mail.sendMail(emailDataUser, function(err, res) {});
    return successAction(null, 'Success');
  } catch (error) {
    failAction(error.message);
  }
};
