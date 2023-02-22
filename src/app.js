const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');

const user = require('./config/env.json').user
const passwd = require('./config/env.json').passwd


class App{

    constructor() {
        this.server = express();

        mongoose.set("strictQuery", false);

        mongoose.connect(`mongodb+srv://${user}:${passwd}@nodehouse.wgs0qny.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );
        
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server
