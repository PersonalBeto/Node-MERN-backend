const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// console.log(process.env);

// Crear el servidor express:
const app = express();

// Base de Datos:
dbConnection();


// CORS:
app.use(cors())


// Directorio Público: Utilizamos el Middleware "use", recordemos que un Middleware, es solo una función
// que se ejecutan antes de una petición:
app.use(express.static('public'));

// Este Middleware, es para que me reciba lo que viene en el body de la request en formato Json.
app.use(express.json());

// Rutas:
// Todo lo que el archivo "routes/auth", va a exportar, lo va habilitar en la ruta "/api/auth"
app.use('/api/auth', require('./routes/auth'));
// CRUD: eventos
// Todo lo que el archivo "routes/events", va a exportar, lo va habilitar en la ruta "/api/events"
app.use('/api/events', require('./routes/events'));


// Rutas: Comentamos estas líneas de las rutas, porque queremos que el usuario pueda ver el 
//        app, desde el navegador, por eso lo reemplazamos por la función anterior a este código.
// app.get('/', ( req, res ) => {
//     res.json({
//         ok: true
//     })
// })

// Escuchar peticiones, No debemos utilizar el puerto 3000, ya que este es el puerto que utiliza React:
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
})

