const express = require('express');

const router = express.Router();


router.get('/:categoryId/products/:productId', (req, res) => { // el id de categoria y producto debe cambiar
  const { categoryId, productId } = req.params; // indico que el id de categoria y de productos me interesan de params
  res.json({
    categoryId,
    productId,
  });
})

// al final generamos como que sea un modulo exportable  y exportamos el router

module.exports = router;
