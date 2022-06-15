/** Router with Express API */
const { Router } = require('express');
const { check } = require('express-validator');

/** Controllers */
const { getUser, postUser, putUser, deleteUser } = require('../controllers/userController');

/** Middlewares & Helpers */
const { roleIsValid, emailExists, userExistsById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get( '/', getUser );

router.get( '/:from', [
    check('limit', 'Limit must be a number!').isNumeric(),
    check('from', 'From must be a number!').isNumeric(),
    validateFields
], getUser );

router.put( '/:id', [
    check('id', 'ID is not valid').isMongoId().custom( userExistsById ),
    check('role').custom( roleIsValid ),
    validateFields
], putUser );

router.post( '/', [
    check('name', 'Name is required!').notEmpty(),
    check('email', 'Email is not valid!').isEmail().custom( emailExists ),
    check('password', 'Password at least 6+ characters!').isLength({min: 6}),
    check('role').custom( roleIsValid ),
    validateFields
], postUser );

router.delete( '/:id', [
    check('id', 'ID is not valid').isMongoId().custom( userExistsById ),
    validateFields
], deleteUser );

module.exports = router;