'use strict'

const { findByIdAndDelete } = require('../models/model');
// Import del modelo

var Project = require('../models/model');

// **************************************

var fs = require('fs');

// Colección de metodos con las acciones que se realizaran en el servidor 

var controller = {

    // Prueba

    home: (req, res) => {
        return res.status(200).send({
            message: 'Home OM!'
        })
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Test OM!'
        })
    },

    // Modelo para guardar información en la base de datos

    saveProject: (req, res) => {
        var project = new Project();

        // Recojemos los datos del body y se los aplicamos al modelo que vamos a subir a la base de datos

        var body = req.body;
        project.name = body.name;
        project.description = body.description;
        project.year = body.year;
        project.stock = body.stock;
        project.image = null;

        // Metodo que guarda la información en la base de datos

        project.save((err, saved) => {

            if (err) return res.status(500).send({
                message: 'Error 500 saving data.'
            })

            return res.status(200).send({
                project: saved
            })
        })

        return res.status(200).send({
            params: project,
            message: 'Save OM!'
        })
    },

    // Metodo que recoge un proyecto de la base de datos

    getProject: (req, res) => {
        var projectId = req.params.id;

        if (projectId == null) return res.status(404).send({
            message: 'The Id of the project can not be found.'
        })

        //Busca dentro de una base de dato un archivo en especifico

        Project.findById(projectId, (err, project) => {

            if (err) return res.status(500).send({
                message: 'Error downloading data.'
            });

            if (!project) return res.status(404).send({
                message: 'The project does not exist.'
            })

            return res.status(200).send({
                project
            });
        })
    },

    // Metodo que recoge todos los proyectos de la base de datos

    getProjects: (req, res) => {

        //Busca dentro de una base de dato todos los archivos

        Project.find({}).sort().exec((err, projects) => {

            if (err) return res.status(500).send({
                message: 'Error downloading data.'
            });

            if (!projects) return res.status(404).send({
                message: 'No projects found.'
            });

            return res.status(200).send({
                projects
            })
        });

    },

    // Metodo que realiza cambios en un proyecto de la base de datos

    updateProject: (res, req) => {

        var projectId = req.params.id;
        if (projectId == null) return res.status(404).send({
            message: 'The Id of the project can not be found.'
        });

        var update = req.dody;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, updated) => {

            if (err) return res.status(500).send({
                message: 'Error updating.'
            });

            if (!updated) return res.status(404).send({
                message: 'Project not found.'
            });

            return res.status(200).send({
                updated
            })
        });
    },

    // Metodo que elimina un proyecto de la base de datos

    deleteProject: (req, res) => {

        var projectId = req.params.id;
        if (projectId == null) return res.status(404).send({
            message: 'The Id of the project can not be found.'
        });

        Project.findByIdAndDelete(projectId, (err, deleted) => {

            if (err) return res.status(500).send({
                message: 'Error deleting.'
            });

            return res.status(200).send({
                deleted
            })
        })

    },

    // Metodo que sube archivos a la base de datos

    uploadFile: (req, res) => {

        var projectId = req.params.id;
        if (projectId == null) return res.status(404).send({
            message: 'The Id of the project can not be found.'
        });
        
        if(req.files) {
            
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];

            var extName = fileName.split('\.');
            var fileExt = extName[1];

            if (fileExt ==  'npg' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, file) => {

                    if (err) return res.status(500).send({
                        message: 'Error uploading file.'
                    });

                    return res.status(200).send({
                        file
                    });      
                })

            } else { // Si el archivo no tiene la extension correcta se borrara

                fs.unlink(filePath, (err) => {
                    return res.status(500).send({
                        message: 'Extension not valid.'
                    })
                })
            }
        }
    }

}

module.exports = controller;