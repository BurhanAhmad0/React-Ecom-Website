const express = require('express')
const path = require('path')
const upload = require('../Middlewares/multer')
const router = express.Router()

const { uploadProfileImage, uploadProductImage } = require('../Controllers/uploadImageController')

const Auth = require('../Middlewares/Auth')

// Route for user registration
router.post('/profile_picture', Auth, upload.single('image'), uploadProfileImage)
router.post('/product_image', Auth, upload.single('image'), uploadProductImage)

module.exports = router
