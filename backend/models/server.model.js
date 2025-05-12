require('dotenv').config();
// const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');  
const { createServer } = require('http');

class Server {

    constructor( ) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.httpServer = createServer(this.app);


        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors({origin: '*'}));
    }


    routes () {
        //RUTAS PADRES
        this.app.use('/login',  require('../routes/auth.routes')); //EL REQUIRE SONLOS CONTROLADORES
        this.app.use('/carrito',  require('../routes/carrito.routes'));
        this.app.use('/almacen',  require('../routes/almacen.routes'));
        this.app.use('/loginUsuario', require('../routes/auth.routes')); //EL REQUIRE SON LOS CONTROLADORES
        this.app.use('/register',  require('../routes/register.routes'));
        this.app.use('/ventas', require('../routes/ventas.routes')); //'ventas' es la ruta padre con la que se consultaran todos los productos y sera la ruta para manjar todo el asunto de ventas.


    }

    listen () {
        this.httpServer.listen ( this.port, ()=>{
            console.log(`SE ESTA EJECUTANDO CORRECTAMENTE EN EL PUERTO ${this.port}`);
        });
    }
}

module.exports = Server;