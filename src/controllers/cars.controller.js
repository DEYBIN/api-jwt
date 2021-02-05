const carsSchema = require( '../models/Cars')
const jwt = require( 'jsonwebtoken')
const config = require( '../config')
export const cars=async (req,res)=>{
	try {
		const data= await carsSchema.find();
		if(!data) data=[];
		return res.json({statusCode:200,status:'success',data});
	} catch (error) {
		return res.json({statusCode:400,status:'error',message:error});
	}
}

export const car=async (req,res)=>{
	try {
		console.log(req.params.id)
		const data= await carsSchema.findById(req.params.id);
		if(!data) data=[];
		return res.json({statusCode:200,status:'success',data});
	} catch (error) {
		return res.json({statusCode:400,status:'error',message:error});
	}
}


export const register=async (req,res)=>{
	try {

		let token = req.headers["x-access-token"];
		const decoded = jwt.verify(token, config.SECRET);
		




		const carsFound= await carsSchema.findOne({SERIE:req.body.SERIE,MOTOR:req.body.MOTOR,VIN:req.body.VIN});
		if(carsFound) return res.json({ statusCode: 400,status:'error', message: 'Movilidad ya se encuentra registrado'});
		
		const newCar= new carsSchema({
			...req.body,
			id_user:decoded.id
		});

		const data= await newCar.save()
		return res.json({ statusCode: 200, status: "success",data});
				
	} catch (error) {
		return res.json({ statusCode: 400, status: "error",message: error });
	}
		

}

export const update=async (req,res)=>{
	try {

		let token = req.headers["x-access-token"];
		const decoded = jwt.verify(token, config.SECRET);
		
		const carsFound= await carsSchema.findOne({id_user:decoded.id});
		if(!carsFound) return res.json({ statusCode: 400,status:'error', message: 'Movilidad fue registrado por otro conductor'});

		const {...data } = req.body;
		
		const updatedUser=await carsSchema.findByIdAndUpdate(req.params.id, data);
		return res.json({ statusCode: 200, status: "success",data:updatedUser});
				
	} catch (error) {
		return res.json({ statusCode: 400, status: "error",message: error });
	}
		

}

export const deletes =async (req,res)=>{
	try {

		// let token = req.headers["x-access-token"];
		// const decoded = jwt.verify(token, config.SECRET);
		
		// const userFound=await userSchema.findById(decoded.id);
		// if(!userFound) return res.json({ statusCode: 400,status:'error', message: 'Usuario no Existe'});
		// if(userFound.stateUpdate===true) return res.json({ statusCode: 201,status:'success', message:"actualización ya fue realizado"});

		// const {...data } = req.body;
		// data.stateUpdate=true;
		// const updatedUser=await userSchema.findByIdAndUpdate(decoded.id, data);
		return res.json({ statusCode: 200, status: "success"});
				
	} catch (error) {
		return res.json({ statusCode: 400, status: "error",message: error });
	}
		

}
