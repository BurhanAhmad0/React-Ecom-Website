const express = require('express')
const path = require('path')
const router = express.Router()

const { uploadProfileImage, uploadProductImage } = require('../Controllers/uploadImageController')

const Auth = require('../Middlewares/Auth')

// Route for user registration
router.post('/profile_picture', Auth, uploadProfileImage)
router.post('/product_image', Auth, uploadProductImage)

module.exports = router
