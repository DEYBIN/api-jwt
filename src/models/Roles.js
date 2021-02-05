const {Schema,model}= require('mongoose')

const rolesSchema =new Schema({
	name:String
},{
	timestamps:true,
	versionKey:false
})

export default model('Role',rolesSchema)