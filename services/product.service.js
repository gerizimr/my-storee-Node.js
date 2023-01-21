const faker = require('faker');
const boom = require('@hapi/boom');  // agregamos la libreria de boom

class ProductsService {  // debe estar en plural // usamos programacion orientada a objetos

  constructor() {  // hacemos un constructor y manejaremos todo en memoria por el momento
    this.products = [];  // creamos arreglo en memoria de productos
    this.generate(); // cada vez que genere una instancia del producto, generara 100 productos iniciales
  }

  generate() {  // generamos un metodo que tendra la logica del negocio
    const limit = 100;  // le digo que inicie con 100 productos
    for (let index = 0; index < limit; index++) {  // el limit sera la cantidad de productos que generen
      this.products.push({
        id: faker.datatype.uuid(), // id de forma aleatoria
        name: faker.commerce.productName(),  // genero 100 nombres
        price: parseInt(faker.commerce.price(), 10),  // genero 100 precios y paso de string a int
        Image: faker.image.imageUrl(), //genero 100 url de imagen
        isBlock: faker.datatype.boolean(),  // indicamos que bloquee de forma aleatoria true false
      });
    }
  }

  async create(data) {  // aqui vamos a recibir la información que queremos crear
    const newProduct = {  // este es nuestro nuevo producto
      id: faker.datatype.uuid(),   // tendriamos que generar nuestro id
      ...data // el nombre, precio etc deberia entregarlo el cliente desde insomnia ... hace merge a esos valores
    }
    this.products.push(newProduct);  // queremos insertar el newproduct a nuestro array
    return newProduct;  // retornamos el nuevo producto
  }

  //Ejemplo para emular demora
  async find() {
    return new Promise((resolve, reject) => {  // retornara una promesa
      setTimeout(() => {   // para emular la demora
        resolve(this.products); // el metodo dice que resolve con los datos de productos
      },5000); // vamos a esperar 5 segundos para que resuelva la informacion
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id); //buscamos en el arreglo, si el id es igual igual el id
    if (!product) {  // sino encontramo su producto entonces vamos a enviar un error
      throw boom.notFound('product not found'); // usamos boom para el error que no existe el elemento, en lugar de poner numero de error usamos el nombre
    }  // indico que valide si el producto esta bloqueado
    if (product.isBlock) {
      throw boom.conflict('product is block');  // si esta bloquedo mostrara el error 409 conflic
    }  // si todo esta bien
    return product; // retornamos el producto
  }

  async update(id, changes) {  // recibe el id del producto y los cambios que vamos hacer
    const index = this.products.findIndex(item => item.id === id); //encontrar la posicion del objeto
    if (index === -1) { // sino lo encuentra nos devuelve un -1
      throw boom.notFound('product not found'); // usamos boom para el error que no existe el elemento, en lugar de poner numero de error usamos el nombre
    } // si encuentra el elemento procede a:
    const product = this.products[index]; // obtenemos el producto, lo sacamos de la posicion
    this.products[index] = { // cuando hagamos los cambios vamos a usar splite operation
      ...product,  // quiero persistir los atributos que hay que producto
      ...changes //que aplique todos los cambios nuevos
    };
    return this.products[index]; // retornar el objeto modificado
  }

  async delete(id) { // recibimos el id
    const index = this.products.findIndex(item => item.id === id); //encontrar la posicion del objeto
    if (index === -1) { // sino lo encuentra nos devuelve un -1
      throw boom.notFound('product not found'); // usamos boom para el error que no existe el elemento, en lugar de poner numero de error usamos el nombre
    } // si encuentra el elemento procede a:
    this.products.splice(index, 1); // splice nos permite enviar una posicion para poder eliminarla y cuantos
    // elementos quiero eliminar  a partir de esa posicion
    return { id };   // que retorne el id que elimino
  }
}

module.exports = ProductsService;
