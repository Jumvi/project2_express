const users = require('../model/Users');


//recupération de tous les utilisateurs
exports.getUsers = async(req,res)=>{
    try{
        console.log('jud récupre dara');
        const user = await users.findAll();
        res.json(user);
    }catch(error){
        console.error('Erreur lors de la récupétations des utilisateurs',error);
        res.status(500).json({message:error.status})
    }
}

//creation d'un nouvel utilisateur

exports.createUsers = async(req,res)=>{
    try{
        const {name,username,userpass} = req.body;

        const newUser = await users.create({name,username,userpass});
        res.json(newUser);
    }catch(error){
        console.error('Erreur lors de l\'ajout d\'un utilisateur',error);
        res.status(500).json({message:error.status})
    }
}

//mettre à jour les données d'un utilisateurs

exports.updateUsersById = async(req,res)=>{
    try{
        const {iduser} = req.params;
        const {name,userName,userPass}= req.body;

        const user = await users.findByPk(iduser);

        if(!user){
            res.json('L\'utilisateur est intouvable où n\'existe pas');
        }else{
            user.name = name;
            user.userName = userName;
            user.userPass = userPass;
            
            await user.save();
            res.status(200).json({message:'Mise à jour réussie'});

        }
    }catch(error){
        console.error('Erreur lors de la mise à jour',error);
        res.status(500).json({message:error.status});
    }

}

// suppression d'un utilisateur

exports.deleteUsersById = async(req,res)=>{
    try{
        const {iduser} = req.params;

        const user = await users.findByPk(iduser);

        if(!user){
            res.json('L\'utilisateur que vous desirez supprimer est introuvable');
        }else{
            await user.destroy();
            res.status(200).json({message:'L\'utilisateur supprimé avec succés'});
        }
    }catch(error){
        console.error('Erreur lors de la suppression de l\'utilisateur',error);
        res.status(500).json({message:error.status})
    }
}

