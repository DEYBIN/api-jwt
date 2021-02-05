"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.signIn = exports.signUp = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, passwordAgain, userFound, newUser, saveUser, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (req.body.passwordAgain) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: 'revisar datos enviados'
            }));

          case 3:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, passwordAgain = _req$body.passwordAgain;
            _context.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            userFound = _context.sent;

            if (!userFound) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: 'Ya existe email con el mismo nombre'
            }));

          case 9:
            if (!(password != passwordAgain)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: 'Error contraseñas no coinciden'
            }));

          case 11:
            _context.t0 = _User["default"];
            _context.t1 = email;
            _context.next = 15;
            return _User["default"].encryptPassword(password);

          case 15:
            _context.t2 = _context.sent;
            _context.t3 = {
              email: _context.t1,
              password: _context.t2
            };
            newUser = new _context.t0(_context.t3);
            _context.next = 20;
            return newUser.save();

          case 20:
            saveUser = _context.sent;
            token = _jsonwebtoken["default"].sign({
              id: saveUser.id
            }, _config["default"].SECRET, {
              expiresIn: 86400 // 24 horas

            });
            return _context.abrupt("return", res.json({
              statusCode: 200,
              status: 'success',
              message: '',
              token: token
            }));

          case 25:
            _context.prev = 25;
            _context.t4 = _context["catch"](0);
            return _context.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: _context.t4
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 25]]);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, userFound, matchPassword, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(500).json({
              statusCode: 400,
              status: 'error',
              message: 'usuario o contraseña incorrecta'
            }));

          case 7:
            _context2.next = 9;
            return _User["default"].comparePassword(password, userFound.password);

          case 9:
            matchPassword = _context2.sent;

            if (matchPassword) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(500).json({
              statusCode: 400,
              status: 'error',
              message: 'usuario o contraseña incorrecta'
            }));

          case 12:
            token = _jsonwebtoken["default"].sign({
              id: userFound.id
            }, _config["default"].SECRET, {
              expiresIn: 86400 // 24 horas

            });
            res.status(200).json({
              statusCode: 200,
              status: 'success',
              message: '',
              token: token
            });
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).json({
              statusCode: 400,
              status: 'error',
              message: _context2.t0
            }));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var register = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token, decoded, userFound, data, updatedUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            token = req.headers["x-access-token"];
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context3.next = 5;
            return _User["default"].findById(decoded.id);

          case 5:
            userFound = _context3.sent;

            if (userFound) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json({
              statusCode: 400,
              status: 'error',
              message: 'Usuario no Existe'
            }));

          case 8:
            if (!(userFound.stateUpdate === true)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.json({
              statusCode: 201,
              status: 'success',
              message: "actualización ya fue realizado"
            }));

          case 10:
            data = (0, _extends2["default"])({}, req.body);
            data.stateUpdate = true;
            _context3.next = 14;
            return _User["default"].findByIdAndUpdate(decoded.id, data);

          case 14:
            updatedUser = _context3.sent;
            return _context3.abrupt("return", res.json({
              statusCode: 200,
              status: "success"
            }));

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json({
              statusCode: 400,
              status: "error",
              message: _context3.t0
            }));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function register(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.register = register;