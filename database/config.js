const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            });

            console.log('B. de D. On line!...')

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la conección a la B. de D.  ' + error );
    }

}

module.exports = {
    dbConnection
}


