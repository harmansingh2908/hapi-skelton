'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFields = checkFields;
/* eslint-disable */
exports.default = {
  mandatory: function mandatory(field) {
    return field ? true : false;
  },

  isTextOnly: function isTextOnly(value) {
    var filter = /^[a-zA-Z]+$/;
    if (filter.test(value)) {
      return true;
    }
    return false;
  },

  isString: function isString(value) {
    var filter = /[a-zA-Z]+/;
    if (filter.test(value)) {
      return true;
    }
    return false;
  },

  isNumber: function isNumber(number) {
    if (Number(number)) {
      return true;
    } else {
      return 'Please enter a valid Number';
    }
  },

  isValidLength: function isValidLength(value, len) {
    var dLength = value.length;
    if (dLength > len) {
      return false;
    } else {
      return true;
    }
  },

  isAdult: function isAdult(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }
    return age > 17 ? true : false;
  },

  isEmail: function isEmail(email) {
    var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(email)) {
      return true;
    } else {
      return false;
    }
  },

  isUrl: function isUrl(url) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&`/``/`=]*)?/gi;
    var regex = new RegExp(expression);
    if (url.match(regex)) {
      return true;
    } else {
      return false;
    }
  },

  isPhoneNo: function isPhoneNo(mobile) {
    if (mobile.match(/^\+(?:[0-9] ?){6,14}[0-9]$/)) {
      return true;
    } else {
      return false;
    }
  },

  password: function password(_password) {
    var expression = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,14}$/;
    if (_password.length > 14) {
      return 'Max length is 14';
    } else if (!expression.test(_password) || _password.length < 6) {
      return 'Password must contain atleast 6 characters, including letters and numbers.';
    } else {
      return false;
    }
  },

  fullName: function fullName(_fullName) {
    // checks if fullName contains special character
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (format.test(_fullName) || _fullName == '') {
      return 'Special characters are not allowed in fullname';
    } else {
      return false;
    }
  },

  checkFields: function checkFields(objRecieved, fieldsTocheck) {
    for (var i = 0; i <= fieldsTocheck.length - 1; i++) {
      if (!objRecieved.hasOwnProperty(fieldsTocheck[i]) || !objRecieved[fieldsTocheck[i]].length) {
        return 'Please enter your ' + fieldsTocheck[i];
      }
    }

    return false;
  },

  /**
   * Regex to validate registration noumber of UK vehicles.
   */

  validateVehicleReg: function validateVehicleReg(number) {
    var regex = /^([A-Z]{3}\s?(\d{3}|\d{2}|d{1})\s?[A-Z])|([A-Z]\s?(\d{3}|\d{2}|\d{1})\s?[A-Z]{3})|(([A-HK-PRSVWY][A-HJ-PR-Y])\s?([0][2-9]|[1-9][0-9])\s?[A-HJ-PR-Z]{3})$/;
    return regex.test(number);
  }
};
function checkFields(objRecieved, fieldsTocheck) {
  for (var i = 0; i <= fieldsTocheck.length - 1; i++) {
    if (!objRecieved.hasOwnProperty(fieldsTocheck[i]) || !objRecieved[fieldsTocheck[i]].length) {
      return 'Please enter your ' + fieldsTocheck[i];
    }
  }

  return false;
}

// export function validate(valObj) {
//   for (let each in valObj) {
//     if (validations.hasOwnProperty(each)) {
//       if (validations[each](valObj[each]) !== true) {
//         return validations[each](valObj[each]);
//       }
//     }
//   }
// }

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};