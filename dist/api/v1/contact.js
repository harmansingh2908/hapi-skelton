'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contact = require('../../controllers/contact');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @file: contact.js
 * @description: API for contact.
 * @date: 11.May.2018
 * @author: Manish Budhiraja
 * */

exports.default = {
  method: 'POST',
  path: '/api/contact',
  config: {
    auth: false,
    description: 'Api service used to contact.',
    tags: ['api', 'contact'],
    validate: {
      payload: {
        name: _joi2.default.string().trim().label('name'),
        email: _joi2.default.string().trim().label('email'),
        message: _joi2.default.string().trim().label('message')
      }
    }
  },
  handler: _contact.contact
};