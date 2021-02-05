const {Schema,model}= require('mongoose')

const rolesSchema =new Schema({
	name:String
},{
	timestamps:true,
	versionKey:false
})

module.exports =model('Role',rolesSchema)