const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controller/message.controller");
const { auth } = require("../middleware/auth.middleware");

const MessagerRouter = express.Router();

MessagerRouter.route("/:chatId").get(auth,allMessages);
MessagerRouter.route("/").post(auth,sendMessage);

module.exports = {
  MessagerRouter,
};
