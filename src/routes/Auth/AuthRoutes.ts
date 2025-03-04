
import {Router } from 'express'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../../middleware/validation'
import { AuthController } from '../../controllers/Auth/AuthController'
import { IsEmail } from 'sequelize-typescript';

const router = Router()



router.post('/AutenticateUser',

    body('Name')
        .notEmpty().withMessage('El nombre del Usuario Obligatorio'),
    body('email')
        .notEmpty().withMessage('El email es Obligatorio'),
    body('password')
        .notEmpty().withMessage('el password es Obligatorio'),
        
    handleInputErrors,
    
    AuthController.loginUser)


    //confirmar cuenta
    router.post('/confirmar/:token',AuthController.validateToken)


    router.post('/resetPassword',
    
        body('email')
            .notEmpty().withMessage('El email es Obligatorio')
            .isEmail().withMessage('Email no valido'),
       handleInputErrors,

        AuthController.resetPassword)

  router.post('/forgotPassword/:token',
    body('password')
    .isLength({min:6}).withMessage('El password debe ser mayor a 6 caracteres'),
    handleInputErrors,
    AuthController.forgotPassword)


       


 /* Routes for tasks */

export default router