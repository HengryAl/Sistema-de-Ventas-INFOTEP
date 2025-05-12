const lista = window.listaCarritoPush || [];
const listaClientesFactura = [];
const fechaActual = new Date().toLocaleDateString('es-DO');

const listaCarrito = {
    productos: lista
};

setInterval(() => {
    // Carga inicial
    mostrarProductos();
}, 500);

function mostrarProductos() {
    const mainCarrio = document.getElementById("main-lista-carrito");
    mainCarrio.innerHTML = '';

    listaCarrito.productos.forEach((producto, indice) => {
        const li = document.createElement("li");
        li.className = "item-carrito";
        li.innerHTML = `
            <div class="img-carrito">
                <img src="${producto.imagen}" alt="">
            </div>
            <div class="cuerpo-item">
                <label>${producto.nombre}</label>
                <label>${producto.detalles}</label>
            </div>
            <div class="detalles-cuerpo-precio-item">
                <label>$${producto.precio_compra} DOP C/U</label>
                <div class="cant-item">
                    <label>CANT.</label>
                    <input type="number" class="input-cantidad" value="${producto.cantidad}" data-index="${indice}">
                </div>
                <label class="total-producto">$${(producto.precio_compra * producto.cantidad).toFixed(2)} DOP</label>
            </div>
            <div class="eliminar-item-carrito" style="cursor:pointer;">x</div>
        `;

        mainCarrio.appendChild(li);

        // Eliminar producto
        li.querySelector(".eliminar-item-carrito").addEventListener("click", () => eliminarProducto(indice));

        // Cambiar cantidad
        const inputCantidad = li.querySelector(".input-cantidad");
        const labelTotal = li.querySelector(".total-producto");

        inputCantidad.addEventListener("input", (e) => {
            const nuevaCantidad = parseInt(e.target.value);
            if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
                listaCarrito.productos[indice].cantidad = nuevaCantidad;
                const nuevoTotal = nuevaCantidad * producto.precio_compra;
                labelTotal.textContent = `$${nuevoTotal.toFixed(2)} DOP`;
                actualizarTotales();
            }
        });
    });

    actualizarTotales();
}

function actualizarTotales() {
    const suma = listaCarrito.productos.reduce((acc, p) => acc + p.precio_compra * p.cantidad, 0);
    const itbs = suma * 0.18;
    const envio = listaCarrito.productos.length * 20;
    const total = suma + itbs + envio;

    const $ = id => document.getElementById(id);

    if ($('total-1')) $('total-1').textContent = `$${suma.toFixed(2)} DOP`;
    if ($('total-final')) $('total-final').textContent = `$${total.toFixed(2)} DOP`;
    if ($('itbs-total')) $('itbs-total').textContent = `$${itbs.toFixed(2)} DOP`;
    if ($('envio-total')) $('envio-total').textContent = `$${envio.toFixed(2)} DOP`;
}

function eliminarProducto(indice) {
    listaCarrito.productos.splice(indice, 1);
    mostrarProductos();
}

function verUsuarios() {
    fetch('http://localhost:3000/loginUsuario/clientes')
        .then(res => res.json())
        .then(data => {
            const usuarioVentana = document.getElementById("cliente-lista");
            usuarioVentana.innerHTML = '';

            data.clienttes.forEach(usuario => {
                const li = document.createElement("li");
                li.className = "li-lista-clientes";
                li.innerHTML = `
                    <div class="cliente-lista-nombre">
                        <div><span>Nombre: </span><span>${usuario.nombre}</span></div>
                        <div><span>RNC/Cédula: </span><span>${usuario.rnc}</span></div>
                        <div><span>Tel: </span><span>${usuario.tel}</span></div>
                        <div><span>Dirección: </span><span>${usuario.direccion}</span></div>
                    </div>
                `;
                li.addEventListener("click", () => {
                    mostrarDatosCliente(usuario);
                    agregarClienteSeleccionado(usuario);
                });
                usuarioVentana.appendChild(li);
            });
            let control = document.getElementById("cliente-lista");
        
            control.style.display = control.style.display === "none" ? "block" : "none";
        })
        .catch(err => console.error("Error: ", err));
}

function mostrarDatosCliente(usuario) {
    const spans = document.querySelector(".datos-cliente").querySelectorAll("span");
    spans[0].textContent = usuario.nombre;
    spans[1].textContent = usuario.rnc;
    spans[2].textContent = usuario.tel;
    spans[3].textContent = usuario.direccion;
}

function agregarClienteSeleccionado(usuario) {
    const idFactura = generarIdFactura();
    const cliente = {
        id_factura: idFactura,
        fecha: fechaActual,
        id_cliente: usuario.id_cliente,
        nombre_cliente: usuario.nombre,
        rnc: usuario.rnc,
    };
    listaClientesFactura.length = 0; // asegura que solo haya uno
    listaClientesFactura.push(cliente);
    console.log("Cliente agregado a la factura:", cliente);
}

function generarIdFactura() {
    return 'F' + Math.floor(Math.random() * 1000000);
}

function pagarCarrito() {
    if (listaClientesFactura.length === 0) {
        alert("Debe seleccionar un cliente.");
        return;
    }

    const cliente = listaClientesFactura[0];
    const productosFactura = [...listaCarrito.productos];

    fetch('http://localhost:3000/carrito/almacen-llegada', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_factura: cliente.id_factura,
            fecha: cliente.fecha,
            id_cliente: cliente.id_cliente,
            nombre_cliente: cliente.nombre_cliente,
            rnc: cliente.rnc,
            productos: productosFactura
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Factura enviada con éxito.");
        window.listaCarritoPush = [];
        listaCarrito.productos = [];
        mostrarProductos();
        console.log(data);
    })
    .catch(err => {
        console.error("Error:", err);
    });
}


