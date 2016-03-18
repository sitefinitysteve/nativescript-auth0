'use strict';

var base64_url_decode = require('./jwt-decode/base64_url_decode');
var json_parse = require('./jwt-decode/json_parse');

module.exports = function (token) {
  if (!token) {
    throw new Error('Invalid token specified');
  }
  
  return json_parse(base64_url_decode(token.split('.')[1]));
};