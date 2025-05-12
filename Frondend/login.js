
document.getElementById('login-form').addEventListener('submit', login);
function login(event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById('input-usuario').value.trim();
    const contrasena = document.getElementById('input-password').value.trim();

    if (!nombreUsuario || !contrasena) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const datosUsuario = { nombreUsuario, contrasena };

    fetch('http://localhost:3000/loginUsuario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => response.json().then(data => {
        if (!response.ok) throw new Error(data.message || 'Error en el servidor.');
        return data;
    }))
    .then(data => {
        // alert(data.message);
        localStorage.setItem('token', data.token);
       window.location.href = './index.html'; 
        
        
    })
    .catch(error => {
        alert(error.message);
        console.error('Error:', error);
    });
}
