const express = require("express");
const router = express.Router();
const {
	chatListController,
	chatidSearchController,
	lastReadUpdateController,
} = require("../controllers/chat.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

// const user_id = "1"; // (sprint3 todo)

router.get("/", isAuthenticated, chatListController);

router.put("/", isAuthenticated, lastReadUpdateController);

router.post("/", isAuthenticated, chatidSearchController);

module.exports = router;
