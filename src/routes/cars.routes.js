const {Router}= require('express')
const router = Router();
const {...carsControl} =require('../controllers/cars.controller')
const authJwt= require('../middlewares/authJwt')
router.get('/',authJwt.verifyToken,carsControl.cars);
router.get('/:id',authJwt.verifyToken,carsControl.car);
router.post('/register',authJwt.verifyToken,carsControl.register);
router.put('/update/:id',authJwt.verifyToken,carsControl.update);
router.delete('/register',authJwt.verifyToken,carsControl.deletes);
module.exports=router;