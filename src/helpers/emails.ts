import nodemailer from 'nodemailer'




interface datosEmail{
  name: string,
  email: string,
  token: string
}

const emailRegistro = async (datos: datosEmail)=>{//
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const {name, email, token}= datos

      //enviar el email

      await transport.sendMail({
          from: 'BienesRaices.com',
          to: email,
          subject: 'confirma tu cuenta en Biblioteca_Udea.com', //asunto
          text: 'confirma tu cuenta en bibliotecaUdea',   //es lo mismo 
          html: `<p>  Hola ${name} comprueba tu cuenta en Bibliotoeca_UDEA</p>
          <p>Tu cuenta esta lista solo debes confirmarla en el siguiente enlace:
             <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/confirmar/${token}">confirmar cuenta</a>    
            <!-- <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">confirmar cuenta</a>     ulr hosting  -->
        
        
          </p>

          <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
          `
      })
}



const emailOlvidePassword = async (datos : datosEmail)=>{//
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number( process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const {name, email, token}= datos

    //enviar el email

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'restablece tu password en bibliotecaUDEA.com', //asunto
        text: 'restablece tu password en bibliotecaUdea.com',   //es lo mismo 
        html: `<p> Hola ${name} has solicitado restablecer tu password en bibliotecaUdea </p>
        <p>sigue el siguiente enlace para generar un password nuevo:
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">restablecer password</a>      <!--      url de local-->
       <!--  <a href="${process.env.BACKEND_URL}/auth/olvide-password/${token}">restablecer password</a>                                      url de hosting-->
        </p>

        <p>Si tu no solicitaste el cambio de password  puedes ignorar el mensaje</p>
        `
    })
}
export{
    emailRegistro,
    emailOlvidePassword
}