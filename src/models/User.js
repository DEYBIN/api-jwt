import {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema =new Schema({
	email:{type:String,unique:true},
	name:String,
	lastName:String,
	birthDate:Date,
	documento: String,
	licencia: Object,
	celular: String,
	address: String,
	password:{type:String, required:true},
	nickName:String,
	stateUpdate:{type: Boolean, default: false},
	roles:[{
		ref:"Role",
		type:Schema.Types.ObjectId
	}]

	},{
		timestamps:true,
		versionKey:false
	}
);
userSchema.statics.encryptPassword=async(password)=>{
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password,salt);
};
userSchema.statics.comparePassword=async(password,receivedPassword)=>{
	return await bcrypt.compare(password,receivedPassword)
};


export default model('User',userSchema)