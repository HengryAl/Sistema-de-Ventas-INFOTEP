const { request, response } = require('express');
const {listaProductosVendidos} = require('../db/productosVendidosDb');
const { listaProductosDisponibles } = require('../db/baseDeDatos');
const { listaFacturas } = require('../db/listaFacturas');


const gestionCarrito = async (req = request, res = response) => {
    const data = req.body;

    console.log( data);
try{
    // Guardar la factura
    listaFacturas.push({
        id_factura: data.id_factura,
        fecha: data.fecha,
        id_cliente: data.id_cliente,
        nombre_cliente: data.nombre_cliente,
        rnc: data.rnc,
    });

    // Agregar los productos vendidos
    data.productos.forEach(producto => {
        listaProductosVendidos.push({
            id_factura: data.id_factura,
            producto_id: producto.id,
            cant_vendida: producto.cantidad
        });

        // Verificar si el producto existe y actualizar la cantidad disponible
        const productoDisponible = listaProductosDisponibles.find(prodExiste => prodExiste.id === producto.id);
        if (productoDisponible) {
            if (productoDisponible.cantidad >= producto.cantidad) {
                productoDisponible.cantidad -= producto.cantidad;
                console.log(`Producto ${producto.id} actualizado, nueva cantidad: ${productoDisponible.cantidad}`);
                console.log(listaProductosVendidos)
            } else {
                console.log(`Stock insuficiente para el producto ${producto.id}`);
                res.status(200).send('Compra registrada correctamente');
            }
        } else {
            res.status(200).send('Compra registrada correctamente');
            console.log(`Producto con id ${producto.id} no encontrado`);
        }
    });
    


    

    res.status(200).send('Compra registrada correctamente');
}catch(error){
    res.status(500).json({
         msg: `Error en el servidor: ${error}`}
    );
}
};

module.exports = gestionCarrito;
