import express, { response } from 'express';
import cors from "cors";
import morgan from 'morgan';
import helmet from "helmet";

import pkg from "../package.json";

import authRoutes from './routes/auth.routes'
import carsRoutes from './routes/cars.routes'


const app=express();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
	origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {

// 	// Dominio que tengan acceso (ej. 'http://example.com')
// 		res.setHeader('Access-Control-Allow-Origin', '*');

// 	// Metodos de solicitud que deseas permitir
// 		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

// 	// Encabecedados que permites (ej. 'X-Requested-With,content-type')
// 		res.setHeader('Access-Control-Allow-Headers', '*');

// 	next();
// });
// app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to my Products API",
		name: app.get("pkg").name,
		version: app.get("pkg").version,
		description: app.get("pkg").description,
		author: app.get("pkg").author,
	});
});

// Routes
app.use('/auth',authRoutes);
app.use('/cars',carsRoutes);
export default app;