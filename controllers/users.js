/*
 * @file: users.js
 * @description: Controller for users.
 * @date: 18.July.2020
 * @author: Hermenpreet Singh
 * */

import { failAction, successAction } from '../utilities/rest';
import { getAllUsersService, register, getUserService } from '../services/users';
import validations from '../utilities/validations.js';

export const getAllUsersController = async (request, h) => {
  try {
    const users = await getAllUsersService();
    return successAction(users, 'Success');
  } catch (error) {
    failAction(error.message);
  }
};

export const getUserController = async (request, h) => {
  try {
    const { id } = request.params;
    const user = await getUserService(id);
    if (user) {
      return successAction(user, 'Success');
    } else {
      return successAction(user, 'User not found');
    }
  } catch (error) {
    failAction(error.message);
  }
};

export const addUser = async (request, h) => {
  const { payload } = request;
  // try {

  console.log(payload);
  if (validations.password(payload.password)) {
    failAction(validations.password(payload.password));
  } else if (validations.isEmail(payload.email) == false) {
    failAction('Please enter a valid email');
  }
  let registerResult = await register(payload);
  if (registerResult.checkEmail) {
    failAction('email exists');
  } else {
    return CustomSuccessResponse({
      message: 'User has been successfully registered.'
    });
  }
};
