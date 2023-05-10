import { User } from "../models/users.js";
import { Product } from "../models/products.js";
import { Cart } from "../models/carts.js";



// GET /products/
export const getProductList = async (req, res, next) => {
    try {
        const products = await Product.find();
        res
            .header('Access-Control-Allow-Credentials', true)
            .status(200).json({
            message: 'Product list',
            products
        })
    } catch (error) {
        next(error)
    }
}


// POST /products/
export const addNewProduct = async (req, res, next) => {
    try {
        console.log('controller');
        const newProduct = await Product.create(req.body);
        res.status(200).json({
            message: 'add new product!',
            newProduct
        })
    } catch (error) {
        next(error)
    }
}


// PUT /:pid
export const updateProduct = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}


// DELETE /:pid
export const deleteProduct = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}