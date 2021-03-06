const express = require('express');
const imageController = require('../controllers/image')
const router = express.Router();

router.get('/', imageController.addImage);
router.post('/', imageController.postImage);

module.exports = router;