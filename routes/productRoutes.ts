import { Router } from 'express';

const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Order = mongoose.model('orders');
const requireLogin = require('../middlewares/requireLogin');

const productRoutes = Router();

productRoutes.get('/products', (req, res) => {
    Product.find({}, function(err, products) {
      res.status(200).send(products);
    });
  });

productRoutes.get('/productQuery/:query', (req, res) => {
    Product.find(
      {
        titleUrl:  new RegExp(req.params.query, 'i')
      },
      function(err, products) {
        const updatedProducts = products
          .map(product => product.titleUrl);
        res.status(200).send(updatedProducts);
      }
    );
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


productRoutes.post('/orders', requireLogin, (req, res) => {
  const token = req.body.token;
    Order.find(
      {
        _user: token
      },
      function(err, orders) {
        res.status(200).send(orders);
      }
    );
});


export {productRoutes};
