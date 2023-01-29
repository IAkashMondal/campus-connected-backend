const express = require("express");
const ChatRouter = express.Router();
const { auth } = require("../middleware/auth.middleware");
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controller/chats.controller");
ChatRouter.route("/").get( auth, fetchChats);
ChatRouter.route("/").post( auth, accessChat);
ChatRouter.route("/group").post( auth, createGroupChat);
ChatRouter.route("/rename").put( auth,renameGroup);
ChatRouter.route("/groupremove").put( auth, removeFromGroup);
ChatRouter.route("/groupadd").put( auth, addToGroup);
module.exports={
    ChatRouter
}
