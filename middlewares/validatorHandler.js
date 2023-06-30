const boom = require('@hapi/boom')
function validatorHandler(schema,property) {
  return (req,res,next)=>{//closure para retornar un middlewares
    const data = req[property]; //para hacer esto adaptable lo escribimos asi por dependiendo si el request es un get patch puede venir en un req.body o req.params o req.query asi que independientemente de lo que venga esto funciona
    const {error/*destructuring */} = schema.validate(data,{abortEarly:false});//propiedad de un schema joi,El abortEarly es para que muestre todos los errores no solo el primero
    if (error) {
      next(boom.badRequest(error))//esto devuelve un error 400 el next es para que lo usen los middlewares
    }
    next()//si no hay error pasa al siguiente middlewares
  }
}
module.exports=validatorHandler;//esto lo importamos en rutas porque no puede ser generico asi que lo usamos en routes en cada caso
