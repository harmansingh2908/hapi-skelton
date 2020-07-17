/* -----------------------------------------------------------------------
   * @ description : Here defines all rest functions.
----------------------------------------------------------------------- */

import Boom from 'boom';
import config from 'config';
import Admin from '../collections/Admin';
import Messages from './messages';
import logger from './logger';

const { jwtKey } = config.get('app');

export const successAction = (data, message = 'OK') => ({
  statusCode: 200,
  message,
  data: data ? data : undefined // eslint-disable-line
});

export const failAction = errorMessage => {
  throw Boom.badRequest(errorMessage);
};

export const failActionJoi = (request, h, error) => {
  let errorMessage = '';
  if (error.output.payload.message.indexOf('[') > -1) {
    errorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
  } else {
    errorMessage = error.output.payload.message;
  }
  errorMessage = errorMessage.replace(/"/g, '');
  errorMessage = errorMessage.replace('[', '');
  errorMessage = errorMessage.replace(']', '');
  error.output.payload.message = errorMessage;
  delete error.output.payload.validation;
  throw Boom.badRequest(errorMessage);
};
