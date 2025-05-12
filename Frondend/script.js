//*FUNCION PARA CONSULTAR LA LISTA DE PRODUCTOS Y VERLOS TODOS

async function verificarToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return window.location.replace('./login.html');
  }

  try {
    const res = await fetch('http://localhost:3000/loginUsuario/validar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) {
      localStorage.removeItem('token');
      return window.location.replace('./login.html');
    }

    const result = await res.json();

    if (res.ok) {
    } else {
      localStorage.removeItem('token');
      window.location.replace('./login.html');
    }


  } catch (err) {
    console.error('Error validando token:', err);
    localStorage.removeItem('token');
    window.location.replace('./login.html');
  }
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', verificarToken);




const URL = `http://localhost:3000/ventas/consultar-productos`;
let listaCarritoPush = [];
let productos = []; // Array vacío para almacenar los productos que se consultan desde el servidor


fetch(URL)
  .then((respuesta) => respuesta.json())
  .then((data) => {
    productos = data; // Se almacena la respuesta en el array productos
    crearTarjetas(); // Llamar a la función para crear las tarjetas
  })
  .catch((error) => {
    console.error("ERROR! El servidor falló al encontrar los productos", error);
  });

// FUNCIÓN PARA CREAR LAS TARJETAS

function crearTarjetas(productosFiltrados = productos) {
  const seccion = document.getElementById("seccion-para-tarjeta");
  seccion.innerHTML = ""; // Limpiar el contenido previo

  //! esta funcion ya no tiene relevancia.
  //   if (!seccion) {
  //     console.error("No se encontró el contenedor con ID 'seccion-para-tarjeta'");
  //     return;
  //   }

  productosFiltrados.forEach((element, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("contenido-tarjeta");
    tarjeta.innerHTML = `
      <div class="content-codigo">
          <div class="content-p">
              <p class="codigo">CODIGO</p>
              <h5 class="codigo-oo">${element.codigo_local}</h5>
          </div>
      </div>
      <div class="content-img">
          <img src="${element.imagen}" alt="${element.nombre}">
      </div>
      <div class="content-nombre-producto-precio">
          <div class="content-tag-nombre-producto">
              <p class="nombre-producto">${element.nombre}</p>
              <p class="precio-producto">$${element.precio_compra}</p>
          </div>
          <div class="content-botones">
              <button class="btn-detalles" id="boton-detalle">Detalles</button>
              <span>Cantidad: </span>
              <input type="number" class="btn-numero" id="boton-cantidad" value='${element.cantidad = 1}''>
              <button class="btn-agregar" id="boton-agregar">Agregar</button>
          </div>
      </div>
    `;
    seccion.appendChild(tarjeta); // Agregar la tarjeta al contenedor

    //* FUNCION DEL BOTON "AGREGAR"

  const inputCantidad = tarjeta.querySelector(".btn-numero");
  inputCantidad.addEventListener("input", (e) => {
    let nuevaCantidad = parseInt(e.target.value);
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
      element.cantidad = nuevaCantidad;
    }
  });

  tarjeta.querySelector(".btn-agregar").addEventListener("click", () => {
  const cantidad = element.cantidad || 1;

  // Verifica si el producto ya está en el carrito
  const productoExistente = listaCarritoPush.find(
    (producto) => producto.codigo_local === element.codigo_local
  );

  if (productoExistente) {
    // Si ya existe, suma la cantidad
    productoExistente.cantidad += cantidad;
  } else {
      const nuevoProducto = {
        ...element,
        cantidad: cantidad
      };
      listaCarritoPush.push(nuevoProducto);
      
      
    }
  });
  //* FUNCION DEL BOTON "DETALLES"
  const botonDetallesProducto = tarjeta.querySelector(".content-img"); 
  const imgDetallesProducto = tarjeta.querySelector(".btn-detalles");// Selecciona el botón "Detalles" dentro de la tarjeta
  // botonDetallesProducto || imgDetallesProducto.addEventListener('click', () => {
    //   document.getElementById("container-fondo-modal").style.display = "block"; // aqui se accede al contenedor del modal y se le cambia el display a block para que se vea.
    //   document.getElementById("tarjeta-modal").style.display = "block"; // aqui se accede a la tarjeta del modal y se le cambia el display a block para que se vea.
    //   document.getElementById("img-producto").src = element.imagen; // aqui se accede a la imagen del modal y se le cambia la fuente a la imagen del producto.
    //   document.getElementById("nombre-producto-modal").textContent = element.nombre;
    //   document.getElementById("precio-modal-producto").textContent = `$${element. precio_compra}`; 
    //   document.getElementById("codigo-modal-producto").textContent = `Codigo: ${element.codigo_local}`;
    //   document.getElementById("descripcion-categoria-modal").textContent = `Categoria: ${element.categoria}`;
    //   document.getElementById("Dimensiones-producto").textContent = `Dimenciones: ${element.dimenciones}`;
    
    // })
    if (botonDetallesProducto) {
      botonDetallesProducto.addEventListener('click', () => {
        abrirModal();
      });
    }
    
    if (imgDetallesProducto) {
      imgDetallesProducto.addEventListener('click', () => {
        abrirModal();
      });
    }
    
    function abrirModal() {
      document.getElementById("container-fondo-modal").style.display = "block";
      document.getElementById("tarjeta-modal").style.display = "block";
      document.getElementById("img-producto").src = element.imagen;
      document.getElementById("nombre-producto-modal").textContent = element.nombre;
      document.getElementById("precio-modal-producto").textContent = `$${element.precio_compra}`;
      document.getElementById("codigo-modal-producto").textContent = `Código: ${element.codigo_local}`;
      document.getElementById("descripcion-categoria-modal").textContent = `Categoría: ${element.categoria}`;
      document.getElementById("Dimensiones-producto").textContent = `Dimensiones: ${element.dimenciones}`;
    }
    
    
    //* EVENTO PARA CERRAR EL MODAL.
    const cerrarModal = document.getElementById("button-largo-agregar");
    cerrarModal.addEventListener("click", () => {
      document.getElementById("container-fondo-modal").style.display = "none"; // este evento accede al boton de cerrar del modal y lo cierra.
      document.getElementById("tarjeta-modal").style.display = "none";
    })
    
    
  });
}


