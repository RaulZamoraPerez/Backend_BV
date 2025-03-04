
import {Router } from 'express'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../../middleware/validation'
import { BookController } from '../../controllers/Books/BookController'



const router = Router()



router.post('/CreateBook',

    body('Name')
        .notEmpty().withMessage('El nombre del Usuario Obligatorio'),
    body('email')
        .notEmpty().withMessage('El email es Obligatorio'),
    body('password')
        .notEmpty().withMessage('el password es Obligatorio'),
        
    handleInputErrors,
    
    BookController.CreateBook)



       


 /* Routes for tasks */

export default router
