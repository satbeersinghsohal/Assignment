const express = require('express');
const router = express.Router();
// const adminController = require('../const')

const adminController = require('../controller/admin');

var user = null;

router.get('/', adminController.fetchLeads)



router.post('/claimlead',adminController.claimALead)

router.post('/signup',adminController.signup)

router.post('/signin',adminController.signin)


module.exports = router