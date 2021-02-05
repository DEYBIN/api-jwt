const {Router}= require('express')
const router = Router();
const {...userCtrl}=require('../controllers/auth.controller')
const { authJwt }= require('../middlewares/index')
router.post('/singUp',userCtrl.signUp);
router.post('/singIn',userCtrl.signIn);
router.post('/register',authJwt.verifyToken,userCtrl.register)
export default router;