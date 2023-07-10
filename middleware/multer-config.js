/*const multer = require('multer');
const sharp = require('sharp')

const MIME_TYPES = {
    'image/jpg': 'webp',
    'image/jpeg': 'webp',
    'image/png': 'webp'
};
module.exports = (req, res, next, ) => {
    if (req.file) {
        console.log(req.file.size);
        sharp(req.file.path).resize({width:50})
        .toFile(req.file.path.replace())
    } else {
        console.log('Il n\'y a pas d\'image');
    }
   
        next();
  }

const storage = multer.diskStorage({
    destination: (req, file, callback, resizedImage) => {
        callback(null,'images');
    },
    filename: (req, file, callback, resizedImage) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        
    }
})
module.exports = multer({storage: storage}).single('image');*/

const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'webp',
    'image/jpeg': 'webp',
    'image/png': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        if (req.file) {
            const name = file.originalname.split(' ').join('_');
            const extension = MIME_TYPES[file.mimetype];
            const filename = name + Date.now() + '.' + extension;

           
           const imageResized = async () => {
            try{const resized =  sharp(req.file.path)
                
                console.log(req.file.path)
                /*.rotate(90)*/
                    .resize(90,90 )
                    .toBuffer();
                    fs.writeFileSync('../images/hello.jpg',resized )
                    console.log(resized)
                    console.log('tout va bien !!')
                    /*.toFile(`images/${filename}`, (err, info) => {
                        if (err) {
                            // Gérez les erreurs de redimensionnement ici
                            
                            return callback(err);
                            
                        }
                        
                        callback(null, filename);
                    });}*/
                 }
            
                 catch(error){console.log(error)}
           } // Utilisez Sharp pour redimensionner l'image avant de l'enregistrer
           imageResized()
        } else {
            // Pour les autres éléments du formulaire, utilisez le nom d'origine du fichier sans redimensionnement
            callback(null, file.originalname);
        }
    }
});

module.exports = multer({ storage: storage }).single('image');





 






