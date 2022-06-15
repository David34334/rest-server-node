const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.params;

    const [ total, users ] = await Promise.all([ 
        User.countDocuments({ state: true }), 
        User.find({ state: true })
        .skip(Number( from ))
        .limit(Number( limit )) 
    ]);

    res.json({
        total,
        users
    });
}

const postUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User( {name, email, password, role} );

    /** Encriptar la contraseña */
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    /** Guardar en DB */
    await user.save();

    res.json( user );
}

const putUser = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //TODO Validar contra DB

    if ( password ) {
        /** Encriptar la contraseña */
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json( user );
}

const deleteUser = async (req, res) => {

    const { id } = req.params;

    //const user = await User.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate( id, { state: false } );

    res.json( user );
}

module.exports = { getUser, postUser, putUser, deleteUser }