const Book = require('../models/Book')
const fs = require('fs');
const sharp = require('sharp');
const storage = require('multer');


exports.createThing = (req, res, next) => {
    
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    
    
            const book = new Book({
                ...bookObject,
                userId: req.auth.userId,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                
            });
    console.log(book)
    
    book.save()
    .then(() => {res.status(201).json({message: 'Le livre a bien été enregistré !!'})})
    .catch(error => {res.status(400).json( {message: 'Le livre n\'a pas pu être enregistré' })});


};

  exports.modifyThing = (req, res, next) => {
    const bookObject = req.file ? {
        
        ...JSON.parse(req.body.book),
        
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
               
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };



  exports.deleteThing = (req, res, next) => {
    
    Book.findOne({ _id: req.params.id})
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

exports.getAllThing = (req,res,next) => {
    
    Book.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));

}

exports.getStuffById = (req, res, next) => {
    
    Book.findOne({_id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
}

exports.createRating = (req, res, next) => {
    
    Book.findOne({ _id: req.params.id })
        .then((book) => {
        if (book.userId === req.auth.userId) {

            console.log('pas le droit car c\'est ton livre');
        } else {  
            let newRating = {
                userId: req.body.userId,
                grade: req.body.rating
            };
             const newArrayRating = book.ratings 
            newArrayRating.push(newRating) 
            const totalRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
            const averageRating = totalRatings / book.ratings.length;
            book.averageRating = averageRating;
            book.save()
            .then(() => {res.status(201).json({message: 'Vote enregistré !!'})})
            .catch(error => {res.status(400).json( {error })});
            console.log(book)

        }})
    }

    

        exports.getBestRatingBooks = (req, res, next) => {
            Book.find()
              .sort({averageRating: -1})
              .limit(3)
              .then(bestRatedBook => res.status(200).json(bestRatedBook))
              .catch(error => res.status(400).json({error}))
        }

    

        
       
 

