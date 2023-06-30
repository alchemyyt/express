const faker = require('faker');
const boom = require('@hapi/boom')
class ProductsService{
  constructor(){
    this.products = [];
    this.generate();//aqui genera los productos una sola vez para que no cambie a menos que se reinicie el server
  }
  generate(){
      const limit =100;
      for (let i = 0; i < limit; i++) {
        this.products.push({
          id: faker.datatype.uuid(),
          name:faker.commerce.productName(),
          price:parseInt(faker.commerce.price(),10),
          image:faker.image.imageUrl(),
          isBlock:faker.datatype.boolean(),//true false random
        })
      }
  }
  async create(data){
    const newProduct={
      id: faker.datatype.uuid(),
      ...data//concatenar los valores que nos entregue el cliente que viene en data
    }
    this.products.push(newProduct);
    return newProduct;
  }
  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000);
    })
  }
  async findOne(id){
    const product = this.products.find(item=>item.id===id);
    if (!product) {
      throw boom.notFound('product not found')//si no encotramos product devuelve error
    }else if (product.isBlock) {
      throw boom.conflict('product is block')//esto devuelve un error 409
    }
    return product
  }
  async update(id,changes){
    const index = this.products.findIndex(item=>item.id===id);
    if (index === -1) {
      throw boom.notFound('product not found');//producto no encontrado boom hace todo el trabajo pone automaticamente un error 404
    }
    const product = this.products[index];//para conservar los datos anteriores
    this.products[index]={
      ...product,//trae todos los datos viejos
      ...changes//e incorpora los nuevos
    }//sprigt operation
    return this.products[index]
  }
  async delete(id){
    const index = this.products.findIndex(item=>item.id===id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);//elimina la posicion dada de un array y cuantos elementos eliminar a partir de esa posicion en este caso una
    return {message:'se elimino',id}
  }
}
module.exports  = ProductsService;

