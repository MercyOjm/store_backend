import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "`Title` is a required field!"],
  },

  brand: String,
  description: String,
  size: {
    type: String,
    enum: [
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
    ],
  },

  price: {
    type: Number,
    required: [true, "`Price` is a required field!"],
    min: 0,
  },

  rate: {
    type: Number,
    min: 0,
    max: 5,
  },

  category: {
    type: String,
    enum: [
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
      "Tshirts"
    ],
    required: [true, "`Category` is a required field!"],
  },

  image: {
    type: String,
  },
});

export const Product = model("Product", productSchema);
