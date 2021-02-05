const {Schema,model}= require('mongoose')

const carSchema =new Schema({
	id_user: String,
	marca:String,
	model:String,
	year:Number,
	color: String,
	placa: {type:String, unique:true},
	MOTOR:String,
	SERIE:String,
	VIN:String,
	ubica: String,
	flota:Number,
	enterprise:String,
	tipo:{type:Number,default:0} //0->taxi- , 1->colectivo
	},{
		timestamps:true,
		versionKey:false
	}
);


module.exports =model('Car',carSchema)