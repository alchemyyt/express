const express = require('express');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');

//const usersRouter = require('./users.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1',router)//version ruta para todos
  router.use('/products',productsRouter)
  router.use('/categories',categoriesRouter)
  router.use('/users',usersRouter)
  //app.use('/users',usersRouter)
}
module.exports = routerApi;
