const express = require("express");
const authcontroller = require("../controllers/auth.controller");
const authmiddleware = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register",authcontroller.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login" , authcontroller.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Logout the user and clears token from the cookie
 * @access Public
 */
authRouter.get("/logout" , authcontroller.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get("/get-me" , authmiddleware.authUser ,authcontroller.getMeController)



module.exports = authRouter;

