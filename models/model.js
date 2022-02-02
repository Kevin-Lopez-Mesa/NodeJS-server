'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de la información que utilizaremos en la base de datos

var ProjectSchema = Schema({
    name: String,
    description: String,
    year: Number,
    stock: Boolean,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);