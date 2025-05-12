const {Router} = require('express');
const gestionCarrito = require('../controllers/carrito.controller');


const route = Router();




route.post('/almacen-llegada', gestionCarrito);





module.exports = route;












