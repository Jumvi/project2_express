import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { useForm } from 'react-hook-form';
import Articles from '../composants/articles';


function Accueil() {
    const [articleData, setArticleData]=useState([]);
    const [title,setTitle]=useState('');
    const [content,setContent] = useState('');
    const [inputImg,setInputImg] = useState();
    const [inputPdf,setInputPdf] = useState();

    const {register,handleSubmit, formState:{errors},setValue,reset} = useForm();



    const urlArticles = 'http://localhost:3000/api/articles';


         
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(urlArticles).then((response)=>{
                    setArticleData(response.data);
                    console.log('je', response.data); 
                });
                // Affiche les données mises à jour
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
    
        fetchData();   
    }, []);


 const getUrlPdf = (e)=>{

    const urlPdf = e.target.files[0];
    setInputPdf(urlPdf);
    
 }

 const getUrlImg = (e)=>{
    const urlPdf = e.target.files[0];
    setInputImg(urlPdf);
    
 }

 const onSubmit = async(data)=>{
    
    try{
        setTitle(data.title);
        setContent(data.content);

        console.log('image1',inputImg, '2 ',inputPdf);

        await axios.post(urlArticles,{
            title:title,
            content:content,
            articleimage:inputImg,
            articlepdf:inputPdf,
            idusers:1
        })
        setValue('title','');
        setValue('content','');
        setValue('articlepdf','');
        setValue('articleimage','');
    }catch(error){
        console.error(error);
    }
        
 }

    return (
        <div className='bg-black' >
            <h2 className='text-red-500' >BIENVENU DANS TON ESPACE BLOG </h2>
                <h3>Créer vos articles </h3>

                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <label htmlFor="title">Titre:</label>
                    <input {...register('title', { required: true })} placeholder="Titre" />

                    <label htmlFor="content">Contenu:</label>
                    <input {...register('content', { required: true })} placeholder="Contenu" />

                     <label htmlFor="articlepdf">Ajouter un PDF:</label>
                     <input type="file" {...register('articlepdf', { required: true })} onChange={getUrlPdf} />

                    <label htmlFor="articleimage">Ajouter une image:</label>
                    <input type="file" {...register('articleimage', { required: true })} onChange={getUrlImg}   />

                    <button type="submit">Envoyer</button>
                </form>

        <Articles fetchData={articleData}/>

        </div>

    );
}

export default Accueil;