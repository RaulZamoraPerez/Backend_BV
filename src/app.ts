import { UdeaDataSource } from './data/mysql/udea.database';
import server from './server';
import colors from 'colors';

const port = process.env.PORT || 4000;

//
UdeaDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

server.listen(port, ()=>{
    console.log(colors.cyan.bold(`REST API funcionando en el puerto ${port}`))
})

