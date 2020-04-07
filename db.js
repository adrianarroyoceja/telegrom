const db = require('mongoose');

db.Promise = global.Promise; //mejor practica utilizar las promesas nativas o de otras librerías

//'mongodb+srv://user:user1234@cluster0-uxxfr.mongodb.net/test?retryWrites=true&w=majority'
async function connect(url) {
    await db.connect(url, {
        useUnifiedTopology: true, useNewUrlParser: true, //buena practica
    });
    console.log('[db] Conectada con éxito');
}

module.exports = connect;