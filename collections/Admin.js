/*
 * @file: Admin.js
 * @description: collection for Admin.
 * @date: 14.02.2018
 * @author: Sheenam Narula
 * */

import Mongoose from 'mongoose';
import { getTimeStamp } from '../utilities/universal';

const Schema = Mongoose.Schema;

class AdminClass {
  static async checkEmail(email) {
    return this.findOne({ email: email });
  }

  static async insertData(Data) {
    return this(Data).save();
  }
  static async checkToken(token) {
    return this.findOne({
      'auth.token': token
    });
  }

  static async findUserByCondition(condition) {
    return this.findOne(condition);
  }

  static async findRecordsByCondition(condition) {
    return this.find(condition);
  }

  static async updateData(condition, query) {
    return this.findOneAndUpdate(condition, query, { new: true });
  }

  static login(username, password) {
    return this.findOne({
      email: username,
      password: password
    });
  }

  static async onLoginDone(userId, payload, loginToken) {
    let updateData = {};
    let condition = {};

    updateData = {
      $push: {
        auth: {
          token: loginToken,
          when: getTimeStamp()
        }
      },
      $set: {
        updatedAt: getTimeStamp()
      }
    };
    condition = {
      _id: userId
    };

    let userData = await this.findOneAndUpdate(condition, updateData, { new: true });
    return userData;
  }
}

const AdminSchema = new Schema({
  fullName: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'admin'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    default: ''
  },
  auth: [
    {
      token: {
        type: String,
        default: ''
      },
      when: {
        type: Number,
        default: getTimeStamp
      }
    }
  ],
  createdAt: {
    type: Number,
    default: getTimeStamp
  },
  updatedAt: {
    type: Number,
    default: getTimeStamp
  },
  resetPwdToken: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

AdminSchema.loadClass(AdminClass);

export default Mongoose.model('Admin', AdminSchema);
