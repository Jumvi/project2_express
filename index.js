//require dependaces
//----------------------------------------------------------------------------------------------------


const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;


//middleware 
//----------------------------------------------------------------------------------------------------


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json())

//Routes
//----------------------------------------------------------------------------------------------------

const articleRoutes = require('./src/routes/articlesRoutes');
const usersRoutes = require('./src/routes/usersRoutes')

app.use('/api',articleRoutes);
app.use('/api',usersRoutes);

//Gestion d'erreur
//-----------------------------------------------------------------------------------------------

//Erreur 404 qui se declanche lorsque la route demandée n'est pas retrouvée
// app.use((req,res,next)=>{
//     const error = new Error('Not Found');
//     error.status = 404;
//     console.error('Not Found');
//     next(error)// permet de passer à l'erreur suivante
// })

//----------------------------------------------------------------------------------------------------

// Autres erreurs 

// app.use((err,req,res,next)=>{
//     res.status(err.status || 500);

//     res.json ({
//         message: err.message,
//         error:req.app.get('env') === 'development' ? err.stack : {}
//     });
// })
// //----------------------------------------------------------------------------------------------------

// Lancement du serveur 

app.listen(PORT, ()=>{
    console.log('votre serveur tourne sur le port 30000');
})
//----------------------------------------------------------------------------------------------------



