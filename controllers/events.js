// La importación de express se hace para tener el Intelligence al momento de typear.
const { response } = require('express');
// No necestito de las llaves, ya que es una exportación por default:
const Evento = require('../models/Evento');



const getEventos = async (req, res = response) => {

    // populte, le dice que información desea retornar al usuario, para este caso:
    // del user del nombre y por defecto tambien regresa el uid:
    const eventos = await Evento.find().populate('user', 'name');

    res.json({
        ok: true,
        msg: eventos
    })
}


const crearEvento = async (req, res = response) => {

    // console.log(req.body);
    const evento = new Evento(req.body);

    try {

        // Podemos agregar más atributos a un objeto, así:
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        return res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No logró guardar el evento. Pongase en contacto con el administrador!...'
        });
    }
}


const actualizarEvento = async (req, res = response) => {

    // Recuperar parametros que vienen en la URL, porque es una petición PUT:
    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay evento con ese id!...'
            });
        }

        // Validamos si el usuario que intenta modificar el evento es el mismo que lo creo:
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No posee autorización para modificar este evento!...'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        return res.status(201).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se logró actualizar. Pongase en contacto con el administrador!...'
        });
    }
}


const eliminarEvento = async (req, res = response) => {

    // Recuperar parametros que vienen en la URL, porque es una petición PUT:
    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay evento con ese id!...'
            });
        }

        // Validamos si el usuario que intenta modificar el evento es el mismo que lo creo:
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No posee autorización para eliminar este evento!...'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

        return res.status(201).json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el evento. Contacte al administrador!...'
        });
    }
}


// Esta es una exportación en Node.js:
module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}

