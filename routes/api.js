const express = require('express')

const {body} = require('express-validator');

const router = express.Router()

const apiController = require('../Controllers/ApiController');

router.post(
    '/checkTransactionStatus',apiController.CheckTransactionValidity
)

router.post(
    '/getPaymentHistory',apiController.GetPaymentHistory
)


module.exports = router;