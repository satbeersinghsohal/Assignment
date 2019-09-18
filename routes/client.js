const express = require('express');
const router = express.Router();

const clientController = require('../controller/client') 	


router.post('/form', clientController.storedetails)



module.exports = router;
