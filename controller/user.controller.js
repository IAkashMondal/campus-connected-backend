const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../configs/token.genarate");
// Register User---------------------------------------------------------------------------->

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, pic } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.send({ email: "Email already exists" });
    } else {
      try {
        bcrypt.hash(password, 6, async (err, new_hash_pass) => {
          if (err) {
            console.log(err);
          } else {
            const user = new UserModel({
              email,
              password: new_hash_pass,
              name,
              pic,
            });
            await user.save();

            res.send({ massege: `User register` });
          }
        });
      } catch (err) {
        console.log({ massge: "register link not working", err });
        res.send(err);
      }
    }
  });
});

// Login User---------------------------------------------------------------------------->
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { Userid: user[0]._id },
            process.env.JWT_SECRET
          );
          console.log(user, "login user deatils");
          await UserModel.findByIdAndUpdate(user[0]._id, {
            lastLogin: new Date().toLocaleTimeString()
          });
          res.send({ massege: "User login", campus_connect_token: token });
        } else {
          res.send({ massege: "wrong credentials1" });
        }
      });
    } else {
      res.send({ massege: "wrong credentials2" });
    }
  } catch (err) {
    console.log({ massege: "login faild", err });
    res.send(err);
  }
});

// searchUser---------------------------------------------------------------------------->
const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword);
  res.send(users);
});

// User Logout---------------------------------------------------------------------------->
const Userlogout = asyncHandler(async (req, res) => {
  const userId = req.body;
  res.send(userId)
  try {
    if (userId) {
      await UserModel.findByIdAndUpdate(userId, {
        lastSeen: new Date().toLocaleTimeString(),
      });
      localStorage.removeItem("campus_connect_token");
      res.send({ message: "User logged out successfully" });
    } else {
      res.status(200);
      res.send({ massege: "someThing went Wrong" });
    }
  } catch {
    res.status(200);
    res.send({ massege: "someThing went Wrong" });
  }
  console.log(userId,"uderId")
});

module.exports = {
  registerUser,
  LoginUser,
  searchUsers,
  Userlogout,
};
