// La importación de express se hace para tener el Intelligence al momento de typear.
const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne( { email} );

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo!...'
            });
        }

        usuario = new Usuario( req.body );

        // Encriptar la contraseña:
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

    
        // El status 201, le dice que se creo correctamente:
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al intentar registrar un usuario. Contactese con el administrador!...'
        })
    }

}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne( { email} );

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario identificado con ese correo no existe!...'
            });
        }

        // Confirmamos si la contraseña concuerda con una almacenada en la B. de D.
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password suministrado no es valido!...'
            });
        }

        // Acá estamos listos para generar nuestro JWT:
        const token = await generarJWT( usuario.id, usuario.name );


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })        

    } catch (error) {
        
    }


}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}


// Esta es una exportación en Node.js:
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}

