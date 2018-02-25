import { Router } from 'express';

const mongoose = require('mongoose');
const Product = mongoose.model('products');

const productRoutes = Router();

productRoutes.get('/products', (req, res) => {
    Product.find({}, function(err, products) {
      res.status(200).send(products);
    });
  });

productRoutes.get('/productId/:name', (req, res) => {
    Product.findOne(
      {
        titleUrl: req.params.name
      },
      function(err, product) {
        res.status(200).send(product);
      }
    );
  });

productRoutes.post('/product', (req, res) => {
    const newProduct = Object.assign(req.body, {_user: req.user.id, dateAdd: Date.now()});
    const product = new Product(newProduct);

    product.save();

    res.status(200).send(product);
  });

export {productRoutes};