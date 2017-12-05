'use strict';

var jwt_decode = require('./jwt-decode/index');

module.exports = function (token) {
  if (!token) {
    throw new Error('Invalid token specified');
  }
  
  return jwt_decode(token);
};