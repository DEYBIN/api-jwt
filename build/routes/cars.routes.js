"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var carsControl = _interopRequireWildcard(require("../controllers/cars.controller"));

var _index = require("../middlewares/index");

var router = (0, _express.Router)();
router.get('/', _index.authJwt.verifyToken, carsControl.cars);
router.get('/:id', _index.authJwt.verifyToken, carsControl.car);
router.post('/register', _index.authJwt.verifyToken, carsControl.register);
router.put('/update/:id', _index.authJwt.verifyToken, carsControl.update);
router["delete"]('/register', _index.authJwt.verifyToken, carsControl.deletes);
var _default = router;
exports["default"] = _default;