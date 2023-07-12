const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'webp',
    'image/jpeg': 'webp',
    'image/png': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '..', 'images'));
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        const filename = name + Date.now() + '.' + extension;
        callback(null, filename);
    }
});

const upload = multer({ storage: storage }).single('image');

const resizeAndRenameImage = (req, res, next) => {
    if (!req.file) {
        // Aucune image n'a été téléchargée
        return next();
    }

    const name = req.file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[req.file.mimetype];
    const filename = name + Date.now() + '.' + extension;

    // Utilisez Sharp pour redimensionner l'image avant de l'enregistrer
    const outputPath = path.join(__dirname, '..', 'images', filename);
    sharp(req.file.path)
        .resize(200, 300)
        .toFile(outputPath, (err, info) => {
            if (err) {
                // Gérez les erreurs de redimensionnement ici
                return next(err);
            }
            req.file.filename = filename; // Mettez à jour le nom de fichier dans req.file
            next();
        });
};

module.exports = {
    upload,
    resizeAndRenameImage
};