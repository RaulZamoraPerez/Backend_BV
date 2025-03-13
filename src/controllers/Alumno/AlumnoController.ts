import type {Request , Response } from 'express'
import User from '../../data/mysql/models/Alumno'
import { generarId } from '../../helpers/tokens'
import { emailRegistro } from '../../helpers/emails'
import bcrypt from 'bcrypt';
import Alumno from '../../data/mysql/models/Alumno';




export class AlumnoController {

  

    static createUser = async(req: Request, res: Response)=>{
         
       const { matricula, nombre, correo, password, telefono, areaAcademica}=req.body

         try{
                    const existeUsuario = await Alumno.findByPk( matricula)

                    if(existeUsuario){
                        res.send('el usuario ya existe')
                        return
                    } 
                    

                    // Hashear la contraseña
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    
                    const usuario = await Alumno.create({
                        nombre,
                        correo,
                         matricula,
                         areaAcademica,
                         telefono,
                         
                        password: hashedPassword,
                        codigoVerificacion: generarId()
                    });
 
                    //envia email de confimacaion
                    emailRegistro({
                    nombre: usuario.nombre!,
                    correo: usuario.correo!,
                    codigoVerificacion: usuario.codigoVerificacion!
                    }) 
            

            res.send('Se ha enviado un email de confirmacion').status(200)
            
            
    } catch (error) {

            console.log(error)
            res.send('hubo un error intentalo de nuevo').status(500)
        }
   }

   static getUserByMatricula = async(req: Request, res: Response)=>{
          
    const {id} = req.params
    try {
        const user = await Alumno.findOne({ where: { matricula: id } })
       
        if(!user){
            res.send('usuario no encontrado')
            return
        }
        res.send(user ).status(200)
        
    } catch (error) {

        console.log(error)
        res.send('hubo un error').status(500)

    }
}



        static getAllAlumnos = async (req: Request, res: Response) => {
            try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = 10;
            const offset = (page - 1) * pageSize;

            const users = await Alumno.findAll({
                limit: pageSize,
                offset: offset,
            });

            const totalUsers = await Alumno.count();

            res.json({
                users,
                totalPages: Math.ceil(totalUsers / pageSize),
                currentPage: page,
                totalUsers,
            });
            } catch (error) {
            console.log({ error });
            res.status(500).send('Hubo un error');
            }
        };
        




static updateUser = async (req: Request, res: Response)=>{
     try {
          res.json({
             message: 'update user'
          })
     } catch (error) {
            console.log(error)
     }
}

}