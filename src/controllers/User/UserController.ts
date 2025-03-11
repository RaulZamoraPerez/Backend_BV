import type {Request , Response } from 'express'
import User from '../../data/mysql/models/User'
import { generarId } from '../../helpers/tokens'
import { emailRegistro } from '../../helpers/emails'
import bcrypt from 'bcrypt';


export class UserController {

    static getUserById = async(req: Request, res: Response)=>{
          
        const {id} = req.params
        try {
            const user = await User.findByPk(id)
           
            if(!user){
                res.send('usuario no encontrado')
                return
            }
            res.send(user )
            
        } catch (error) {

            console.log(error)
            res.send('hubo un error')

        }
   }



            static getAllUsers = async (req: Request, res: Response) => {
                try {
                const page = parseInt(req.query.page as string) || 1;
                const pageSize = 10;
                const offset = (page - 1) * pageSize;

                const users = await User.findAll({
                    limit: pageSize,
                    offset: offset,
                });

                const totalUsers = await User.count();

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