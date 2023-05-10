import { body } from "express-validator";
import { Product } from "../models/products.js";

//custom validation method
const duplicateProduct = async (title) => {
  const product = await Product.findOne({ title });
  if (product) {
    return Promise.reject("This product already exist.");
  }
};

//custom validation method
const highPrice = async (price) => {
  if (price > 100000) {
    return Promise.reject("The price is too high!");
  }
};


//custom sanitizer to correct the format of size
const normalizeSize = (size) => {
  return size.toUpperCase()
}

//customer sanitizer to keep 2 decimal digit
const normalizePrice = (price) => {
  return price.toFixed(2)   // 5.3425678  => 5.34
}
//customer sanitizer to keep 1 decimal digit
const normalizeRate = (rate) => {
  return rate.toFixed(1)   // 3.3425678  => 3.3
}


export const productValidations = [
  body("title")
    .trim() //sanitizer to remove white spaces
    .escape() //sanitizer to escape html tags
    .notEmpty()
    .withMessage("Title is required!")
    .custom(duplicateProduct),

  body("brand").optional().escape().trim(),

  body("description").optional().escape().trim(),

  body("size")
    .trim() //snitizer to remove white spaces
    .customSanitizer(normalizeSize) //sanitizer to change the size to upper case
    .optional()
    .isIn([
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL",
      "4XL",
      "5XL",
      "6XL",
      "7XL",
    ])
    .withMessage("Please use one of standard values."),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 0 })
    .withMessage("Minimum price is Zero")
    .custom(highPrice)
    .customSanitizer(normalizePrice),

  body("rate")
    .optional()
    .isNumeric()
    .withMessage("rate must be a number")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Min:0 and Max: 5")
    .customSanitizer(normalizeRate),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("category is required")
    .isIn([
      "Tops",
      "Bottoms",
      "Dresses",
      "Outerwear",
      "Activewear",
      "Swimwear",
      "Sleepwear",
      "Underwear",
      "Accessories",
      "Shoes",
      "Tshirts",
    ])
    .withMessage("Please use one of standard values."),

  body("image").optional().trim().escape(),
];
