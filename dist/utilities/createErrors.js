'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UberEatsResponse = exports.ErrorResponse = exports.CustomSuccessResponse = exports.StripeError = exports.AuthenticationError = exports.validationErrors = exports.InvalidCredentials = exports.VerificationIssue = exports.AlreadyRegistered = exports.UnknownError = exports.InvalidFields = undefined;

var _apolloErrors = require('apollo-errors');

var InvalidFields = exports.InvalidFields = (0, _apolloErrors.createError)('InvalidFields', {
  message: 'Please enter all fields in a valid format'
}); /*
     * @file: createErrors.js
     * @description: Throw errors.
     * @date: 18.1.2018
     * @author:sheenam
     * */
/**
 * Descriptions of Status Codes.
 * 400 - Common errors
 * 401 - Authentication Fails
 */

var UnknownError = exports.UnknownError = (0, _apolloErrors.createError)('InvalidFields', {
  message: 'UnknownError'
});
var AlreadyRegistered = exports.AlreadyRegistered = (0, _apolloErrors.createError)('AlreadyRegistered', {
  message: 'Already exists'
});

var VerificationIssue = exports.VerificationIssue = (0, _apolloErrors.createError)('VerificationIssue', {
  message: 'Not verified'
});

var InvalidCredentials = exports.InvalidCredentials = (0, _apolloErrors.createError)('InvalidCredentials', {
  message: 'Invalid Credentials'
});

var validationErrors = exports.validationErrors = (0, _apolloErrors.createError)('ValidationErrors', {
  message: 'Validation Errors'
});

var AuthenticationError = exports.AuthenticationError = (0, _apolloErrors.createError)('AuthenticationError', {
  message: 'Authentication Error'
});
var StripeError = exports.StripeError = (0, _apolloErrors.createError)('StripeError', {
  message: 'Stripe error has been occured'
});

var CustomSuccessResponse = exports.CustomSuccessResponse = function CustomSuccessResponse(obj) {
  var result = {};
  result.success = true;
  result.message = obj.message;
  result.statusCode = 200;

  return result;
};

var ErrorResponse = exports.ErrorResponse = function ErrorResponse(obj) {
  var result = {};
  result.success = false;
  result.message = obj.message;
  result.statusCode = 400;

  return result;
};

var UberEatsResponse = exports.UberEatsResponse = function UberEatsResponse(data) {
  return {
    success: true,
    statusCode: 200,
    message: data.message,
    deliveryStatus: data.status
  };
};