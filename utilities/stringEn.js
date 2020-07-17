/*
 * @file: stringEn.js
 * @description: New Functions in String Prototype
 * @date: 15.Mar.2018
 * @author: Manish Budhraja
 * */

'use strict';

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);
};

String.prototype.capitalizeEachLetter = function() {
  return this.toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.capitalizeFirstLetter();
    })
    .join(' ');
};
