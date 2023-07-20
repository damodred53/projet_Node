require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/book.js');
const userRoutes = require('./routes/user.js');
const path = require('path');


const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_UTILISATEUR}:${process.env.DB_PASSWORD}@cluster0.32smot5.mongodb.net/`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/books', booksRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
module.exports = app;






