const express = require("express");
const upload = require("../Middlewares/multer.js");
const router = express.Router();

const {
  uploadProfileImage,
  uploadProductImage,
} = require("../Controllers/uploadImageController.js");

const Auth = require("../Middlewares/Auth");

// Route for user registration
router.post(
  "/profile_picture",
  Auth,
  upload.single("image"),
  uploadProfileImage
);
router.post("/product_image", Auth, upload.single("image"), uploadProductImage);

module.exports = router;
