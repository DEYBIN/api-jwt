"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var carSchema = new _mongoose.Schema({
  id_user: String,
  marca: String,
  model: String,
  year: Number,
  color: String,
  placa: {
    type: String,
    unique: true
  },
  MOTOR: String,
  SERIE: String,
  VIN: String,
  ubica: String,
  flota: Number,
  enterprise: String,
  tipo: {
    type: Number,
    "default": 0
  } //0->taxi- , 1->colectivo

}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Car', carSchema);

exports["default"] = _default;