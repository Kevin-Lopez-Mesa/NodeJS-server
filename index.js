'use strict'

// Conexión a la base de datos desde Angular

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700; // Puerto del servidor (localhost:3700)

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/NodeJS')
        .then(() => {
            console.log("Conection to database OM!");

            // Creación del servidor
            app.listen(port, () => {
                console.log("Server OM in url: localhost:3700")
            })
            
        })
        .catch(error => {
            console.log(error);
        })