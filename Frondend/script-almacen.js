//*FUNCION PARA CONSULTAR LA LISTA DE PRODUCTOS Y VERLOS TODOS
window.listaCarritoPush;
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
    console.log(token);
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



const URL = `http://localhost:3000/almacen/almacen-llegada`;

fetch(URL)
  .then(res => res.json())
  .then(data => {
    //  console.log("Respuesta del servidor:", data);
    crearTarjetas(data); 
  })
  .catch(err => console.error("Error al cargar facturas:", err));


// FUNCIÓN PARA CREAR LAS TARJETAS
function crearTarjetas(facturas) {
  const seccion = document.getElementById("seccion-para-tarjeta");
  seccion.innerHTML = "";

  facturas.forEach((factura) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("factura-card");

    tarjeta.innerHTML = `
      <header class="factura-header">
        <p><strong>ID factura:</strong> <span class="factura-id">#${factura.id_factura}</span></p>
        <div class="cliente-info">
          <p><strong>Nombre:</strong> <span class="bold">${factura.nombre_cliente}</span></p>
          <p><strong>Dirección:</strong> <span class="bold">N/A</span></p>
        </div>
        <div class="cliente-info">
          <p><strong>RNC/Cédula:</strong> <span class="bold">${factura.rnc}</span></p>
          <p><strong>Teléfono:</strong> <span class="bold">N/A</span></p>
        </div>
      </header>

      <section class="factura-productos">
        <div class="factura-productos-header">
          <span>Producto</span>
          <span>Precio</span>
        </div>
        <div class="productos-lista"></div>
      </section>

      <footer class="factura-footer">
        <button class="btn-despachado" disabled>Despachado</button>
      </footer>
    `;

    seccion.appendChild(tarjeta);

    const productosLista = tarjeta.querySelector(".productos-lista")
    

    
    factura.productos.forEach((producto, indice) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-item");
        productoDiv.innerHTML = `
        <div class="producto-detalle">
        <p class="nombre">${producto.nombre}</p>
        <p class="descripcion">${producto.descripcion}</p>
        </div>
        <div class="producto-cantidad">
        <span><strong>CANT.</strong> ${producto.cantidad}</span>
        <input type="checkbox" class="producto-checkbox"/>
        </div>
        `;
        productosLista.appendChild(productoDiv);
        
    });
    const checkboxes = tarjeta.querySelectorAll(".producto-checkbox");
    const botonDespacho = tarjeta.querySelector(".btn-despachado");
    
    // Verificar checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const todosMarcados = Array.from(checkboxes).every(cb => cb.checked);
            botonDespacho.disabled = !todosMarcados;
        });
    });

    botonDespacho.addEventListener("click", () => {
      tarjeta.remove(); // Elimina la tarjeta del DOM
      productosLista.innerHTML = ""; // Vacía la lista de productos
        botonDespacho.disabled = true; 
        delete window.listaCarritoPush[indice];
        window.listaCarritoPush = window.listaCarritoPush.filter(item => item !== undefined);
        eliminarProducto(factura);
    });;
  });
}
const ventas = document.getElementById("ventas");

if (ventas) {
  ventas.addEventListener("click", () => {
    window.location.href = "./index.html";
   }); // Redirigir a la página de almacen
  }

function eliminarProducto(producto) {
 fetch(`http://localhost:3000/almacen/almacen-llegada/:${producto.id_factura}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      console.log('Producto eliminado del backend');
      // Si la eliminación fue exitosa en el backend, eliminamos el producto localmente
      window.listaCarritoPush.splice(indice, 1);
      mostrarProductos();  // Actualizamos la interfaz de usuario
    } else {
      console.error('Error al eliminar el producto del backend');
    }
  })
  .catch(error => {
    console.error('Error al contactar con el servidor:', error);
  });
}