const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // El siguiente campo del modelo o colección nos dice que el tipo es de un modelo o colección que ya existe,
    // y el segundo párametro nos dice que se llama Usuario en su exportación.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// las siguientes líneas de código solo actuan para el json, es decir, para la respuesta al usuario,
// la que se envia desde el controlador como: res.status(###).json({ ... }):
EventoSchema.method('toJSON', function() {
    // Desestructuramos toObject, quien es la respuesta que enviamos desde el controlador:
    const { __v, _id, ...object  } = this.toObject(); 
    // Luego reemplazamos el _id por id y no tenemos en cuenta el __v:
    object.id = _id;
    // Por último retornamos el objeto actualizado desde el controlador al usuario:
    return object;
})

module.exports = model('Evento', EventoSchema);

