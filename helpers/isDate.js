const moment = require('moment');

const isDate = ( value ) => {
    if ( !value ) {
        // Si no envian ninguna fecha de start retornamos false:
        return false
    }

    // moment analiza la fecha:
    const fecha = moment( value );

    // isValid es una función propia de moment:
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
}



module.exports = { isDate };

