import {Router} from 'express';
const router = Router();
import * as userCtrl from '../controllers/auth.controller';
import { authJwt } from '../middlewares/index';
router.post('/singUp',userCtrl.signUp);
router.post('/singIn',userCtrl.signIn);
router.post('/register',authJwt.verifyToken,userCtrl.register)
export default router;