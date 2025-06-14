const express = require('express')
const router = express.Router()

const { User, UpdateUser, DeleteUser } = require('../Controllers/userController')

const Auth = require('../Middlewares/Auth')

// Route for user
router.get('/', Auth, User)
router.put('/:id', Auth, UpdateUser)
router.delete('/:id', Auth, DeleteUser)

module.exports = router
