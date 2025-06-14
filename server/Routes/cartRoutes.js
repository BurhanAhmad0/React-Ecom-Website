const express = require('express')
const router = express.Router()

const { GetCartProducts, AddToCart, RemoveFromCart, UpdateCartProductQuantity } = require('../Controllers/cartControllers')

const Auth = require('../Middlewares/Auth')

// Route for user registration
router.get('/', Auth, GetCartProducts)
router.post('/:id', Auth, AddToCart)
router.delete('/:id', Auth, RemoveFromCart)
router.put('/:id', Auth, UpdateCartProductQuantity)

module.exports = router
