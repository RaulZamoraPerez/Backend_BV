import expres from 'express'
import dotenv from 'dotenv'
// import { connectDB } from './config/db'
 import AuthRoutes  from './routes/AuthRoutes'
 import  UserRoutes  from './routes/UserRoutes'

dotenv.config()


const app = expres()

app.use(expres.json())  //habilita el body parser

//routes 

app.use('/api/users', UserRoutes  )
app.use('/api/auth', AuthRoutes )

export default app