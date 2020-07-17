/*
 * @file: AppUsers.js
 * @description: Services related to app users.
 * @date: 09.02.2018
 * @author: Manish Budhiraja
 * */

import Users from '../../collections/user';
import * as Mail from '../../utilities/mail';
import sendFCM from '../../utilities/methods';
import Notifications from '../../collections/Notifications';
import { getTimeStamp } from '../../utilities/universal';
import Dishes from '../../collections/Dishes';
import Admin from '../../collections/Admin';
import FoodSubscriptions from '../../collections/FoodSubscriptions';
import { publishSubscriptionData } from '../../utilities/SubscriptionMethods';
import Orders from '../../collections/Orders';

/**
 * @function to fetch list of all business
 */

export const appBusiness = async payload => {
  const isAdmin = await Admin.findUserByCondition({
    _id: payload.userId
  });
  if (!isAdmin) {
    return {
      notAdmin: true
    };
  }

  const query = {
    isDeleted: false,
    $or: [
      { 'business.type': 'Chef' },
      { 'business.type': 'Driver' },
      { 'business.type': 'Dietician' }
    ]
  };

  return await Users.find(query).sort({
    'business.createdAt': -1
  });
};

/**
 * @function to fetch list of all consumers
 */

export const appConsumers = async payload => {
  const isAdmin = await Admin.findUserByCondition({
    _id: payload.userId
  });
  if (!isAdmin) {
    return {
      notAdmin: true
    };
  }
  const query = { 'business.type': '', isDeleted: false };
  return await Users.findUsers(query);
};

/**
 * @function to udpate User collection based on action performed by admin.
 */

export const blockUnblockUser = async payload => {
  const isAdmin = await Admin.findUserByCondition({
    _id: payload.adminId
  });
  if (!isAdmin) {
    return {
      notAdmin: true
    };
  }

  const condition = {
    _id: payload.userId
  };

  const query = {
    isActive: payload.status,
    updatedAt: getTimeStamp()
  };

  const user = await Users.updateData(condition, query);

  if (user) {
    let suspendedMessage =
      'Your account has been suspended due to violating our terms & conditions.\nPlease contact us at nextfoodie@support.com';

    if (payload.status === 1) {
      suspendedMessage = 'Your account has been activated';
    }

    const sendStr = Mail.formatHTML({
      fileName: 'accountSuspened.html',
      username: user.firstName,
      message: suspendedMessage
    });

    const emailData = {
      to: user.email,
      subject:
        payload.status === 0 ? Mail.subjects.accountSuspended : Mail.subjects.accountActivated,
      html: sendStr
    };

    Mail.sendMail(emailData, function(err, res) {});

    let message = {},
      title = payload.status == 0 ? 'suspened' : 'activated';
    message.to = user.deviceInfo.token;
    message.notification = {
      title: `Account ${title}`,
      body: suspendedMessage
    };
    message.data = {
      type: 1,
      activeRole: 0
    };
    if (user.notifications !== 0 && user.deviceInfo.token !== '') {
      sendFCM(message);
    }

    let notificationData = {
      senderId: 'Admin',
      receiverId: user._id,
      message: `Your account has been ${title}.`,
      type: 1, // sent by admin
      action: 'accountSuspened',
      activeRole: 0
    };

    let notificationSuccess = await Notifications.insertData(notificationData);

    if (notificationSuccess) {
      let count = await Notifications.count({
        receiverId: user._id,
        status: false
      });
      let publishedArray = [user._id];
      if (count > 0) {
        publishSubscriptionData({
          count: count,
          type: 'notification',
          publishedArray: publishedArray
        });
      }
    }
  }
  return user;
};

/**
 * @function to get details of dashboard like total consumers, business, dishes, revenue etc.
 */

export const dasboardRecordsCounts = async payload => {
  const isAdmin = await Admin.findUserByCondition({
    _id: payload.userId
  });

  if (!isAdmin) {
    return {
      notAdmin: true
    };
  }

  const query = { 'business.type': '', isDeleted: false };
  const pendingBusinessQuery = {
    isDeleted: false,
    'business.status': 'Pending'
  };
  const approvedBusinees = {
    isDeleted: false,
    'business.status': 'Accepted'
  };

  const revenueQuery = {
    status: { $in: ['Delivered', 'Reported', 'Resolved'] }
  };

  const consumers = await Users.getCount(query),
    business = await Users.getCount(approvedBusinees),
    pendingBusiness = await Users.getCount(pendingBusinessQuery),
    totalDishes = await Dishes.getCount({ isDeleted: false }),
    totalSubs = await FoodSubscriptions.getCount({ isDeleted: false }),
    totalOrders = await Orders.getCount({}),
    totalDisputes = await Orders.getCount({
      status: { $in: ['Reported'] }
    }),
    totalRevenue = await Orders.calculateTotalRevenue(revenueQuery);

  return {
    totalConsumers: consumers,
    totalBusiness: business,
    totalDishes: totalDishes,
    totalBusinessApprovalsPending: pendingBusiness,
    totalDisputes: totalDisputes,
    totalRevenue: totalRevenue,
    totalOrders: totalOrders,
    totalSubscriptions: totalSubs
  };
};
