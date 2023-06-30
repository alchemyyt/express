const express = require('express');
const routerApi = require('./routes');
const {logErrors,errorHandler,boomErrorHandler}=require('./middlewares/errorHandler');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());//esta es una palabra reservada de json para que el servidor reciva json del cliente
const whitelist=['http://localhost:8080','https://myapp.co']
const options ={
  origin:(origin,callback)=>{
    if (whitelist.includes(origin)) {//si esta incluido el origen en la whitelist
      callback(null,true)//ejecuto un callback que no hay error y el acceso esta permitido
    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options));//habilitar cualquier dominio
app.get('/',(req,res)=>{
  res.send('hola mi server en express')
})
app.get('/nueva-ruta',(req,res)=>{
  res.send('hola esta es mi nueva ruta')
})
routerApi(app);//Router Api
app.use(logErrors)//los midleware de errores tienen que ir despues de el router
app.use(boomErrorHandler)//usamos el boom y tiene que ser en medio para que pueda usar el next
app.use(errorHandler)//este de ultimo porque no tiene next() en la logica
app.listen(port,()=>{
  console.log('mi port ' + port)
})
