const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const productCtrl = require('../controllers/products')
const multer = require('../middleware/multer-config')


router.post('/create', authenticate, multer, productCtrl.createProduct)

router.get('/', productCtrl.getAllProducts)

router.get('/:filter', productCtrl.getAllProducts)

router.get('/:categorySlug/:filter', productCtrl.getProductsByCategory);

router.get('/detail/:categorySlug/:productSlug', productCtrl.getSingleProduct);

router.put('/update/:id', authenticate, multer, productCtrl.updateProduct)

router.delete('/delete/:id', authenticate, multer, productCtrl.deleteProduct)


module.exports = router;