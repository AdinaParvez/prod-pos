const express = require('express')
const {addBillsController, getBillsController} = require('../controllers/billsController')
const router = express.Router()

//routes
//Method - GET
router.get('/get-bills', getBillsController)

//Method - POST
router.post('/add-bills', addBillsController)



module.exports = router