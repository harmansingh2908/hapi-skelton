/*
 * @file: AppUsers.js
 * @description: Queries related to application users.
 * @date: 16.Feb.2018
 * @author: Manish budhiraja
 * */

import {
  appBusiness,
  appConsumers,
  blockUnblockUser,
  dasboardRecordsCounts
} from '../../services/adminServices/AppUsers';

import {
  CustomSuccessResponse,
  AuthenticationError,
  validationErrors
} from '../../utilities/createErrors';

/**
 * @function to fetch list of all consumers
 */

export const allConsumers = async (root, payload, context) => {
  if (context.auth.isAuthenticated) {
    payload.userId = context.auth.credentials.userId;
    let users = await appConsumers(payload);
    if (users.notAdmin) {
      throw new AuthenticationError({
        data: {
          reason: 'Unauthorized access to admin rights.',
          statusCode: 401
        }
      });
    }
    return users;
  } else {
    throw new AuthenticationError({
      data: {
        reason: context.auth.message,
        statusCode: 401
      }
    });
  }
};

/**
 * @function to fetch list of all business
 */

export const allBusiness = async (root, payload, context) => {
  if (context.auth.isAuthenticated) {
    payload.userId = context.auth.credentials.userId;
    let users = await appBusiness(payload);
    if (users.notAdmin) {
      throw new AuthenticationError({
        data: {
          reason: 'Unauthorized access to admin rights.',
          statusCode: 401
        }
      });
    }
    return users;
  } else {
    throw new AuthenticationError({
      data: {
        reason: context.auth.message,
        statusCode: 401
      }
    });
  }
};

/**
 * @function to block unblock user from using the app features. Takes userId and status args
 */

export const blockUnblock = async (root, payload, context) => {
  if (context.auth.isAuthenticated) {
    payload.adminId = context.auth.credentials.userId;
    let user = await blockUnblockUser(payload);
    if (user.notAdmin) {
      throw new AuthenticationError({
        data: {
          reason: 'Unauthorized access to admin rights.',
          statusCode: 401
        }
      });
    } else if (user) {
      let status = payload.status == 1 ? 'unblocked' : 'blocked';
      return CustomSuccessResponse({
        message: `User has been successfully ${status}`
      });
    } else {
      throw new validationErrors({
        data: {
          reason: `Failed to change status to ${status} of user, please try again.`,
          statusCode: 400
        }
      });
    }
  } else {
    throw new AuthenticationError({
      data: {
        reason: context.auth.message,
        statusCode: 401
      }
    });
  }
};

/**
 * @function to get details of dashboard like total consumers, business, dishes, revenue etc.
 */

export const dashboardDetails = async (root, payload, context) => {
  if (context.auth.isAuthenticated) {
    payload.userId = context.auth.credentials.userId;
    let result = await dasboardRecordsCounts(payload);
    if (result.notAdmin) {
      throw new AuthenticationError({
        data: {
          reason: 'Unauthorized access to admin rights.',
          statusCode: 401
        }
      });
    }
    return result;
  } else {
    throw new AuthenticationError({
      data: {
        reason: context.auth.message,
        statusCode: 401
      }
    });
  }
};
