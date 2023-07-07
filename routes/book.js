const express = require('express');
const router = express.Router();
const  stuffCtrl  = require('../controller/stuff.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js')

router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getStuffById);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/', stuffCtrl.getAllThing );

module.exports = router;