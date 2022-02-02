'use strict'

// Preparacion de servidor con Node

var expres = require('express');
var bodyParser = require('body-parser');
const { restart } = require('nodemon');

var app = expres();

// Cargar archivos de rutas

var project_routes = require('./routes/routes')

// middlewares (Intermediario)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // Convierte las peticiones a un objeto usable json.

// Configurar cabeceras y cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Uso de las rutas creadas en routes/routes.js

app.use('/', project_routes);

    // Acceso a las propiedades body en una petición => req.body.name
    // Acceso a las propiedades params de la URL => req.query.user
    // Acceso a las propiedades de la ruta => req.params.id

// Exportar

module.exports = app;

