const express = require('express');
const router = express.Router();
const  stuffCtrl  = require('../controller/stuff.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');


router.get('/bestrating', stuffCtrl.getBestRatingBooks);
router.post('/:id/rating', auth, stuffCtrl.createRating, stuffCtrl.getBookById);
router.post('/', auth,  multer.upload, multer.resizeAndRenameImage, stuffCtrl.createBook);
router.get('/:id', stuffCtrl.getBookById);
router.put('/:id',  auth,   multer.upload, multer.resizeAndRenameImage,  stuffCtrl.modifyBook);
router.delete('/:id', auth, stuffCtrl.deleteBook);
router.get('/', stuffCtrl.getAllBooks );


module.exports = router;