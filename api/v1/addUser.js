/*
 * @file: users.js
 * @description: API for users.
 * @date: 18.July.2020
 * @author: Hermenpreet Singh
 * */

import { addUser } from '../../controllers/users';
import Joi from 'joi';
export default {
  method: 'POST',
  path: '/api/addUser',
  config: {
    auth: false,
    description: 'Api service used to add new users.',
    tags: ['api', 'users'],
    validate: {
      payload: {
        name: Joi.string()
          .trim()
          .label('name'),
        email: Joi.string()
          .trim()
          .label('email'),
        password: Joi.string()
          .trim()
          .label('password')
      }
    }
  },
  handler: addUser
};
