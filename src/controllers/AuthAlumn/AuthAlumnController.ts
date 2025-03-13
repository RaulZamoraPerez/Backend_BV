import type {Request , Response } from 'express'
import { generarId } from '../../helpers/tokens'
import { emailOlvidePassword } from '../../helpers/emails'
import bcrypt from 'bcrypt';
import Alumno from '../../data/mysql/models/Alumno';


export class AuthAlumnoController {

   

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
               const usuario = await Alumno.findOne({where :{ codigoVerificacion: token}})
            
               if(!usuario){//sino hay usuario, cuando no existe el token
                   res.send(' token no valido ')
                   return
               }
               
               //confirmar cuenta
            
               usuario.codigoVerificacion = null!; //eliminamos el tooken
               usuario.verificado =true
               await usuario.save();
               
            
               res.send('cuenta confirmada con exito')
               return
         
         } catch (error) {
                console.log(error)
                res.send('error al confirmar cuenta')
         }
  }
  static resetPassword = async (req: Request, res: Response)=>{
         const {correo}= req.body

            try {
                  //sisi es email busca al usuario
                    
                     const usuario = await Alumno.findOne({where:{correo}})//buscar el email
                     
                     if(!usuario){
                         res.send('el email no existe')
                         return
                  }  
                     //generar el token y enviar el email
                     usuario.codigoVerificacion=generarId();
                     await usuario.save();

                     //enviar un email

                        emailOlvidePassword({
                           correo:usuario.correo!,
                           nombre:usuario.nombre!,
                           codigoVerificacion:usuario.codigoVerificacion!
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
                                 const usuario = await Alumno.findOne({where:{ codigoVerificacion: token }})
                           
                                 if(!usuario){
                                    res.send('token no valido')
                                    return
                                 }

                              //hashear el password
                              const salt = await bcrypt.genSalt(10)
                              usuario.password = await bcrypt.hash(password, salt)
                              usuario.verificado =null!;
                              usuario.codigoVerificacion = null!;
                              await usuario.save();
                           
                              res.send('password actualizado');
  
         } catch (error) {
               console.log({error})
               res.send('error al actualizar password')
         }
   }
}