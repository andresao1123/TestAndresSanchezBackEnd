const express = require('express')

const {body} = require('express-validator');

const router = express.Router()

const authController = require('../Controllers/authController');

const User = require('../models/user')

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),
        body('password').trim()
    ],authController.signup
)
router.post(
    '/login',authController.login
)

module.exports = router;

