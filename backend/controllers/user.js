'use strict'

let bcrypt = require('bcrypt-nodejs');
let User = require('../models/user');
let jwt = require('../services/jwt');
let fs = require('fs');
let path = require('path');



function saveUser(req, res) {
    let user = new User();

    let params = req.body;
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if (params.password) {
        //Encriptar password
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;

            User.findOne({ email: user.email.toLowerCase() }, (err, email) => {
                if (err) {
                    res.status(500).send({ message: 'Hubo un error en el registro' });
                } else if (email) {
                    res.status(500).send({ message: 'Este email ya existe' });
                }
                else {
                    if (user.name != '' && user.surname != '' && user.email != '') {
                        //Guardar el usuario
                        user.save((err, userStore) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al guardar el ususario' });
                            } else {
                                if (!userStore) {
                                    res.status(400).send({ message: 'No se ha guardado el usuario' });
                                } else {                                   
                                    res.status(200).send({ user: userStore });
                                }
                            }
                        });
                    } else {
                        res.status(500).send({ message: 'Rellena todos los campos' });
                    }
                }
            });


        });
    } else {
        res.status(500).send({ message: 'Rellena todos los campos' });
    }
}

function loginUser(req, res) {
    let params = req.body;
    let email = params.email;
    let password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                //Comprobar el password
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        // Devolver los datos del usuario logeado 
                        if (params.gethash) {
                            //Devolver un token de jwt  
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido logearse' });
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {
    let userId = req.params.id;
    let update = req.body;
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            } else {
                res.status(202).send({ message: userUpdated });
            }
        }
    });


}

function uploadImage(req, res) {
    let userId = req.params.id;
    let file_name = "No subido..."

    if (req.files) {
        let file_path = req.files.image.path;
        console.log(file_path);
        let file_split = file_path.split('\\');
        let file_name = file_split[2];
        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];
        console.log(file_split);
        console.log(ext_split);

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'gif') {
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar la imagen' });
                } else {
                    if (!userUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar la imagen' });
                    } else {
                        res.status(200).send({ image: file_name, user: userUpdated });
                    }
                }

            });
        } else {
            res.status(200).send({ messagge: 'No has subido ninguna imagen...' })
        }
    } else {
        res.status(200).send({ message: 'No has subido ninguna imagen...' });
    }
}

function getImageFile(req, res) {
    let imageFile = req.params.imageFile;
    let path_file = './uploads/users/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen...' })
        }
    });
}

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};