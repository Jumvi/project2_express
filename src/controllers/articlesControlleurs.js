const articles = require('../model/Articles');
const fs = require('fs');
const cloudinary = require('../tools/cloudinary');
const {cloudinaryUploadFiles}= require('../tools/cloudinary');
const {cloudinaryRemoveFile} = require('../tools/cloudinary')






// Récupération de tous les articles 

console.log('debut récupération article');
exports.getArticles = async (req, res) => {
    console.log('mes article', articles);
    try {
        const article = await articles.findAll();
        console.log('Début de la récupération des articles...');

        res.json(article);
        console.log('Début de la récupération avec succes...', article);

    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error);
        res.status(500).json({ message: error.message });
    }
}

// Récupération des articles par ID
exports.getArticlesById = async (req, res) => {
    try {
        const { idarticle } = req.params;
        const articleById = await articles.findByPk(idarticle);
        if (!articleById) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        console.log('les articles récupéré avec succées');

        res.json(articleById);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article par ID', error);
        res.status(500).json({ message: error.message });
    }
}

// Mettre à jour un article
exports.updataArticlesById = async (req, res) => {
    try {
        const { idarticle } = req.params;
        const { title, content } = req.body;
        const { articleimage, articlepdf } = req.files;

        // Récupérer l'article existant
        let article = await articles.findByPk(idarticle);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        // Mettre à jour les données de l'article
        article.content = content;
        article.title = title;

        // Mettre à jour les URL des fichiers si de nouveaux fichiers ont été téléchargés
        if (articleimage && articleimage.length > 0) {
            const pathImage = articleimage[0].path;
            const cloudImg = await cloudinaryUploadFiles(pathImage);
            article.articleimage = cloudImg.secure_url;
        }

        if (articlepdf && articlepdf.length > 0) {
            const pathPdf = articlepdf[0].path;
            const cloudPdf = await cloudinaryUploadFiles(pathPdf);
            article.articlepdf = cloudPdf.secure_url;
        }

        // Enregistrer les modifications dans la base de données
        await article.save();

        console.log('Article mis à jour avec succès');
        res.status(200).json(article);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article', error);
        res.status(500).json({ message: error.message });
    }
}


// Créer un article 
exports.createArticles = async (req, res) => {
    try {
        const { title, content,idusers} = req.body;
        let pdfUrl;
        let imgUrl;


        if(req.files && req.files.articleimage && req.files.articlepdf){
                // téléchargements du pdf
            const pathPdf = req.files.articlepdf[0].path;
            const cloudPdf = await cloudinaryUploadFiles(pathPdf);
            pdfUrl = cloudPdf.secure_url;

            //Téléchargements images
            const pathImage = req.files.articleimage[0].path;
           const cloudImg = await cloudinaryUploadFiles(pathImage);
           imgUrl = cloudImg.secure_url;
        }

        const article = await articles.create({title,
            content,
            idusers,
            articleimage:imgUrl,
            articlepdf:pdfUrl
        });
       
        
        console.log('article ajouter avec succés');
        res.status(201).json(article);//requete reussit et nouvelle ressource créée (status(201))
    } catch (error) {
        console.error('Erreur lors de la création d\'un article', error);
        res.status(500).json({ message: error.message });
    }
}

// Suppression d'un article 
exports.deleteArticleById = async (req, res) => {
    try {
        const { idarticle } = req.params;
        const article = await articles.findByPk(idarticle);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        // suppression des fichiers dans le cloud avec cloudinary
        await  cloudinaryRemoveFile(idarticle);

        //suppression des fichiers dans la base des données
        await article.destroy();

        console.log('supprimé avec succés');

        res.json({ message: 'L\'article a été supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article', error);
        res.status(500).json({ message: error.message });
    }
}
