import { body, check } from "express-validator";
import { User } from "../models/users.js";

//custom validation method to find duplicate emails
const checkDuplicateEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    return Promise.reject("This email already in use!");
  }
};

export const usersValidations = [
  check("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name field is a required field!")
    .matches(/^[A-Za-z\s]{3,}$/)
    .withMessage("Please use Alphabets and space only for Name field!"),

  body("birthdate")
    .trim()
    .notEmpty()
    .withMessage("Birthdate field is a required field!")
    .isDate()
    .withMessage("Please provide a date for Birthdate field!"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required field!")
    .isEmail()
    .withMessage("Invalid Email!")
    .custom(checkDuplicateEmail)
    .normalizeEmail(),

  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
    .withMessage("Invalid Password!"),

  // body("address.city").trim().escape().notEmpty().withMessage("City is a required field!"),

  // body("address.zipcode")
  //   .trim().escape()
  //   .notEmpty()
  //   .withMessage("Zipcode is a required field!"),

  // body("address.street").trim().escape().notEmpty().withMessage("Street is a required field!"),

  // body("address.building")
  //   .trim().escape()
  //   .notEmpty()
  //   .withMessage("Building is a required field!"),
];


export const userValidationLogin = [
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please provide email!")
    .isEmail()
    .withMessage("Please use a valid email!")
    .normalizeEmail(),

  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please provide password!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
    .withMessage(
      "Please use at least one upper/onelower case letter + one digit in the password"
    ),
];