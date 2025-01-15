const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (req, res = response, next) => {
    // next le está diciendo a los Middleware de routes\auth.js que se ejecute el primero
    // y venga acá a ejecutar la función, y luego que ejecute el siguiente y así:

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // Si no hay ningun error llamamos el next.
    next()
}


module.exports = {
    validarCampos
}

