const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;  // usamos el req tipo query
  if (limit && offset) {  // como es opcional necesitamos tener una condicion
    res.json({
      limit,
      offset
    });
  }else {
    res.send('No hay parametros');
  }
});

// al final generamos como que sea un modulo exportable  y exportamos el router

module.exports = router;
