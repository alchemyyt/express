const express = require('express');
const router = express.Router();
const ProductsService = require('./../services/product.service');
const service = new ProductsService();
const validatorHandler = require('./../middlewares/validatorHandler');
const {createProductSchema,updateProductSchema,getProductSchema}=require('./../schemas/product.schema');
router.get('/',async (req,res)=>{//async para poder usar el await
  const products = await service.find();//await porque se va a ejecutar una promesa
  res.json(products)
})
router.get('/filter',(req,res)=>{//esto debe ir ante de la funcion de abajo porque si no chocan porque esta es una ruta especifica y la de abajo es como una variable por lo que filter se tomaria como un id si estuviera abajo
  res.send('Yo soy un filter')
})
router.get('/:id',
  validatorHandler(getProductSchema,'params'),//usamos el middleware aqui para concatenarlo con el de abajo que basicamente es un middleware tambien
  async (req,res,next)=>{//async para poder usar el await
    try {
      const {id} = req.params;//recibir el id
      const product = await service.findOne(id);//await porque se va a ejecutar una promesa
    res.json(product)
    } catch (error) {
      next(error);//usamos el middlewares
    }
  }
)

//controlador de post de products
router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
    const body = req.body;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct);//201 http se creo con exito
  }
)
//controlador de patch de products
router.patch('/:id',
  validatorHandler(getProductSchema,'params'),//valida el id porque lo usamos abajo
  validatorHandler(updateProductSchema,'body'),//valida el update
  async (req,res,next)=>{
    try {
      const {id}=req.params
      const body = req.body;
      const product= await service.update(id,body )//el body es el update que mande el usuario
      res.json(product)
    } catch (error) {
      /*res.status(404).json({
        message:error.message//como en ProductsService pusimos que el si hay un error en update sea un new error para ver el error aqui el el json que estoy mandando al cliente tengo que poner la propiedad message
      })*/
      next(error);//ponemos esto para que el errorHandler trabaje esto acordarse de poner next como parametro
    }
  }
)
//controlador de delete de products
router.delete('/:id',async (req,res)=>{
  const {id}=req.params
  const respuesta= await service.delete(id)
  res.json(respuesta)
})
module.exports  = router;
