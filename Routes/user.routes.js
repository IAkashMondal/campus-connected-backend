const express= require("express");
const { registerUser, LoginUser, searchUsers, Userlogout } = require("../controller/user.controller");
const {  auth } = require("../middleware/auth.middleware");
const userRouter= express.Router();
userRouter.route("/").get(auth, searchUsers);
userRouter.post("/register",registerUser);
userRouter.post("/login", LoginUser);
userRouter.post("/logout", Userlogout);
module.exports={
    userRouter
}