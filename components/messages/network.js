const express = require('express');
const multer = require('multer');

const config = require('../../config');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

const upload = multer({
    dest: 'public/' + config.filesRoute + '/',
});

router.get('/', function (req, res) {
    /*console.log(req.headers);
    res.header({
        'custom-header': 'Nuestro valor personalizado',
    });
    //res.send('Lista de mensajes');
    response.success(req, res, 'Lista de mensajes');*/
    const filterMessages = req.query.chat || null; //req.query.user
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
});

router.post('/', upload.single('file'), function (req, res) {
    //console.log(req.query);
    //console.log(req.body);
    /*res.status(201).send({
        'error': '',
        'body': 'Creado correctamente'
    });*/
    //console.log(req.file);
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información invalida', 400, 'Error en el contenido');
        });
    /*if (req.query.error == 'ok') {
        response.error(req, res, 'Error inesperado', 401, 'Es solo una simulación');
    }     else {
        response.success(req, res, 'Creado correctamente', 201);
    }*/
});

router.patch('/:id', function (req, res) {
    //console.log(req.params.id);
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
    //res.send('Ok');
});

router.delete('/:id', function (req, res) {
    controller.deleteMessage(req.params.id)
        .then((data) => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;