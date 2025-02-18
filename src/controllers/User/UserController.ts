import type {Request , Response } from 'express'

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
}