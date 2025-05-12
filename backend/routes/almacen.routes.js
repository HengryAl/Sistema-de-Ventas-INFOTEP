const {Router} = require('express');
const { llegada, eliminarProducto } = require('../controllers/almacen.controller');



const route = Router();


route.get('/almacen-llegada', llegada );
route.delete('/almacen-llegada/:idFactura', eliminarProducto );
route.post('/producto-vendido', );


module.exports = route; 
