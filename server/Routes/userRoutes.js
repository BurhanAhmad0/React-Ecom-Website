const express = require("express");
const router = express.Router();

const {
  User,
  UpdateUser,
  DeleteUser,
} = require("../Controllers/userController.js");

const Auth = require("../Middlewares/Auth.js");

// Route for user
router.get("/", Auth, User);
router.put("/:id", Auth, UpdateUser);
router.delete("/:id", Auth, DeleteUser);

module.exports = router;
