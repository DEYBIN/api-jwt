const {Router}= require('express')
const router = Router();
const {...userCtrl}=require('../controllers/auth.controller')
const authJwt= require('../middlewares/authJwt')

router.post('/singUp',userCtrl.signUp);
router.post('/singIn',userCtrl.signIn);
router.post('/register',authJwt.verifyToken,userCtrl.register)
module.exports=router;