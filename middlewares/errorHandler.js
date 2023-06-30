function logErrors (err,req,res,next) {
  console.log('logErrors')
  console.error(err);
  next(err)//midleware de tipo error si no pones el error es una normal
}
function errorHandler(err,req,res,next) {
  console.log('errorHandler')
  res.status(500).json({
    message:err.message,
    stack:err.stack,
  })
}
function boomErrorHandler(err,req,res,next) {//esto agarra los errores automaticamente por si no capturamos todos los errores nosotros
  if (err.isBoom) {//boom tiene una propiedad los errores .isBoom que nos dice si es un error tipo boom
    const {output} = err;//y los errores tienen un output
    res.status(output.statusCode).json(output.payload)//dice que status automaticamente y que json mandar automaticamente
  }
  next(err)//si no es tipo boom se ejecuta el next err
}
module.exports={logErrors,errorHandler,boomErrorHandler}


//VER HELMET

