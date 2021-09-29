'use strict'
let path = require('path');
let fs = require('fs');
let mongoosePaginate = require('mongoose-pagination');

let Artist = require('../models/artist');
let Album = require('../models/album');
let Song = require('../models/song');

function getSong(req, res){
    let songId = req.params.id;
    Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
        if(err){
            res.status(500)
                .send({message: 'Controlador cancion'});
        }else{
            if(!song){
                res.status(404)
                    .send({message: 'No se ha podido encontrar la cancion'});
            }else{
                res.status(200)
                    .send({song});
            }
        }
    });   
}

function getSongs(req, res){
    let albumId = req.params.album;
    let find = null;
    if(!albumId){
        find = Song.find({}).sort('number');
    }else{
        find = Song.find({album: albumId}).sort('number');
    }
    find.populate({
        path: 'album',
        populate:{
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs) => {
        if(err){
            res.status(500)
                .send({message: 'Error en la peticion'});
        }else{
            if(!songs){
                res.status(404)
                .send({message: 'No hay canciones!!'});
            }else{
                res.status(200)
                    .send({songs});
            }            
        }
    });
}



function saveSong(req, res){
    let song = new Song();
    let params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = "";
    song.album = params.album;

    song.save((err, songStored) => {
        if(err){
            res.status(500)
                .send({message : 'Error en el servidor'});
        }else{
            if(!songStored){
                res.status(400)
                    .send({message: 'No se ha guardado la cancion'});                    
            }else{
                res.status(200)
                    .send({song: songStored});
            }
        }
    });


}

function updateSong(req, res){
    let songId = req.params.id;
    let update = req.body;
    Song.findByIdAndUpdate(songId, update, (err, songUpdate) => {
        if(err){
            res.status(500)
                .send({message: 'Error en el servidor'});                
        }else{
            if(!songUpdate){
                res.status(404)
                    .send({message: 'No se ha podido actuializar la cancion'});
            }else{
                res.status(200)
                    .send({song: songUpdate});
            }
        }
    });
}

function deleteSong(req, res){
    let songId = req.params.id;
    Song.findByIdAndDelete(songId, (err, songRemoved) => {
        if(err){
            res.status(500)
            .send({message: 'Error en el servidor'});                
        }else{
            if(!songRemoved){
                res.status(404)
                .send({message: 'No se ha podido eliminar la cancion'});
            }else{
                res.status(200)
                .send({song: songRemoved});
            }
        }    
    });
    
}

function uploadFile(req, res){
    let songId = req.params.id;
    let file_name = "No subido ...";
    if(req.files){
        
        var file_path = req.files.file.path;
        
        let file_split = file_path.split('\\');
        file_name = file_split[2];
        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];
        if(file_ext == 'mp3' || file_ext == 'ogg'){
            Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
                if(!songUpdated){
                    res.status(404)
                        .send({message: 'No se ha podido actualizar la cancion'});
                }else{
                    res.status(200)
                        .send({song: songUpdated});
                }
            });

        }else{
            res.status(404)
                .send({message: 'Extension no valida'});
        }
    }else{
        res.status(404)
            .send({message: 'No has subido ninguna cancion'});
    }

}

function getSongFile(req, res){
    let songFile = req.params.songFile;
    let path_file = './uploads/songs/'+ songFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la cancion...'})
        }
    });
}

module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}