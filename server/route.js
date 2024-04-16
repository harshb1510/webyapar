import {Router} from "express";
const router = Router();
import * as controller from './appController.js';

//post requests
router.post('/adminLogin', controller.adminLogin);
router.post('/userLogin', controller.userLogin);
router.post('/createuser',controller.createUser);
router.post('/saveUserDetails',controller.saveUser);

//get requests
router.get('/getusers',controller.getUsers);


export default router;

