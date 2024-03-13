const express = require('express');
const router = express.Router();
const articlesControlleurs = require('../controllers/articlesControlleurs');
const {cloudinaryRemoveFile} = require('../tools/cloudinary')
const multerUpload = require('../tools/multer');





// création de upload pour la gestion des fichies


 //sans paramettre multer enregistre le fichier en mémoire que sur le disque
//creation des croutes 
//----------------------------------------------------------------------------------------------------

//Récupération de tous les articles
router.route('/articles').get(articlesControlleurs.getArticles);

//Récupération des tous les articles par id de USer

router.route('/articles/:id').get(articlesControlleurs.getArticlesById);

//Mettre à jour un article particulièrement

//On utilise upload.fields afin de pouvoir utiliser plusieurs champs des fichiers dans la requête, c'est une méthode multer
router.route('/articles/:idusers').put(articlesControlleurs.updataArticlesById);

//ajouter un article

router.route('/articles').post(multerUpload.fields([{ name: 'articlepdf' }, { name: 'articleimage' }]),articlesControlleurs.createArticles);

//suppression d'un articles

router.route('/articles/:idarticles').delete(articlesControlleurs.deleteArticleById);

//----------------------------------------------------------------------------------------------------

//export du router

module.exports = router;