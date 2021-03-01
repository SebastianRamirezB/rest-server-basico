const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';

        //middlewares
        this.middlewares();


        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        //lectura y parseo del body
        this.app.use(express.json());

        //Cors
        this.app.use(cors());

        //Directorio Publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.usuarioPath, require('../routers/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto:', this.port);
        });
    }

}

module.exports = Server;