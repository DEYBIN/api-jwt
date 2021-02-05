"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var URI = process.env.DB_MONGODB_URI ? process.env.DB_MONGODB_URI : 'mongodb://localhost/api-db';

_mongoose["default"].connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(function (db) {
  return console.log('Db is connect');
})["catch"](function (error) {
  return console.log(error);
});