/*
 * @file: users.js
 * @description: Service for users.
 * @date: 18.July.2020
 * @author: Hermenpreet Singh
 * */

import Users from '../collections/User';
import { encryptpassword, generateToken, getTimeStamp } from '../utilities/universal';

/**
 * @function to fetch list of all users
 */

export const getAllUsersService = async payload => {
  return await Users.findRecordsByCondition({});
};

/**
 * @function to fetch list of all users
 */

export const getUserService = async payload => {
  return await Users.findUserByCondition({ _id: payload });
};

/**
 * @function to create new user.
 */
export const register = async payload => {
  payload.password = encryptpassword(payload.password);
  let checMail = await Users.checkEmail(payload.email);
  if (checMail) {
    return {
      checkEmail: true
    };
  }
  const data = await Users.insertData(payload);
  return data;
};
