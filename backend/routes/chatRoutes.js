const express = require("express");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

// creating the routes

const router = express.Router();

router.route("/").post(protect, accessChat); //accessing the chat and creating the chat
router.route("/").get(protect, fetchChats); //getting all the chats from the database for that particular user
router.route("/group").post(protect, createGroupChat); //route for creating a group chat
router.route("/rename").put(protect, renameGroup); //renaming the group
router.route("/groupremove").put(protect, removeFromGroup); //remove the user from the group
router.route("/groupadd").put(protect, addToGroup); //add a user to the group

module.exports = router;