'use strict'
let path = require('path');
let fs = require('fs');
let mongoosePaginate = require('mongoose-pagination');

let Artist = require('../models/artist');
let Album = require('../models/album');
let Song = require('../models/song');

function getArtist(req, res) {
    let artistId = req.params.id;
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500)
                .send({ message: 'Error en la peticion' });
        } else {
            if (!artist) {
                res.status(404)
                    .send({ message: 'El artista no existe' })
            } else {
                res.status(200)
                    .send({ artist });
            }
        }
    });

}

function getArtists(req, res) {
    let page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }

    let itemsPerPage = 3;
    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
        if (err) {
            res.status(500
                .send({ message: 'Error en la peticion.' }));
        } else {
            if (!artists) {
                res.status(404)
                    .send({ message: 'No hay artistas !!' });
            } else {
                return res.status(200)
                    .send({
                        total_items: total,
                        artists: artists
                    });
            }
        }
    });
}

function saveArtist(req, res) {
    let artist = new Artist();

    let params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';
    artist.save((err, artistStored) => {
        if (err) {
            res.status(500)
                .send({ message: 'Error al guardar el artista' });
        } else {
            if (!artistStored) {
                res.status(404)
                    .send({ message: ' El artista no ha sido guardado' });
            } else {
                res.status(200)
                    .send({ artist: artistStored });
            }
        }
    });
}

function updateArtist(req, res) {
    let artistId = req.params.id;
    let update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err) {
            res.status(500)
                .send({ message: 'Error al actualizar el artista' });
        } else {
            if (!artistUpdated) {
                res.status(404)
                    .send({ message: 'No se pudo actualizar el artista' });
            } else {
                return res.status(200)
                    .send({ artist: artistUpdated });
            }
        }
    });
}

function deleteArtist(req, res) {
    let artistId = req.params.id;
    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            res.status(500)
                .send({ message: 'Error al eliminar el artista' });
        } else {
            if (!artistRemoved) {
                res.status(404)
                    .send({ message: 'El artista no se pudo eliminar' })
            } else {
                Album.find({ artist: artistRemoved._id }).remove((err, albumRemoved) => {
                    if (err) {
                        res.status(500)
                            .send({ message: 'Error al eliminar los ambums' });
                    } else {
                        if (!albumRemoved) {
                            res.status(404)
                                .send({ message: 'Los albums no se han podido eliminar' })
                        } else {
                            Song.find({ album: albumRemoved._id }).remove((err, songRemoved) => {
                                if (err) {
                                    res.status(500)
                                        .send({ message: 'Error al eliminar las canciones' });
                                } else {
                                    if (!songRemoved) {
                                        res.status(404)
                                            .send({ message: 'Las canciones no se han podido eliminar' })
                                    } else {
                                        res.status(200)
                                        .send({artist: artistRemoved });
                                    }
                                }
                            });
                        }

                    }
                });
            }
        }
    });
}

function uploadImage(req, res){
    let artistId = req.params.id;
    let file_name = "No subido ...";
    if(req.files){
        let file_path = req.files.image.path;
        let file_split = file_path.split('\\');
        let file_name = file_split[2];
        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) => {
                if(!artistUpdated){
                    res.status(404)
                        .send({message: 'No se ha podido actualizar el artista'});
                }else{
                    res.status(200)
                        .send({artist: artistUpdated});
                }
            });

        }else{
            res.status(404)
                .send({message: 'Extension no valida'});
        }
    }else{
        res.status(404)
            .send({message: 'No has subido ninguna iumagen'});
    }

}

function getImageFile(req, res){
    let imageFile = req.params.imageFile;
    let path_file = './uploads/artists/'+ imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen...'})
        }
    });
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};