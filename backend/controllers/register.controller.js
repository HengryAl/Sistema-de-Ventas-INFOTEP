const { request, response } = require('express');
const listaUsuario = require('../db/listaUsuario'); // Importar la base de datos simulada

const register = async (req = request, res = response) => {
    const data = req.body;

    console.log('Datos recibidos:', data);

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = listaUsuario.find(
            (usuario) => usuario.nombreUsuario === data.nombreUsuario || usuario.correo === data.correo
        );

        if (usuarioExistente) {
            return res.status(400).json({ message: 'El usuario o el correo ya están registrados' });
        }

        // Registrar el nuevo usuario
        listaUsuario.push({
            id: data.id || Date.now(), // Generar un ID único si no se proporciona
            nombre: data.nombre,
            apellido: data.apellido,
            nombreUsuario: data.nombreUsuario,
            contrasena: data.contrasena,
            correo: data.correo,
            rol: data.rol || 'usuario', // Asignar un rol por defecto si no se proporciona
        });

        console.log('Usuario registrado:', listaUsuario);

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {register};