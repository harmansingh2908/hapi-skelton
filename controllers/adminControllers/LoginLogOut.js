/* -----------------------------------------------------------------------
   * @ description : This is the user controller layer.
----------------------------------------------------------------------- */

import { register, login, logout } from '../../services/adminServices/LoginLogOut';
import {
  CustomSuccessResponse,
  AlreadyRegistered,
  InvalidFields,
  AuthenticationError
} from '../../utilities/createErrors';
import validations from '../../utilities/validations.js';
export const registerUser = async (root, payload, context) => {
  // try {
  if (validations.password(payload.password)) {
    throw new InvalidFields({
      data: {
        field: 'password',
        reason: validations.password(payload.password),
        statusCode: 400
      }
    });
  } else if (validations.isEmail(payload.email) == false) {
    throw new InvalidFields({
      data: {
        field: 'email',
        reason: 'Please enter a valid email',
        statusCode: 400
      }
    });
  }
  let registerResult = await register(payload);
  if (registerResult.checkEmail) {
    throw new AlreadyRegistered({
      data: {
        reason: 'email exists',
        statusCode: 400
      }
    });
  } else {
    return CustomSuccessResponse({
      message: 'User has been successfully registered.'
    });
  }
};

export const loginUser = async (root, payload, context) => {
  let userData = await login(payload);
  if (userData) {
    return userData;
  } else {
    throw new AuthenticationError({
      data: {
        reason: 'Invalid Credentials.',
        statusCode: 400
      }
    });
  }
};

export const logoutUser = async (root, payload, context) => {
  if (context.auth.isAuthenticated) {
    let userId = context.auth.credentials.userId,
      token = context.auth.credentials.token;
    await logout({ userId, token });
    return CustomSuccessResponse({ message: 'User has been logged out successfully.' });
  } else {
    throw new AuthenticationError({
      data: {
        reason: context.auth.message,
        statusCode: 401
      }
    });
  }
};
