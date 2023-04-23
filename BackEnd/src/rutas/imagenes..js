
const { Router } = require('express');
const {Imagenes, Links} = require('../Database/db');

 
  

const router = Router();
 
let imagenes = [
    {
        name: "Instagran",
        url: "https://cdn.worldvectorlogo.com/logos/instagram-2016-6.svg"
    },
    {
        name: "Facebook",
        url: "https://cdn.worldvectorlogo.com/logos/facebook-3-2.svg"
    },

    {
        name: "Gihut",
        url: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg"
    },

    {
        name: "Youtube",
        url:  "https://cdn.worldvectorlogo.com/logos/youtube-icon.svg"
    },
    {
        name: "Twitter",
        url: "https://cdn.worldvectorlogo.com/logos/twitter-6.svg"
    }
]

router.get('/', async (req, res, next) => {
    try 
    {
        const ImagenesList = await Imagenes.findAll();
        
        if (ImagenesList.length === 0) {
            // cargar primera vez Types de Pokemon a DB
            try{
                
                const listaImagen = imagenes.map((i) => {
                    return { 
                        name: i.name,
                        url: i.url 
                    }
                    });
             console.log(listaImagen);
         let ImaList =   await Imagenes.bulkCreate(listaImagen);
             let imaLis = await Imagenes.findAll({
                incllude: {
                    model: Links,
                    as: "imagenes"
                }
             })
                res.status(200).json(imaLis);
            }
            catch(error){
                res.json({error: error.message})  
            }
        }
        else {
            console.log('tipos cargados de la base de datos');
            return res.status(200).json(ImagenesList); /// returm types
        }
    } 
    catch (error)
    {
        res.json({error: error.message})
    }
});

router.get('/', async (req, res, next) => {
   try {
     let {nombre} =  req.query
     if(nombre) {
        let imagen = await Imagenes.findOne({
            where: {
                name: nombre
            }
        })
        res.status(200).json(imagen)
     }

   } catch (error) {
     res.json({error: "no se encontro ese nombre"})
   }
});


module.exports = router;