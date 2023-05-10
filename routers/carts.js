import express from "express";
import { getUserCart } from "../controllers/users.js";
import { createCart, updateCart, delProductFromCart, checkoutCart } from "../controllers/carts.js";
const router = express.Router();


router.route('/')
    .post(createCart)

router.route('/:cid')
    .get(getUserCart)
    .put(updateCart)
    .delete(delProductFromCart)

router.route('/:cid/checkout')
    .put(checkoutCart)


export default router;