function logErrors (err, req, res, next) { // middleware para capturar cualquier error
  console.log('logErrors'); // para decir el middleware que estamos ejecutando
  console.error(error); // hacer una impresion para informar el error
  // es util para poder hace traking de los errores e incorporar sistemas de errores como centry, etc.
  next(err);// debemos poner err para indicar que es un middleware de tipo normal
}

function errorHandler (err, req, res, next) { // middleware para capturar cualquier error pero va a generar un formato para devolvero al cliente
  console.log('logErrors'); // para decir el middleware que estamos ejecutando
  res.status(500).json({ // como no quiero seguir a otro middleware envio el res con el error y envio en formato json
    message: err.message, // decimos que tenemos el mensaje del error
    stack: err.stack,  // decimos que tenemos el stack del error para saber en donde ocurrio el error
  });
}

function boomErrorHandler(err, req, res, next) { // middleware para capturar cualquier error pero va a generar un formato para devolvero al cliente
  if (err.isBoom) { // cuando el error es tipo boom se habilita la propiedad isBoom.
    const { output } = err; // ese error boom tiene toda la info en output
    res.status(output.statusCode).json(output.payload); // si es de tipo boom finalizamos la peticion, leemos el estatus code desde el output
    //para que sea dinamico, y json viene de payload con la informacion del error por medio de output
  } // sino es de tipo boom:
  next(err);   // que vaya y ejecutute un middleware de tipo error normal
}

module.exports = { logErrors, errorHandler, boomErrorHandler } // colocamos el modulo  para exportarlo y lo unimos a logErrors, errorHandler, boomErrorHandler

