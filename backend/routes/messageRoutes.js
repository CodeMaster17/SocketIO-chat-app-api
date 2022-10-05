const express = require("express");
const {
    allMessages,
    sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages); //fetching messages for one single chat
router.route("/").post(protect, sendMessage); //sending the message

module.exports = router;