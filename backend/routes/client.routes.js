//import clientCtrl from '../controllers/client.controller'
const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/client.controller');


router.get('/',clientCtrl.findAllClient);

router.get('/:id',clientCtrl.clientById);

router.post('/',clientCtrl.createClient);

router.delete('/:id',clientCtrl.deleteClient);

router.put('/:id',clientCtrl.updateClient);

module.exports = router;