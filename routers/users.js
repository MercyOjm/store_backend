import express from 'express';
import { signup, signin, getUserCart, getUserOrders, updateUser, sendEmail, verify_email } from '../controllers/users.js'
import { validate } from '../validation/validator.js';
import { userValidationLogin, usersValidations } from '../validation/users.js';
import { upload } from '../utils/multer.js';
const router = express.Router();

//register users
// router.route('/signup').post(validate(usersValidations), signup);
router.route('/signup').post(upload.single('picture'), validate(usersValidations),signup);
//verify email
router.route("/verify_email/:userid/:token")
    .get(verify_email);

//authenticate users
router.route('/signin').post(validate(userValidationLogin),signin);

//update user
router.route('/:uid')
    .put(updateUser)
//get cart
router.route('/:uid/cart')
    .get(getUserCart)

//get orders
router.route('/:uid/orders')
    .get(getUserOrders)


//contactus
router.route('/messagefromcustomers')
    .post(sendEmail)


export default router;