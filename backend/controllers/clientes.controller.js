           
const { request, response } = require('express');
const listaUsuario = require('../db/listaUsuario');
const { listaclientes } = require('../db/listtaClientes');

const enviarUsuario = async (req = request, res = response) => {
    try{
        res.status(200).json({
            msg: 'Lista de usuarios',
            clienttes: listaclientes
        });

    }catch(error){
        res.status(500).json({
            msg: `Error en el servidor: ${error}`
        });
    }
}

module.exports = { enviarUsuario };