import type {Request , Response } from 'express'


export class BookController {

   
        static  CreateBook = async (req: Request, res:Response)=>{
            try {
                    res.json({
                        menssage: 'login'
                    })
            } catch (error) {
                console.log({error})
            }
        }

        static  GetBooks = async (req: Request, res:Response)=>{
            try {
                    res.json({
                        menssage: 'login'
                    })
            } catch (error) {
                console.log({error})
            }
        }


}