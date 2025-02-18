
import {Router } from 'express'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { UserController } from '../controllers/UserController'

const router = Router()


//user 
router.get('/user/:id',

    param('id')
       .isNumeric().withMessage('id no valido'),
    handleInputErrors,
    
    UserController.getUserById)


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