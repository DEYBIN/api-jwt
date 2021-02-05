"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers["x-access-token"];

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              statusCode: 400,
              status: 'error',
              message: "No token provided"
            }));

          case 3:
            _context.prev = 3;
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            req.userId = decoded.id;
            _context.next = 8;
            return _User["default"].findById(req.userId, {
              password: 0
            });

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              statusCode: 400,
              status: 'error',
              message: "No user found"
            }));

          case 11:
            next();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(401).json({
              statusCode: 400,
              status: 'error',
              message: _context.t0
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // export const isModerator = async (req, res, next) => {
// 	try {
// 		const user = await userSchema.findById(req.userId);
// 		const roles = await Role.find({ _id: { $in: user.roles } });
// 		for (let i = 0; i < roles.length; i++) {
// 			if (roles[i].name === "moderator") {
// 				next();
// 				return;
// 			}
// 		}
// 		return res.status(403).json({ message: "Require Moderator Role!" });
// 	} catch (error) {
// 		// console.log(error)
// 		return res.status(500).send({ message: error });
// 	}
// };
// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     const roles = await Role.find({ _id: { $in: user.roles } });
//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "admin") {
//         next();
//         return;
//       }
//     }
//     return res.status(403).json({ message: "Require Admin Role!" });
//   } catch (error) {
//     console.log(error)
//     return res.status(500).send({ message: error });
//   }
// };


exports.verifyToken = verifyToken;