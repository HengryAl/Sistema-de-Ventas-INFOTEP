const { Router } = require('express')
const { loginUsuario, validarToken } = require('../controllers/login.controller');
const { validarJWT } = require('../helpers/jwt.helper');
const { enviarUsuario } = require('../controllers/clientes.controller');


const route = Router();

route.post('/', loginUsuario);
route.post('/validar', validarToken, validarJWT);
route.get('/cliente',loginUsuario );
route.get('/clientes',enviarUsuario );



module.exports = route;