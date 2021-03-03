const Role = require('../models/role');
const Usuario = require('../models/usuario');


const validRole = async (role = '') => {
    const existsRole = await Role.findOne({role});
    if (!existsRole) {
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const emailExists = async (email = '') => {
    const emailExists = await Usuario.findOne({email});
    if(emailExists) {
        throw new Error(`Email: ${ email } ya esta registrado`);
    }
}

const existsUserById = async (id ) => {
    const userExists = await Usuario.findById(id);
    if(!userExists) {
        throw new Error(`El id: ${ id } no existe`);
    }
}

module.exports = {
    validRole,
    emailExists,
    existsUserById
}