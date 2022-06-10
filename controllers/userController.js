const { response, request } = require('express');

const getUser = (req = request, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - controller',
        query
    });
}

const postUser = (req, res) => {

    const { name, age } = req.body;

    res.json({
        msg: 'post API - controller',
        name,
        age
    });
}

const putUser = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
    });
}

const deleteUser = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = { getUser, postUser, putUser, deleteUser }