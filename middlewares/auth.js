import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/users.js";
import createError from "http-errors";

//middleware function to protect routes by verifying tokens
export const protect = function () {
  return async (req, res, next) => {
    let token;
    try {
      //get the token from Authorization header
      const authHeader = req.headers["authorization"];
      token =
        authHeader &&
        authHeader.startsWith("Bearer") &&
        authHeader.split(" ")[1];

      //get token from the cookie
      token = req.cookies.access_token;

      if (!token) {
        throw createError(401, "Token Not Found!");
      }

      /* ----------------------- verify the token ----------------------- */
      const decoded = await verifyToken(token, process.env.JWT_SECRET);
      console.log("decoded:", decoded);
      
      /* ----------- The user deleted after issuing the token ----------- */
      const user = await User.findById(decoded.userid);
      if (!user) {
        throw createError(
          401,
          "The user belongs to given token is deleted recently!"
        );
      }

      /* ----------- password updated after issuing the token ----------- */
      let update_in_sec = user.updated_at && parseInt(user.updated_at.getTime() / 1000);
      
      if (decoded.iat < update_in_sec) {
        throw createError(401, 'Password updated recently, please signin again!')
      }

      req.jwt = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};


//role-based access control
export const restrictTo = (...roles) => { // ['admin', 'supply']
  return (req, res, next) => {
    try {
      //check if allowed roles includes role of my user
      if (!roles.includes(req.jwt.userrole)) {
        throw createError(
          403,
          "You do not have permission to perform this action!"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};