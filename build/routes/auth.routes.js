"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var userCtrl = _interopRequireWildcard(require("../controllers/auth.controller"));

var _index = require("../middlewares/index");

var router = (0, _express.Router)();
router.post('/singUp', userCtrl.signUp);
router.post('/singIn', userCtrl.signIn);
router.post('/register', _index.authJwt.verifyToken, userCtrl.register);
var _default = router;
exports["default"] = _default;