const Book = require('../models/Book')
const fs = require('fs');
exports.createThing = (req, res, next) => {
    
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId : req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    book.save()
    .then(() => {res.status(201).json({message: 'Objet enregistré !!'})})
    .catch(error => {res.status(400).json( {error })});

};

exports.modifyThing = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

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