//require dependaces
//----------------------------------------------------------------------------------------------------


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


//middleware 
//----------------------------------------------------------------------------------------------------


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
//----------------------------------------------------------------------------------------------------

const articleRoutes = require('./routes/articlesRoutes');
const users = require('./routes/usersRoutes')

app.use('/api/articles',articleRoutes);
app.use('/api/users',users);

//Gestion d'erreur
//-----------------------------------------------------------------------------------------------

//Erreur 404 qui se declanche lorsque la route demandée n'est pas retrouvée
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    console.error('Not Found');
    next(error)// permet de passer à l'erreur suivante
})

//----------------------------------------------------------------------------------------------------

// Autres erreurs 

app.use((err,req,res)=>{
    res.statuts(err.status || 500);

    res.json ({
        message: err.message,
        error:req.app.get('env') === 'developpement' ? err.stack : {}
    });
   
})
//----------------------------------------------------------------------------------------------------

// Lancement du serveur 

app.listen(PORT, ()=>{
    console.log('votre serveur tourne sur le port 30000');
})
//----------------------------------------------------------------------------------------------------



