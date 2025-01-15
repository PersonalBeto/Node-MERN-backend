/*
    Rutas de usuario o authentication.
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// Esta es una importación en Node.js:
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt')


router.post(
    '/new',
    [ //Middleware:
        check('name', 'El nombre es obligatorio').not().isEmpty(), // Chequea que el campo sea obligatorio y que no venga vacio.
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [ //Middleware:
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

    // Como es un solo middleware, no es necesario hacer un arreglo con cada uno como en los anteriores:
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;

