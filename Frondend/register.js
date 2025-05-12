
  
document.getElementById('register-form').addEventListener('submit', enviar);

function enviar(event) {

    event.preventDefault();
    
    const id = document.getElementById('input-id').value;
    const nombre = document.getElementById('input-nombre').value;
    const apellido = document.getElementById('input-apellido').value;
    const nombreUsuario = document.getElementById('input-nombreusuario').value;
    const contrasena = document.getElementById('input-contrasena').value;
    const correo = document.getElementById('input-correo').value;
    const rol = document.getElementById('input-rol').value;

    if (!id || !nombre || !apellido || !nombreUsuario || !contrasena || !correo || !rol) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const nuevoUsuario = {
        idUsuario: parseInt(id),
        nombre,
        apellido,
        nombreUsuario,
        contrasena,
        correo,
        rol
    };

    console.log(nuevoUsuario);

    fetch('http://localhost:3000/register/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
    })
    .then(response => response.json().then(data => {
        if (!response.ok) throw new Error(data.message || 'Error al registrar usuario.');
        return data;
    }))
    .then(data => {
        alert(data.message || 'Usuario registrado correctamente.');
        window.location.href = './index.html'; 
        console.log(data);
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
}


   