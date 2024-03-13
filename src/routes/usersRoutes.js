const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControleurs');

// Definition des routes
//---------------------------------------------------------------------------------------------------

// Route pour récupération des tous les users

router.route('/users').get(usersControllers.getUsers);

//creation d'un nouveau USer
router.route('/users').post(usersControllers.createUsers);

// Route pour mettre à jour un User 

router.route('/users/:id').put(usersControllers.updateUsersById);

//route pour la suppression d'un user

router.route('/users/:id').delete(usersControllers.deleteUsersById);

//--------------------------------------------------------------------------------------------------
//exportation du router


module.exports = router;