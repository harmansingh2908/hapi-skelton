/*
 * @file: users.js
 * @description: API for users.
 * @date: 18.July.2020
 * @author: Hermenpreet Singh
 * */

import { getAllUsersController } from '../../controllers/users';
import Joi from 'joi';
export default {
  method: 'GET',
  path: '/api/getAllUsers',
  config: {
    auth: false,
    description: 'Api service used to users.',
    tags: ['api', 'users']
  },
  handler: getAllUsersController
};
