import express from "express";
import { getProductList, addNewProduct, updateProduct, deleteProduct } from "../controllers/products.js";
import { validate } from '../validation/validator.js';
import { productValidations } from "../validation/products.js";
import { protect, restrictTo } from "../middlewares/auth.js";
const router = express.Router();

router.route('/')
    .get(protect(), getProductList)
    .post(protect(), restrictTo('admin', 'supply'), validate(productValidations), addNewProduct);

router.route('/:pid')
    .put(protect(), restrictTo('admin'), updateProduct)
    .delete(protect(), restrictTo('admin'), deleteProduct)


export default router;