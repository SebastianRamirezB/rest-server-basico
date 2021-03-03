const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validRole, emailExists, existsUserById } = require('../helpers/db-validators');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(validRole),
    validateFields
], usuariosPut );

router.post('/',[
    check('name',  'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El Correo no es válido').isEmail(),
    check('email').custom(emailExists),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validRole),
    validateFields
],usuariosPost );

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existsUserById),
    validateFields
], usuariosDelete);


module.exports =  router;