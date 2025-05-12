const { Router } = require('express')
const { register} = require('../controllers/register.controller');
const { validarJWT } = require('../helpers/jwt.helper');
const { loginUsuario } = require('../controllers/login.controller');




const route = Router();


route.post('/', loginUsuario)
// route.get('/cliente', loginUsuarios);
route.post('/register', register);


module.exports = route;





