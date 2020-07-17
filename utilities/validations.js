/* eslint-disable */
export default {
  mandatory: function(field) {
    return field ? true : false;
  },

  isTextOnly: function(value) {
    let filter = /^[a-zA-Z]+$/;
    if (filter.test(value)) {
      return true;
    }
    return false;
  },

  isString: function(value) {
    let filter = /[a-zA-Z]+/;
    if (filter.test(value)) {
      return true;
    }
    return false;
  },

  isNumber: function(number) {
    if (Number(number)) {
      return true;
    } else {
      return 'Please enter a valid Number';
    }
  },

  isValidLength: function(value, len) {
    let dLength = value.length;
    if (dLength > len) {
      return false;
    } else {
      return true;
    }
  },

  isAdult: function(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age > 17 ? true : false;
  },

  isEmail: function(email) {
    let filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(email)) {
      return true;
    } else {
      return false;
    }
  },

  isUrl: function(url) {
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&`/``/`=]*)?/gi;
    let regex = new RegExp(expression);
    if (url.match(regex)) {
      return true;
    } else {
      return false;
    }
  },

  isPhoneNo: function(mobile) {
    if (mobile.match(/^\+(?:[0-9] ?){6,14}[0-9]$/)) {
      return true;
    } else {
      return false;
    }
  },

  password: function(password) {
    let expression = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,14}$/;
    if (password.length > 14) {
      return 'Max length is 14';
    } else if (!expression.test(password) || password.length < 6) {
      return 'Password must contain atleast 6 characters, including letters and numbers.';
    } else {
      return false;
    }
  },

  fullName: function(fullName) {
    // checks if fullName contains special character
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (format.test(fullName) || fullName == '') {
      return 'Special characters are not allowed in fullname';
    } else {
      return false;
    }
  },

  checkFields: function(objRecieved, fieldsTocheck) {
    for (let i = 0; i <= fieldsTocheck.length - 1; i++) {
      if (!objRecieved.hasOwnProperty(fieldsTocheck[i]) || !objRecieved[fieldsTocheck[i]].length) {
        return `Please enter your ${fieldsTocheck[i]}`;
      }
    }

    return false;
  },

  /**
   * Regex to validate registration noumber of UK vehicles.
   */

  validateVehicleReg: function(number) {
    let regex = /^([A-Z]{3}\s?(\d{3}|\d{2}|d{1})\s?[A-Z])|([A-Z]\s?(\d{3}|\d{2}|\d{1})\s?[A-Z]{3})|(([A-HK-PRSVWY][A-HJ-PR-Y])\s?([0][2-9]|[1-9][0-9])\s?[A-HJ-PR-Z]{3})$/;
    return regex.test(number);
  }
};

export function checkFields(objRecieved, fieldsTocheck) {
  for (let i = 0; i <= fieldsTocheck.length - 1; i++) {
    if (!objRecieved.hasOwnProperty(fieldsTocheck[i]) || !objRecieved[fieldsTocheck[i]].length) {
      return `Please enter your ${fieldsTocheck[i]}`;
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

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
