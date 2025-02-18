import type {Request , Response } from 'express'

export class AuthController {

    static createUser = async(req: Request, res: Response)=>{
      
        // const project = new Project(req.body)
        try {
            // await project.save()
            // await Project.create(req.body)

            res.send('usuario  creado correctamente')
            
        } catch (error) {

            console.log(error)
        }
   }


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
         try {
              res.json({
                 message: 'validate token'
              })
         } catch (error) {
                console.log(error)
         }
  }
          
}