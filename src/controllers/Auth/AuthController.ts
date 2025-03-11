import type {Request , Response } from 'express'
import User from '../../data/mysql/models/User'
import { generarId } from '../../helpers/tokens'
import { emailOlvidePassword } from '../../helpers/emails'
import bcrypt from 'bcrypt';
export class AuthController {

   


   static  loginUser = async (req: Request, res:Response)=>{
      try {
            res.json({
                menssage: 'login'
            })
      } catch (error) {
        console.log({error})
      }
   }


 

  static validateToken = async (req: Request, res: Response)=>{

         const {token} = req.params
         try {
               //verificar si es token es valido
               const usuario = await User.findOne({where :{token}})
            
               if(!usuario){//sino hay usuario, cuando no existe el token
                   res.send(' token no valido ')
                   return
               }
               
               //confirmar cuenta
            
               usuario.token  = null!; //eliminamos el tooken
               usuario.confirmado=true
               await usuario.save();
               
            
               res.send('cuenta confirmada con exito')
               return
         
         } catch (error) {
                console.log(error)
                res.send('error al confirmar cuenta')
         }
  }
  static resetPassword = async (req: Request, res: Response)=>{
         const {email}= req.body

            try {
                  //sisi es email busca al usuario
                    
                     const usuario = await User.findOne({where:{email}})//buscar el email
                     
                     if(!usuario){
                         res.send('el email no existe')
                         return
                  }  
                     //generar el token y enviar el email
                     usuario.token=generarId();
                     await usuario.save();

                     //enviar un email

                        emailOlvidePassword({
                           email:usuario.email,
                           name:usuario.name,
                           token:usuario.token
                        })
                     //renderizar un mensaje
                     res.send('se ha enviado un email para restablecer tu password')
                           
                  }
      catch (error) {
               console.log(error)
               res.send('error al enviar email')
      }
          
      }

   static forgotPassword = async (req: Request, res: Response)=>{// para cambiar el password
         try {
                   //validarr passwor
                           
                                 const {token} = req.params
                                 const {password}= req.body
                              
                                 //identificar quien hace el cambio
                                 const usuario = await User.findOne({where:{token}})
                           
                                 if(!usuario){
                                    res.send('token no valido')
                                    return
                                 }

                              //hashear el password
                              const salt = await bcrypt.genSalt(10)
                              usuario.password = await bcrypt.hash(password, salt)
                              usuario.token =null!;
                              await usuario.save();
                           
                              res.send('password actualizado');
  
         } catch (error) {
               console.log({error})
               res.send('error al actualizar password')
         }
   }
}