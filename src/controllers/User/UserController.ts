import type {Request , Response } from 'express'
import User from '../../data/mysql/models/User'
import { generarId } from '../../helpers/tokens'
import { emailRegistro } from '../../helpers/emails'
import bcrypt from 'bcrypt';


export class UserController {

    static getUserById = async(req: Request, res: Response)=>{
      
        // const project = new Project(req.body)
        try {
            // await project.save()
            // await Project.create(req.body)
           

            res.send('usuario  ')
            
        } catch (error) {

            console.log(error)
        }
   }


   static  getAllUsers = async (req: Request, res:Response)=>{
      try {
            res.json({
                menssage: 'get All users'
            })
      } catch (error) {
        console.log({error})
      }
   }


    static updateUser = async (req: Request, res: Response)=>{
         try {
              res.json({
                 message: 'update user'
              })
         } catch (error) {
                console.log(error)
         }
    }



    static createUser = async(req: Request, res: Response)=>{
      
         
       const { name, email, password}=req.body

     try{

               //verificar que el usuario no est duplicado 
                    
                    const existeUsuario = await User.findOne( { where:  { email } })
                    if(existeUsuario){
                        res.send('el usuario ya existe')
                        return
                    }
                    
                    
                    // Hashear la contraseña
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    // Almacenar el usuario con la contraseña hasheada
                    const usuario = await User.create({
                        name,
                        email,
                        password: hashedPassword,
                        token: generarId()
                    });
                    


                    //envia email de confimacaion
                    emailRegistro({
                    name: usuario.name,
                    email: usuario.email,
                    token: usuario.token!
                    }) 
            

            res.send('Se ha enviado un email de confirmacion')
            
            
    } catch (error) {

            console.log(error)
            res.send('hubo un error intentalo de nuevo')
        }
   }
}