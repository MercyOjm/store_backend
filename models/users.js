import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  country: String,
  city: String,
  zipcode: String,
  street: String,
  building: String,
  Floor: String,
});

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "`Name` field is required!"],
    match: /^[a-zA-Z\s]{3,}$/,
    message: "Name Pattern doesn't match with the given value!",
  },

  birthdate: {
    type: Date,
    required: [true, "`Birthdate` field is required!"],
  },

  email: {
    type: String,
    required: [true, "`Email` field is required!"],
    unique: [true, "This Email is already in use!"],
  },

  password: {
    type: String,
    required: [true, "`Password` field is required!"],
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    message: "Password pattern doesn't match with the given value!",
  },

  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },

  // address: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Address",
  //   required: [true, "`Address` field is required!"],
  // }, 

  updated_at: {
    type: Date
  },

  isverified: {
    type: Boolean,
    default: false
  },

  picture: {
    type: String,
    default: '/images/default.jpeg'
  }
});


//mongoose middleware to hash the password
userSchema.pre('save', async function (next) {
  try {
    //jump to next middleware if password not modified
    if (!this.isModified('password')) return next();

    //generate the salt value
    const salt = await bcrypt.genSalt(10);
    //hash the password using salt value
    this.password = await bcrypt.hash(this.password, salt);
    // this.updated_at = Date.now();

    next();
  } catch (error) {
    next(error)
  }
})


//! This method will execute if Model.update() called and runValidators enabled.
//mongoose middleware to tag timestamp of password update in DB
userSchema.pre('update', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    //if password modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    //write the time of update in updated_at
    this.updated_at = Date.now();
    next();
  } catch (error) {
    next(error)
  }
})


//mongoose method to compare hash value with plain-text password
userSchema.methods.authenticate = async function (plainTextPass) {
  //this.password is refering to hash value in DB
    return await bcrypt.compare(plainTextPass, this.password);
}


export const Address = model("Address", addressSchema);
export const User = model("User", userSchema);
