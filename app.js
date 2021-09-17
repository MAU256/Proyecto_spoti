'use Strict';
 
let express = require('express');

let app = express();
 
//cargar rutas
let user_routes = require('./routes/user');
let artist_routes = require('./routes/artist');
let album_routes = require('./routes/album');
let song_routes = require('./routes/song');



app.use(express.urlencoded({extended:true}));
app.use(express.json());

//configurar las cabeceras http
app.use((req, res, next) => {
    res.header('Acess-Controll-Allow-Origin', '*');
    res.header('Acess-Controll-Allow-Headers',
                'Authorization, X-API-KEY, Origin, X-Requested-with, Content-Type, Accept, Access-ControlAllow-Request-Method');
    res.header('Access-ControlA-Allow-Methods', 'GET, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, OPTIONS, PUT, DELETE')
    next();

});

//rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);
module.exports = app;