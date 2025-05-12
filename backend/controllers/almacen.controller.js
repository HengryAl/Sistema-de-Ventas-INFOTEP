const { request, response } = require('express');
const { listaFacturas } = require('../db/listaFacturas');
const { listaProductosVendidos } = require('../db/productosVendidosDb');
const { listaProductosDisponibles } = require('../db/baseDeDatos');

const llegada = async (req = request, res = response) => {
  try {
    const facturasConProductos = listaFacturas.map((factura) => {
      const productosDeFactura = listaProductosVendidos
        .filter((pv) => pv.id_factura === factura.id_factura)
        .map((pv) => {
          const infoProducto = listaProductosDisponibles.find((p) => p.id === pv.producto_id);
          return {
            id: pv.producto_id,
            nombre: infoProducto?.nombre || 'Nombre desconocido',
            descripcion: infoProducto?.descripcion || 'Sin descripción',
            cantidad: pv.cant_vendida,
          };
        });

      return {
        id_factura: factura.id_factura,
        fecha: factura.fecha,
        nombre_cliente: factura.nombre_cliente,
        rnc: factura.rnc,
        productos: productosDeFactura,
      };
    });

    res.status(200).json(facturasConProductos);
  } catch (error) {
    res.status(500).json({
      msg: `Error en el servidor: ${error}`,
    });
  }
};


const eliminarProducto = async (req = request, res = response) => {
  try {
    const { idFactura} = req.params; // idFactura y idProducto desde los parámetros de la URL

    // Buscar los productos vendidos de esa factura
    const productosVendidos = listaProductosVendidos.filter(
      (pv) => pv.id_factura === idFactura
    );

    if (productosVendidos.length === 0) {
      return res.status(404).json({
        msg: 'Producto no encontrado en esta factura.',
      });
    }

    // Eliminar el producto de la lista de productos vendidos
    const indiceProducto = listaProductosVendidos.findIndex(
      (pv) => pv.id_factura === idFactura
    );

    if (indiceProducto !== -1) {
      listaProductosVendidos.splice(indiceProducto, 1); // Eliminar el producto
      console.log(`Producto con id ${idProducto} eliminado de la factura ${idFactura}`);
    }

    // Retornar la respuesta
    res.status(200).json({
      msg: 'Producto eliminado correctamente',
    });

  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({
      msg: `Error en el servidor: ${error}`,
    });
  }
};

module.exports = { llegada, eliminarProducto };
