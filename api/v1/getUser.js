/*
 * @file: getuser.js
 * @description: API for users.
 * @date: 18.July.2020
 * @author: Hermenpreet Singh
 * */

import { getUserController } from '../../controllers/users';
import Joi from 'joi';
export default {
  method: 'GET',
  path: '/api/getUser/{id}',
  config: {
    auth: false,
    description: 'Api service used to users.',
    tags: ['api', 'users']
  },
  handler: getUserController
};
