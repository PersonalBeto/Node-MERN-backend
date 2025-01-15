/*
    Rutas para los eventos de CRUD del calendario.
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
// const { diffDate } = require('../helpers/diffDate');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

// Obterner eventos:
router.get('/', getEventos);

// Al subir el midleware de validarJWT, le estamos diciendo que cada una de estas rutas deben evaluarlo
// antes de ejeutar el modulo o función del controlador:
router.use(validarJWT);


// Crear evento:
router.post('/new', [
    //Middleware:
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
    // check('end', 'La fecha de inicio es mayor a la de finalización').custom( diffDate ),
    validarCampos
], crearEvento);


// Actualizar evento:
router.put('/:id', [
    //Middleware:
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
    // check('end', 'La fecha de inicio es mayor a la de finalización').custom( diffDate ),
    validarCampos
], actualizarEvento);


// Eliminar evento:
router.delete('/:id', eliminarEvento);


module.exports = router;

