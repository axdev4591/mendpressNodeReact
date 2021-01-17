const express = require('express');
const router = express.Router();
const authenticate  = require('../middleware/authenticate');
const usersCtrl = require('../controllers/users')
//const util = require('../../util')

router.post('/signup', usersCtrl.signup)

router.post('/signup', usersCtrl.signup)

router.post('/login', usersCtrl.login)

router.put('/:id', usersCtrl.updateUser)

router.post('/createAdmin', usersCtrl.createAdmin)

router.post('/new-address', authenticate, usersCtrl.createAddress);

router.get('/get-addresses/:userId', authenticate, usersCtrl.getAddress);



module.exports = router;