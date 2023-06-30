const express = require('express');
const router = express.Router();
router.get('/:categoryId/products/:productId',(req,res)=>{//http://localhost:3000/categories/1/products/10
  const{categoryId,productId}=req.params;
  res.json({
    categoryId,
    productId,
  })
})
module.exports  = router;
