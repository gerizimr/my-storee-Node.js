const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler'); // importamos nuestros middlewars

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

// el orden que le pongamos a los mildware será el orden de ejecucion
app.use(logErrors);  // decimos que la app use ese middleware,
app.use(boomErrorHandler);  // decimos que use ese middleware boom
app.use(errorHandler); // decimos que la app use ese middleware

app.listen(port, () => {
  console.log('Mi port' + port);
});

