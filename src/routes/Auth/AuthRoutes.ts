
import {Router } from 'express'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../../middleware/validation'
import { AuthController } from '../../controllers/Auth/AuthController'

const router = Router()


router.post('/CreateUser',

    body('Name')
        .notEmpty().withMessage('El nombre del Usuario Obligatorio'),
    body('Email')
        .notEmpty().withMessage('El email es Obligatorio'),
    body('password')
        .notEmpty().withMessage('el password es Obligatorio'),
        
    handleInputErrors,
    
    AuthController.createUser)

router.post('/AutenticateUser',

    body('Name')
        .notEmpty().withMessage('El nombre del Usuario Obligatorio'),
    body('Email')
        .notEmpty().withMessage('El email es Obligatorio'),
    body('password')
        .notEmpty().withMessage('el password es Obligatorio'),
        
    handleInputErrors,
    
    AuthController.createUser)



    router.post('/:token',AuthController.validateToken)



       


 /* Routes for tasks */

export default router