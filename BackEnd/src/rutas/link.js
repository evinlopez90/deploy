const { Router } = require('express');
const router = Router();
const {Links, Imagenes} = require('../Database/db');

router.post('/',  async (req, res) => {
   let {nombre, enlace} = req.body
  let verificar = await Links.findOne({
    where: {
      name: nombre
    }
  })
  if(verificar) {
   return res.status(400).json({error: "Ya Tienes ese link es tu lista"})
  }
  let imagenes = await Imagenes.findOne({ where: { name: nombre } })
  let obj = {
    name: nombre,
    link: enlace,
    imagenesName: imagenes.id
  }
  //  let arrayImagen = []
  // let objImagen = await Imagenes.findOne({
  //   where: {
  //     name: nombre
  //   }
  // })
  
  // arrayImagen.push(objImagen)

    try {

      

      let link = await  Links.create(obj)
      
     
  
      let likss = await Links.findAll({
        include: [
  
          {
            model: Imagenes,
            attributes: ["url"]

          }
        ]
      })
      
      let resul = likss.map((l) => {
        return {
          id: l.id,
          name: l.name,
          link: l.link,
          imagen: l.imagene.url
        }
      })
     res.status(200).json(resul)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
})


module.exports = router;