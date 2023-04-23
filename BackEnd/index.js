const server = require('./src/app');
let {conn} = require('./src/Database/db')
 const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3096

conn.sync({force: true}).then(() => {
    server.listen(port, ()=> {
        console.log(`Servidor inicializado en el puerto ${port}`);
    }) 
})


