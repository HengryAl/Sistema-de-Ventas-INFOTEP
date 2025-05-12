

//ESTE ES EL ARCHIVO QUE CONTIENE LAS RUATAS HIJAS


const { Router } = require('express');
const { listarProductos, listaCategorias, buscarProductosPorcategorias, buscarProductosPorNombre, buscarProductosPorCodigo } = require('../controllers/ventas.controller');

// const { filtrarProductosPorcategoria } = require('../controllers/ventas.controller');
// const { listaProductosDisponibles } = require('../db/baseDeDatos'); // requerimos la base de datos para poder listar los productos disponibles.

const route = Router();



// route.get('/facturar-producto'); // esta sera la ruta para facturar un producto.
// route.get('/consulta-productos-vendidos'); // esta sera la ruta para consultar los productos vendidos.


route.get('/consulta-productos-disponibles-categoria', buscarProductosPorcategorias);
route.get('/consulta-productos-por-nombre', buscarProductosPorNombre);
route.get('/consultar-categorias', listaCategorias);
route.get('/consultar-productos', listarProductos);
route.get('/consulta-productos-por-codigo', buscarProductosPorCodigo);





// window.onload = llamarFunciones() // este un ejemplo de como llamar las funciones al cargar la pagina.
// function llamarFunciones(){
//     // listarProductos();
//     // buscarProductosPorcategorias();
//     // listaCategorias();
//     // filtrarProductosPorcategoria();
// }



module.exports = route // exportamos la ruta para que pueda ser usada en el archivo server.model.js