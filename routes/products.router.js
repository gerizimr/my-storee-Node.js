const { response } = require('express');
const express = require('express');
const ProductsService = require('../services/product.service');  // imporoto el servicio

const router = express.Router();
const service = new ProductsService(); // creo la instancia del servicio.

router.get('/', async (req, res) => {  // estamos tratando como asyncrono esperando una promesa
  const products = await service.find(); // tengo una lista de productos y la obtendre de servicios y ejecuto el metodo find
  res.json(products);  // retorno los productos
});


router.get('/', (req, res) => {
  res.json([
    {
    name: 'Product 1',
    price: 1000
    },
    {
      name: 'Product 2',
      price: 2000
    }
  ]);
});

router.get('/filter', (req, res) => { // como el filtrado es fijo debe ir antes de lo dinamico
  res.send('yo soy un filter');
});

// ponemos de forma explicita el uso de los middleware
router.get('/:id', async (req, res) => {  // recibimos el parametro id
  try {  // si todo esta bien que haga lo siguiente:
    const { id } = req.params;  // aqui recibimos el id
  const product = await service.findOne(id); // recibe el producto, puedo hacer busqueda y le mando el id
  res.json(product); // revuelvo el producto
  } catch (error) {  //sino que detecte el error
    next(error); //ejecuta los middleware de tipo error
  }
});


//metodo para crear nuestro producto
router.post('/', async (req, res) => {
  const body = req.body; // del atributo body recibe los parametros que manda insomnia
  const newProduct = await service.create(body); // usamos el servicio para decir que usaremos Create
  res.status(201).json(newProduct); // aqui retornamos el nuevo producto de forma directa
});

//metodo para hacer los patch
router.patch('/:id', async (req, res, next) => {   // colocamos patch agregamos next para uso de middleware
  try {  //si todo esta bien tendremos lo sig en el try
    const { id } = req.params;   // decimos que recibimos el id que queremos editar
    const body = req.body; // del atributo body recibe los parametros que manda insomnia
    const product = await service.update(id, body);// enviamos el id y en el body la info que se actualizara
    res.json(product); // retornamos directamente el producto modificado
  } catch (error) {  // pero sino:
    next(error); //ejecuta los middleware de tipo error
  }
});


//metodo para eliminar
router.delete('/:id', async (req, res) => {   // colocamos delete
  const { id } = req.params;   // decimos que recibimos el id que queremos editar
  const rta = await service.delete(id); // una vez recibido el id lo enviamos a delete
  res.json(rta); // nos envia directo la respuesta del delete
});


// al final generamos como que sea un modulo exportable  y exportamos el router

module.exports = router;
