"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _package = _interopRequireDefault(require("../package.json"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _cars = _interopRequireDefault(require("./routes/cars.routes"));

var app = (0, _express["default"])(); // Settings

app.set("pkg", _package["default"]);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4); // Middlewares

var corsOptions = {
  origin: "http://localhost:8080"
};
app.use((0, _cors["default"])(corsOptions)); // app.use((req, res, next) => {
// 	// Dominio que tengan acceso (ej. 'http://example.com')
// 		res.setHeader('Access-Control-Allow-Origin', '*');
// 	// Metodos de solicitud que deseas permitir
// 		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// 	// Encabecedados que permites (ej. 'X-Requested-With,content-type')
// 		res.setHeader('Access-Control-Allow-Headers', '*');
// 	next();
// });
// app.use(cors());

app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // Welcome Routes

app.get("/", function (req, res) {
  res.json({
    message: "Welcome to my Products API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author
  });
}); // Routes

app.use('/auth', _auth["default"]);
app.use('/cars', _cars["default"]);
var _default = app;
exports["default"] = _default;