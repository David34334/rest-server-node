const Role = require('../models/role');
const User = require('../models/user');

const roleIsValid = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if ( !existsRole ) {
        throw new Error( `Role type: '${role}' is not valid!` );
    }
}

const emailExists = async ( email = '' ) => {
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error (`Email: ${email} is already register!`);
    }
}

const userExistsById = async ( id = '' ) => {
    const idExists = await User.findById( id );
    if ( !idExists ) {
        throw new Error (`El id: ${id} is not register in DB!`);
    }
}

module.exports = { roleIsValid, emailExists, userExistsById }