
import {Router } from 'express'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../../middleware/validation'
import { UserController } from '../../controllers/User/UserController'
import { IsEmail } from 'sequelize-typescript'

const router = Router()


//user 


router.post('/CreateUser',

    body('name')
        .notEmpty().withMessage('El nombre del Usuario Obligatorio'),
    body('email')
        .notEmpty().withMessage('El email es Obligatorio')
        .isEmail().withMessage('Email no valido'),
    body('password')
        .notEmpty().withMessage('el password es Obligatorio')
        .isLength({min:6}).withMessage('El password debe ser mayor a 6 caracteres'),
        
    handleInputErrors,
    
    UserController.createUser)


//obtenr user por id
router.get('/user/:id',

    param('id')
       .isNumeric().withMessage('id no valido'),
    handleInputErrors,
    
    UserController.getUserById)

//obtener todos los usuarios
router.get('/getAllUsers',
        UserController.getAllUsers)


//updateUser
    router.put('/user/:id',
        param('id')
       .isNumeric().withMessage('id no valido'),
    handleInputErrors,
        UserController.updateUser)

       


 /* Routes for tasks */

export default router