const { request, response } = require("express");
const { listaProductosDisponibles } = require("../db/baseDeDatos"); // requerimos la base de datos para poder listar los productos disponibles.

// FUNCION QUE LISTA LOS PRODUCTOS DISPONIBLES EN LA BASE DE DATOS
// esta funcion recibe la peticion y la respuesta de express. y devuelve una lista de productos disponibles en formato json.
// la funcion es asincrona porque se va a conectar a una base de datos. y puede tardar un poco en responder.

const listarProductos = async (req = request, res = response) => {
  // recibimos la peticion y la respuesta de express. y la guardamos en una constante.

  try {
    res.status(200).json(listaProductosDisponibles); // se devuelve la lista de productos disponibles en formato json.

    // se usa catch para manejar los errores. si hay un error al conectar a la base de datos. se captura el error y se devuelve un mensaje de error.
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar los productos disponibles",
      error,
    });
  }
};

// FUNCION QUE RECORRE LA LISTA Y FILTRA LOS PRODUCTOS POR CATEGORIA Y LOS GUARDA EN UNA LISTA

const buscarProductosPorcategorias = async (req = request, res = response) => {
  try {
    const nuevaCat = req.query.categoria;

    const Producto_filtrado = listaProductosDisponibles.filter(
      (producto) => producto.categoria.includes(nuevaCat.toString())
    ); // se filtran los productos por categoria y se guardan en una lista. usando el metodo filter de javascript. que recorre la lista y devuelve una nueva lista con los elementos que cumplen la condicion.


    res.status(200).json(Producto_filtrado); // se devuelve la lista de productos filtrados en formato json.

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar las categorias disponibles",
      error,
    });
  }
};


// FUNCION QUE RECORRE LA LISTA Y FILTRA LOS PRODUCTOS POR NOMBRE Y LOS GUARDA EN UNA LISTA.

const buscarProductosPorNombre = async (req = request, res = response) => {
  try {
    const nuevoNombre = req.query.nombre; //

     const Producto_filtrado = listaProductosDisponibles.filter(
      (producto) => producto.nombre.toLowerCase().includes(nuevoNombre.toString().toLowerCase()) 
    ); // se filtran los productos por categoria y se guardan en una lista. usando el metodo filter de javascript. que recorre la lista y devuelve una nueva lista con los elementos que cumplen la condicion.


      res.status(200).json(Producto_filtrado); // se devuelve la lista de productos filtrados en formato json.

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar las categorias disponibles", 
      error,
    });
  }
};
const buscarProductosPorCodigo = async (req = request, res  = response) =>{
  try {
    const buscacodigo = req.query.codigo; //

     const Producto_filtrado = listaProductosDisponibles.filter(
      (producto) => producto.codigo_local.toLowerCase().includes(buscacodigo.toString().toLowerCase()) 
    ); // se filtran los productos por categoria y se guardan en una lista. usando el metodo filter de javascript. que recorre la lista y devuelve una nueva lista con los elementos que cumplen la condicion.

    

      res.status(200).json(Producto_filtrado); // se devuelve la lista de productos filtrados en formato json.

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar las categorias disponibles", 
      error,
    });
  }



}

// FUNCION QUE LISTA LAS CATEGORIAS DISPONIBLES y LAS GUARDA EN UNA LISTA.

const listaCategorias = async (req = request, res = response) => {
  try {

    const categoriasEnLista = []; // se crea una lista vacia para guardar las categorias que se encuentran en la lista de productos disponibles.
    listaProductosDisponibles.filter((categoria) =>
      categoriasEnLista.push(categoria.categoria)
    ); // se recorre la lista de productos disponibles, en la lista categoriasEnLista usando push para que todas las categorias se guarden alla.

    const listaCategoriasFiltrdas = [...new Set(categoriasEnLista)]; // esta constante esta "formateando" los resultados de la antgua lista y con new set() y se convierte en un array sin duplicados.;


    res.status(200).json(listaCategoriasFiltrdas); // se devuelve la lista de categorias filtradas en formato json.

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar las categorias disponibles",
      error,
    });
  }
}





module.exports = { listarProductos,
                   listaCategorias, 
                   buscarProductosPorcategorias,
                   buscarProductosPorNombre,
                   buscarProductosPorCodigo 
                    }; // exportamos la funcion listarProductos para que pueda ser usada en el archivo ventas.routes.js. y la funcion listacategorias para que pueda ser usada en el archivo ventas.routes.js. y la funcion filtrarProductosPorcategoria para que pueda ser usada en el archivo ventas.routes.js.
