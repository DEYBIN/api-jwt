import mongoose from 'mongoose'
const URI = process.env.DB_MONGODB_URI?process.env.DB_MONGODB_URI:'mongodb://localhost/api-db'
mongoose.connect(URI,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify:false,
	useCreateIndex:true
})
.then(db=>console.log('Db is connect'))
.catch(error=>console.log(error))