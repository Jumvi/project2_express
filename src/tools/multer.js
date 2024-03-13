const express = require('express');
const router = express.Router();
const multer = require('multer');
const {cloudinary} = require('../tools/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryConfig = require('./cloudinaryConfig'); // Importez la configuration Cloudinary

// Configurez Cloudinary avec vos informations d'identification
cloudinary.config(cloudinaryConfig);

// Configurez le stockage avec Multer pour Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Nom du dossier dans Cloudinary où les fichiers seront stockés
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'], // Formats de fichiers autorisés
    // Autres paramètres facultatifs...
  },
});

// Initialisez Multer avec le stockage Cloudinary
const multerUpload = multer({ storage: storage });



module.exports = multerUpload;
