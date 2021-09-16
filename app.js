'use Strict';
 
let express = require('express');

let app = express();
 
//cargar rutas
let user_routes = require('./routes/user');
let artist_routes = require('./routes/artist');
let album_routes = require('./routes/album');



app.use(express.urlencoded({extended:true}));
app.use(express.json());

//configurar las cabeceras http

//rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);

module.exports = app;