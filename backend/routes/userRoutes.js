const express = require('express')
const { model } = require('mongoose')
const router = express.Router()

const { registerUser } = require("../controllers/userControllers")

// router.route('/').post(registerUser)
// router.post ('/login',authUser)
router.post('/', registerUser);

module.exports = router;