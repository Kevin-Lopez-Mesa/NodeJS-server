'use strict'

// Creación de las rutas que accederan a nuestro servidor

var express = require('express');
var ProjectController = require('../controllers/controller');

var router = express.Router();

// Middleware con el multiparty

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './upload'});

// ************************************************************

router.post('/test', ProjectController.test);
router.post('/save', ProjectController.saveProject);
router.post('/file/:id', multipartMiddleware, ProjectController.uploadFile);

router.put('/update/:id', ProjectController.updateProject);

router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.get('/home', ProjectController.home);

router.delete('/delete/:id', ProjectController.deleteProject);

module.exports = router;