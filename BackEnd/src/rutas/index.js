const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const link = require('./link.js');
const imagenes = require('./imagenes..js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/link', link)
router.use('/imagenes', imagenes)


module.exports = router;