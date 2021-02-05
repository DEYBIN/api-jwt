"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletes = exports.update = exports.register = exports.car = exports.cars = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Cars = _interopRequireDefault(require("../models/Cars"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var cars = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Cars["default"].find();

          case 3:
            data = _context.sent;
            if (!data) data = ((0, _readOnlyError2["default"])("data"), []);
            return _context.abrupt("return", res.json({
              statusCode: 200,
              status: 'success',
              data: data
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: _context.t0
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function cars(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.cars = cars;

var car = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(req.params.id);
            _context2.next = 4;
            return _Cars["default"].findById(req.params.id);

          case 4:
            data = _context2.sent;
            if (!data) data = ((0, _readOnlyError2["default"])("data"), []);
            return _context2.abrupt("return", res.json({
              statusCode: 200,
              status: 'success',
              data: data
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: _context2.t0
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function car(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.car = car;

var register = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token, decoded, carsFound, newCar, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            token = req.headers["x-access-token"];
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context3.next = 5;
            return _Cars["default"].findOne({
              SERIE: req.body.SERIE,
              MOTOR: req.body.MOTOR,
              VIN: req.body.VIN
            });

          case 5:
            carsFound = _context3.sent;

            if (!carsFound) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: 'Movilidad ya se encuentra registrado'
            }));

          case 8:
            newCar = new _Cars["default"](_objectSpread(_objectSpread({}, req.body), {}, {
              id_user: decoded.id
            }));
            _context3.next = 11;
            return newCar.save();

          case 11:
            data = _context3.sent;
            return _context3.abrupt("return", res.json({
              statusCode: 200,
              status: "success",
              data: data
            }));

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json({
              statusCode: 400,
              status: "error",
              message: _context3.t0
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 15]]);
  }));

  return function register(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.register = register;

var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var token, decoded, carsFound, data, updatedUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            token = req.headers["x-access-token"];
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context4.next = 5;
            return _Cars["default"].findOne({
              id_user: decoded.id
            });

          case 5:
            carsFound = _context4.sent;

            if (carsFound) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: 'Movilidad fue registrado por otro conductor'
            }));

          case 8:
            data = (0, _extends2["default"])({}, req.body);
            _context4.next = 11;
            return _Cars["default"].findByIdAndUpdate(req.params.id, data);

          case 11:
            updatedUser = _context4.sent;
            return _context4.abrupt("return", res.json({
              statusCode: 200,
              status: "success",
              data: updatedUser
            }));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.json({
              statusCode: 400,
              status: "error",
              message: _context4.t0
            }));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));

  return function update(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.update = update;

var deletes = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            return _context5.abrupt("return", res.json({
              statusCode: 200,
              status: "success"
            }));

          case 4:
            _context5.prev = 4;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.json({
              statusCode: 400,
              status: "error",
              message: _context5.t0
            }));

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 4]]);
  }));

  return function deletes(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deletes = deletes;