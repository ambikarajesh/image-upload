const express = require('express');
const imageController = require('../controllers/image')
const router = express.Router();

router.get('/', imageController.addImage);

module.exports = router;