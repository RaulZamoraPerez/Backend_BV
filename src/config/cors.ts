
import { CorsOptions } from 'cors';


export const corsConfig : CorsOptions={
     origin: function(origin, callback){
        const whitelist =[process.env.FRONTENT_URL] //url permitida

        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
     }
}


