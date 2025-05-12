
            
const { request, response } = require('express');
const listaUsuario = require('../db/listaUsuario');
const { generarJWT, validarJWT } = require('../helpers/jwt.helper');


const loginUsuario = async (req = request, res = response) => {
    const { nombreUsuario, contrasena } = req.body;
    
    console.log('Datos recibidos:', req.body);

    try {
        const usuarioEncontrado = listaUsuario.find(
            usuario => usuario.nombre === nombreUsuario && usuario.contrasena === contrasena
        );

        if (!usuarioEncontrado) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        const token = await generarJWT(usuarioEncontrado.idUsuario, usuarioEncontrado.nombre);
        console.log('Token generado:', token);

        return res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token,
            usuario: usuarioEncontrado
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const validarToken = (req, res) => {
  const usuario = req.usuarioJWT; // viene del middleware
  res.status(200).json({
    message: 'Token válido.',
    usuario,
    token: req.headers.authorization.split(' ')[1] // opcional, si quieres reenviar el token
  });
};




module.exports = { loginUsuario, validarToken };
