import sgMail from "@sendgrid/mail";
import fs from 'fs';
import { Address, User } from "../models/users.js";
import { Product } from "../models/products.js";
import { Cart } from "../models/carts.js";
import createError from "http-errors";
import { createToken } from "../utils/jwt.js";
import { genVerifyToken, verify_message } from "../utils/verification.js";


let cookieOptions = {
  secure: false,
  httpOnly: true,
  sameSite: true,
  maxAge: 3_600_000 * 48,
};




export const verify_email = async(req, res, next) => {
  try {

    const { userid, token } = req.params;

    //check the userid
    const user = await User.findById(userid);

    if (!user) {
      throw createError(400, 'User not found!')
    }
    
    //in case the user already verified
    if (user.isverified) {
      return res.status(200).send('Thank you for verification. But this account is already verified!')
    }

    //checkting the token value
    const tokenDocument = await Token.findOne({ token });
    if (!tokenDocument) {
      throw createError(400, 'Token is invalid!')
    }


    user.isverified = true;
    await user.save();

    res.status(200).send('Thank you! Registration process completed.')
    
  }catch(error){
    next(error)
  }
}


// POST /users/signup
export const signup = async (req, res, next) => {
  try {
    console.log("controller");

    // destructure and check required fields
    const { name, birthdate, email, password, role } = req.body;
    //create new address

    //create new user
    const newUser = await User.create({
      name,
      birthdate,
      email,
      password,
      picture: '/images/'+req.fileName,
      role,
    });

    //remove password from newUser before sending to frontend
    newUser.password = undefined;
    
    
    /* -------------------- send verification email ------------------- */
    //setup SENDGRID API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    //generate verification token
    const verfiyToken = await genVerifyToken(newUser); // {token: '2g4535fgdg4k4', userid: '2345345'}
    
    //create email message
    const msg = {
      to: newUser.email,
      from: `dani.subaro2020@gmail.com`,
      subject: 'Verify your Account on our Onlineshop 😀',
      html: verify_message(newUser._id, newUser.name, verfiyToken.token)
    }

    //send mail
    const emailResp = await sgMail.send(msg);    
    


    /* -------------------------- create JWT -------------------------- */
    const token = await createToken(
      { userid: newUser._id, userrole: newUser.role },
      process.env.JWT_SECRET
    );  
    
    /* ---------------------------- Cookies --------------------------- */
    //set cookie and store jwt token inside it.
    if (process.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }
    res.cookie("access_token", token, cookieOptions);
  
    
    /* ------------------------- send response ------------------------ */
    res.status(201).json({
      message: "Signup successfully!",
      newUser,
    });

  } catch (error) {
    if (req.file) {
      console.log(`file ${req.file.path} is deleted!`);
      //delete the file with add req.file.path
      fs.unlinkSync(req.file.path)
    }
    next(error);
  }
};

// POST /users/login
export const signin = async (req, res, next) => {
  console.log("signin controller");
  try {
    const { email, password } = req.body;

    //1 find a user with given email address
    const user = await User.findOne({ email });

    //2 compare password and hash value
    // const isMatch = await user.authenticate(password);

    //3. send error while email or password is wrong
    if (!user || !(await user.authenticate(password))) {
      throw createError(401, "Invalid Credentials!");
    }
    //remove password from user document before send to client
    user.password = undefined;

    //create JWT
    const token = await createToken(
      { userid: user._id, userrole: user.role },
      process.env.JWT_SECRET
    );

    //set cookie and store jwt token inside it.
    
    if(process.NODE_ENV === "production") {cookieOptions.secure = true}
    res.cookie("access_token", token, cookieOptions);

    //create another cookie (to have multiple cookies - just for test)
    res.cookie("name", user.name);

    //4. if user found by email and password matched with hash value send response
    res.status(200).json({
      message: "Congrats! You logged in successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /users/:uid
export const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { name, email, password, birthdate } = req.body;

    //find user by uid
    const user = await User.findById(uid);

    if (!user) {
      return createError.NotFound("User not found!");
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.birthdate = birthdate || user.birthdate;

    await user.save();
    user.password = undefined;
    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    next(error);
  }
};

// GET /users/:uid/cart
export const getUserCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// GET /users/:uid/orders
export const getUserOrders = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};


// POST /users/messagefromcustomers
export const sendEmail = async (req, res, next) => {
  try {
    const { email, message } = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      from: "dani.subaro2020@gmail.com", // Change to your recipient
      to: "a.fahimahmadi@gmail.com", // Change to your verified sender
      subject: "Message from Customers",
      html: `Customer Email: ${email}.
             Message: ${message}`,
    };

    const emailResp = await sgMail.send(msg);

    console.log(emailResp);
    res.status(200).json({emailResp})

  } catch (error) {
    next(error);
  }
};




