import expres from 'express'
import dotenv from 'dotenv'

// import { connectDB } from './config/db'
 import AuthRoutes  from './routes/Auth/AuthRoutes'
 import  UserRoutes  from './routes/User/UserRoutes'
 import  BookRoutes  from './routes/Book/BookRoutes'


dotenv.config()


const app = expres()



app.use(expres.json())  //habilita el body parser
app.use(expres.urlencoded({extended: true}))  //habilita el body parser

//routes 

app.use('/api/users', UserRoutes  )
app.use('/api/auth', AuthRoutes )
app.use('/api/books', BookRoutes )

export default app