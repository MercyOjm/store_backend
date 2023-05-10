import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "`User` is a required field!"],
  },

  items: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          required: [true, "`Quantity` is a required field!"],
          min: 1,
          default: 1,
        },
      },
    ],
    default: [],
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  description: String,
  is_checkout: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["pending", "dispatch", "shipped", "delivered"],
    default: "pending",
  },
});

export const Cart = model("Cart", cartSchema);
