const express = require('express');
const router = express.Router();
const  stuffCtrl  = require('../controller/stuff.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js')
const sharp = require('../middleware/sharp.js')
router.get('/bestrating', stuffCtrl.getBestRatingBooks);
router.post('/:id/rating', auth, stuffCtrl.createRating);
router.post('/', auth,  multer, stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getStuffById);
router.put('/:id',  auth,   multer,  stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/', stuffCtrl.getAllThing );


module.exports = router;