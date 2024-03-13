const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestion_articles', 'jumvi', 'judahmvi', {
    host: 'localhost',
    dialect: 'postgres' 
});


const {articles} = require('../model/Articles');
const {users} = require('../model/Users');

// Synchroniser le modèle avec la base de données
sequelize.sync({force:false})
  .then(() => {
    console.log('Le modèle a été synchronisé avec la base de données.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation du modèle avec la base de données :', error);
  });




// Test de la connexion à la base de données
async function testDbConnect() {
    try {
        await sequelize.authenticate();
        console.log('La connexion à la base de données a été établie avec succès.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données:', error);
    }
}

// Appel de la fonction pour tester la connexion
testDbConnect();

module.exports = {sequelize, articles,users};