//! esta funcion ya no tiene relevancia.
// EVENTO QUE AL ENTRAR A LA PAGINA SE CREEN DINAMICAMENTE LAS TARJETAS.

// window.addEventListener("DOMContentLoaded", () => {
// if (productos.length > 0) {
//   // esta funcion se ejecuta cuando la pagina se carga y si hay productos en el array data
//   crearTarjetas();
// }
// });

//*FUNCION PARA BUSCAR PRODUCTOS POR NOMBRE y codigo

// } buscarProductosPorNombre();
function buscarProductosPorNombre() {
  let modoBusqueda = "nombre"; // "nombre" o "codigo"
  const input = document.getElementById("input-value");
  const botonCambioBusqueda = document.getElementById("botton-cambia-modo");

  // Alternar entre búsqueda por nombre y por código
  botonCambioBusqueda.addEventListener("click", () => {
    if (modoBusqueda === "nombre") {
      modoBusqueda = "codigo";
      botonCambioBusqueda.textContent = "Buscar por Nombre";
      input.placeholder = "Escribe el código del producto";
      crearTarjetas();
    } else {
      modoBusqueda = "nombre";
      botonCambioBusqueda.textContent = "Buscar por Código";
      input.placeholder = "Escribe el nombre del producto";
      crearTarjetas();
    }

    input.value = ""; // Limpiar el input al cambiar modo
  });

  // Escuchar mientras el usuario escribe
  input.addEventListener("input", () => {
    const valorBusqueda = input.value.trim();
    if (valorBusqueda === "") return;

    let url = "";

    if (modoBusqueda === "nombre") {
      url = `http://localhost:3000/ventas/consulta-productos-por-nombre?nombre=${encodeURIComponent(valorBusqueda)}`;
    } else {
      url = `http://localhost:3000/ventas/consulta-productos-por-codigo?codigo=${encodeURIComponent(valorBusqueda)}`;
    }
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        crearTarjetas(data); // Asumo que ya tienes esta función
      })
      .catch((error) => {
        console.log("ERROR al conseguir los productos", error);
      });
  });
}

buscarProductosPorNombre();




//*FUNCION PARA CONSULTAR PRODUCTOS POR CATEGORIA

function llamarProductosPorCategoria() {
  const menuCategorias = document.querySelectorAll(".categoria-item");

  menuCategorias.forEach((categoriaItem) => {
    categoriaItem.addEventListener("click", () => {
      const parametroCategoria = categoriaItem.textContent.trim();
      if (parametroCategoria === 'Todos los produtos'){return crearTarjetas()}

      const urlBuscarproductosCategoria = `http://localhost:3000/ventas/consulta-productos-disponibles-categoria?categoria=${encodeURIComponent(parametroCategoria)}`;

      fetch(urlBuscarproductosCategoria)
        .then((response) => response.json())
        .then((data) => {
          crearTarjetas(data); // Asegúrate de tener esta función definida
        })
        .catch((error) => {
          console.error("ERROR al conseguir los productos por categoría", error);
        });
    });
  });
} llamarProductosPorCategoria();


document.addEventListener('DOMContentLoaded', () => {
  const boton = document.getElementById('boton-carrito');

  if (boton) {
    boton?.addEventListener('click', () => {
      mostrarCarrito(); 
    });
  }
});



function mostrarCarrito() {
  fetch('carrito.html')
    .then(res => res.text())
    .then(html => {
      const ventanaEmergente = document.getElementById('ventanaEmergente-carrito');
      ventanaEmergente.innerHTML = `<div class="contenido-carrito">${html}</div>`;
      ventanaEmergente.style.display = 'flex';
     
   
      // Activar botón de cerrar después de cargar
      const btnCerrar = ventanaEmergente.querySelector('#cerrar-btn');
      if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
          ventanaEmergente.style.display = 'none';
        });
      }
      // const cerrarGeneral = ventanaEmergente.querySelector('#ventana-emergente-carrito');
      // if (cerrarGeneral) {
      //    cerrarGeneral.addEventListener('click', () => {
      //     ventanaEmergente.style.display = 'none';
      //   });

      //     }
    });
  
  }
const almacen = document.getElementById("almacen");

if (almacen) {
  almacen.addEventListener("click", () => {
    window.location.href = "./almacen.html";
   }); // Redirigir a la página de almacen
  }
console.log(listaCarritoPush);
botonCarito = document.getElementById("boton-carrito");
let cantidadAnterior = 0;

setInterval(() => {
  const cantidadActual = listaCarritoPush.length;

  // Actualizar el número del contador
  botonCarito.setAttribute("data-after", `${cantidadActual}`);

  if (cantidadActual > 0) {
    botonCarito.classList.add("mostrar");

    // Solo animar si la cantidad cambió
    if (cantidadActual !== cantidadAnterior) {
      botonCarito.classList.remove("animacion");
      void botonCarito.offsetWidth; // Forzar reflow para reiniciar animación
      botonCarito.classList.add("animacion");

      cantidadAnterior = cantidadActual; // Actualiza el valor anterior
    }
  } else {
    botonCarito.classList.remove("mostrar");
    botonCarito.setAttribute("data-after", `0`);
    cantidadAnterior = 0;
  }
}, 500);


window.listaCarritoPush = listaCarritoPush;