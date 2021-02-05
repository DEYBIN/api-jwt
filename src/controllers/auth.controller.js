const userSchema= require('../models/User')
const jwt= require('jsonwebtoken')
const config= require('../config')
const authControl={}
authControl.signUp=async (req,res)=>{
	try {
		if(!req.body.passwordAgain) return res.json({statusCode:400,status:'error',message:'revisar datos enviados'});

		const {email,password,passwordAgain}= req.body;

		const userFound= await userSchema.findOne({email});
		if(userFound) return res.json({statusCode:400,status:'error',message:'Ya existe email con el mismo nombre'});
		if(password!=passwordAgain)return res.json({statusCode:400,status:'error',message:'Error contraseñas no coinciden'});

		const newUser =new userSchema({
			email,
			password: await userSchema.encryptPassword(password)
		});
		const saveUser=await newUser.save();
		const token=jwt.sign({id:saveUser.id},config.SECRET,{
			expiresIn:86400 // 24 horas
		});
		
		return res.json({statusCode:200,status:'success',message:'',token})
	} catch (error) {
		return res.json({statusCode:400,status:'error',message:error});
	}
}
authControl.signIn=async (req,res)=>{
	try {
		const {email,password}= req.body;
		const userFound = await userSchema.findOne({email});
		if(!userFound) return res.status(500).json({statusCode:400,status:'error',message:'usuario o contraseña incorrecta'});
		const matchPassword= await userSchema.comparePassword(password,userFound.password);
		if(!matchPassword) return res.status(500).json({statusCode:400,status:'error',message:'usuario o contraseña incorrecta'});

		const token=jwt.sign({id:userFound.id},config.SECRET,{
				expiresIn:86400 // 24 horas
		});
		
		res.status(200).json({statusCode:200,status:'success',message:'',token})
	} catch (error) {
		return res.status(400).json({statusCode:400,status:'error',message:error});
	}
}

authControl.register=async (req,res)=>{
	try {

		let token = req.headers["x-access-token"];
		const decoded = jwt.verify(token, config.SECRET);
		
		const userFound=await userSchema.findById(decoded.id);
		if(!userFound) return res.json({ statusCode: 400,status:'error', message: 'Usuario no Existe'});
		if(userFound.stateUpdate===true) return res.json({ statusCode: 201,status:'success', message:"actualización ya fue realizado"});

		const {...data } = req.body;
		data.stateUpdate=true;
		const updatedUser=await userSchema.findByIdAndUpdate(decoded.id, data);
		return res.json({ statusCode: 200, status: "success"});
				
	} catch (error) {
		return res.json({ statusCode: 400, status: "error",message: error });
	}
		

}

module.exports=authControl;
