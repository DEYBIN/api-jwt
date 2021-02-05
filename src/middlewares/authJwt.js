import jwt from "jsonwebtoken";
import config from "../config";
import userSchema from "../models/User";


export const verifyToken = async (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) return res.status(403).json({statusCode:400,status:'error', message: "No token provided" });

	try {
		const decoded = jwt.verify(token, config.SECRET);
		req.userId = decoded.id;

		const user = await userSchema.findById(req.userId, { password: 0 });
		if (!user) return res.status(404).json({ statusCode:400,status:'error',message: "No user found" });

		next();
	} catch (error) {
		return res.status(401).json({ statusCode:400,status:'error',message:error });
	}
};

// export const isModerator = async (req, res, next) => {
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