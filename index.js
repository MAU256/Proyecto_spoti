'use strict'

let mongoose = require('mongoose');
let app = require('./app');
let port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/proyecto_spoti',{ useNewUrlParser:true, useUnifiedTopology: true }, (err,res) =>{
    
    if(err){
        throw err;        
    }else{
        console.log("La conexion a la base de datos esta funcinando correctamente...");
        app.listen(port, function(){
            console.log("Servidor del api rest de musica escuchando en http://localhost:" + port);
        });
    }
});