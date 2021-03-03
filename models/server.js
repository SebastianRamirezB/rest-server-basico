const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../dataBase/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';

        //Conectar a la base de datos
        this.connectDB();

        //middlewares
        this.middlewares();


        //Rutas de mi aplicación
        this.routes();
    }

   async connectDB() {
        await dbConnection();
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