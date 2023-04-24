const express = require("express");
const router = express.Router();
const {
	MsgListController,
	createMsgController,
} = require("../controllers/message.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/:chatId", isAuthenticated, MsgListController);

router.post("/:chatId", isAuthenticated, createMsgController);

module.exports = router;
