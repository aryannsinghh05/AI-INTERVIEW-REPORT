const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlacklistedTokenModel = require("../models/blacklist.model");

/**
 * @name registerUserController
 * @description register a new user with username , email and password
 * @access Public
 */
async function registerUserController(req,res){
    // Taking input of username,email,pass from the body
    const {username , email , password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide username , email and password :("
        })
    }
    //checking user exist or not
    const userexist = await userModel.findOne({
        $or: [{username},{email}]
    })
    if(userexist){
        return res.status(400).json({
            message: "Username or email already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token =  jwt.sign(
        {id: user._id , username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token" , token);

    res.status(201).json({
        message: "User registered :)",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }        
    })

}

/**
 * @name loginUserController
 * @description Login a user with email and password in requested body
 * @access Public
 */
async function loginUserController(req,res){
    const {email , password}  = req.body

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "Email or Password invalid."
        })
    }

    const passwordCorrect = await bcrypt.compare(password , user.password);

    if(!passwordCorrect){
        return res.status(400).json({
            message: "Email or Password invalid."
        })
    }

    const token =  jwt.sign(
        {id: user._id , username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token" , token);

    res.status(200).json({
        message: "LoggedIn success.",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }

    })

}

/**
 * @name logoutUserController
 * @description Logs out the user and clears token and add it to the blacklisted token
 * @access Public
 */
async function logoutUserController(req,res){
    const token = req.cookies.token;

    if(token){
        await BlacklistedTokenModel.create({token});
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully :)"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user detail.
 * @access Private
 */
async function getMeController(req,res){

    const user = await userModel.findById(req.user.id);


    res.status(200).json({
        message:"User Details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}