import Admin from '../../collections/Admin';
import { encryptpassword, generateToken, getTimeStamp } from '../../utilities/universal';

/**
 * @function to register a new user as admin.
 */
export const register = async payload => {
  payload.password = encryptpassword(payload.password);
  let checMail = await Admin.checkEmail(payload.email);
  if (checMail) {
    return {
      checkEmail: true
    };
  }
  const data = await Admin.insertData(payload);
  return data;
};

/**
 * @function to login in adim panel
 */
export const login = async payload => {
  let userData;
  // check for auto login
  userData = await Admin.login(payload.username, encryptpassword(payload.password));
  if (!userData) {
    return false;
  }
  // generate login token
  let loginToken = generateToken({
    when: getTimeStamp(),
    lastLogin: userData.lastLogin,
    userId: userData._id
  });
  const data = await Admin.onLoginDone(userData._id, payload, loginToken);
  data.userId = data._id;
  data.loginToken = loginToken;
  return data;
};

/**
 * @function to logout from applciation
 */
export const logout = async payload => {
  let update = await Admin.updateData(
    { _id: payload.userId },
    {
      $set: {
        updatedAt: getTimeStamp()
      },
      $pull: {
        auth: { token: payload.token }
      }
    }
  );
  if (!update) {
    return false;
  }
  return update;
};
