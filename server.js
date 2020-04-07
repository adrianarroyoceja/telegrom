const express = require('express');
const app = express();
const server = require('http').Server(app)

const config = require('./config');

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
//const router = require('./components/messages/network')
const router = require('./network/routes');

db(config.dbUrl);

app.use(cors());

//app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

socket.connect(server);

router(app);

/*app.use('/', function (req, res) {
    res.send('Hola');
});*/

app.use(config.publicRoute, express.static('public'));

//app.listen(3000);
server.listen(config.port, function() {
    console.log('La app esta escuchando en ' + config.host + ':' + config.port);
});