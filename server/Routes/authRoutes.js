const express = require('express')
const router = express.Router()

const { RegisterUser, LoginUser, LogoutUser } = require('../Controllers/authController')

const Auth = require('../Middlewares/Auth')

// Route for user registration
router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.post('/logout', LogoutUser)

module.exports = router
