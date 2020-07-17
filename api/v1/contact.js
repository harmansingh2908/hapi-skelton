/*
 * @file: contact.js
 * @description: API for contact.
 * @date: 11.May.2018
 * @author: Manish Budhiraja
 * */

import { contact } from '../../controllers/contact';
import Joi from 'joi';
export default {
  method: 'POST',
  path: '/api/contact',
  config: {
    auth: false,
    description: 'Api service used to contact.',
    tags: ['api', 'contact'],
    validate: {
      payload: {
        name: Joi.string()
          .trim()
          .label('name'),
        email: Joi.string()
          .trim()
          .label('email'),
        message: Joi.string()
          .trim()
          .label('message')
      }
    }
  },
  handler: contact
};
