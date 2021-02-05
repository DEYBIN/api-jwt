"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var rolesSchema = new _mongoose.Schema({
  name: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Role', rolesSchema);

exports["default"] = _default;