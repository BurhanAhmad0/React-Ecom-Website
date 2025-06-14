const express = require('express')
const multer = require('multer') 
const path = require('path')
const router = express.Router()

const { uploadProfileImage, uploadProductImage } = require('../Controllers/uploadImageController')

const Auth = require('../Middlewares/Auth')

const upload = multer({ dest: 'temp/' }); // Temporarily store file

// Route for user registration
router.post('/profile_picture', upload.single('image'), Auth, uploadProfileImage)
router.post('/product_image', upload.single('image'), Auth, uploadProductImage)

module.exports = router
