const jwt = require('jsonwebtoken');

const { response, request } = require('express');
const { loginUsuarios } = require('../controllers/login.controller');

const generarJWT = (id_usuario, user_name) => {

    return new Promise((resolve, reject) => {

        const payload = { id_usuario, user_name };
        const claveEncriptado = process.env.SECRETJWT;

        jwt.sign(
            payload,
            claveEncriptado,
            { expiresIn: '8hrs' },
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject('Error al generar JWT')
                } else {
                    resolve(token)
                }
            })
    })
}



const validarJWT = (req = request, res = response, next) => {
  const authHeader = req.headers['authorization'];; // Ej: "Bearer eyJhbGciOiJIUzI1..."

  if (!authHeader) {
    return res.status(400).json({
      msg: 'No hay token en la petición'
    });
  }

  const token = authHeader.split(' ')[1]; // Extraer solo el token después de "Bearer"

  if (!token) {
    return res.status(400).json({
      msg: 'Token malformado o no presente'
    });
  }

  try {
    const payloadJWT = jwt.verify(token, process.env.SECRETJWT);
    req.usuarioJWT = payloadJWT;
    console.log('Token verificado:', payloadJWT);
    next();
  } catch (error) {
    console.error('Error al verificar token:', error.message);
    res.status(401).json({
      msg: 'El token usado no es válido'
    });
  }
};


module.exports = {
    generarJWT,
    validarJWT
    

}
