const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app       = express();
        this.port      = process.env.PORT;
        this.usersPath = '/api/users';

        /** DB Connection */
        this.connectDB();

        /** Middlewares */
        this.middlewares();

        /** Routes of application */
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        /** CORS */
        this.app.use( cors() );

        /** Read and parse body */
        this.app.use( express.json() );

        /** Directorio público */
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use(this.usersPath, require('../routes/user.routes'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Application running on PORT: ${this.port}`);
        });
    }

}

module.exports = Server;