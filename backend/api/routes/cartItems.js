const express = require('express')
const router = express.Router();
const cartItemsCtrl =  require('../controllers/cartItems')


router.post('/add', cartItemsCtrl.addToCart);

router.post('/user/:userId', cartItemsCtrl.getUserCartItems)

router.put('/update/quantity', cartItemsCtrl.QtyUpdate)

module.exports = router;