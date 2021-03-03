const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res) => {

    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};

    const [total, users] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
       total,
       users
    });
}

const usuariosPost = async (req, res) => {

    const {name, email, password, role}= req.body;
    const usuario = new Usuario({name, email, password, role});
   
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos
    await usuario.save();

    res.status(201).json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const {_id, password, google, email, ...others} = req.body;

    //TODO validar contra base de datos
    if(password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(password, salt);
    }

    //Actualizacion en la base de datos
    const user = await Usuario.findByIdAndUpdate(id, others);

    res.status(400).json(user);
}


const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params; 

    //Eliminiar fisicamente de la base de datos
    // const user = await Usuario.findByIdAndDelete(id);

    const user = await Usuario.findByIdAndUpdate(id, {status: false});


    res.json(user);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}