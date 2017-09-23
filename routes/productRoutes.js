const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = mongoose.model('products');
const requireLogin = require('../middlewares/requireLogin');
const Cart = require('../models/Cart');

module.exports = (app) => {
  app.disable('etag');

  app.post('/prod/product', requireLogin, (req, res) => {
    const product = new Product({
      ...req.body,
      _user: req.user.id,
      dateAdd: Date.now()
    });

    product.save();

    res.status(200).send(product);
  });

  app.get('/prod/products', (req, res) => {
    Product.find({}, function (err, products) {
      res.status(200).send(products);
    });
  });

  app.get('/prod/productId/:name', (req, res) => {
    Product.findOne({
      titleUrl: req.params.name
    }, function (err, product) {
      res.status(200).send(product);
    });
  });

  app.get('/prod/addcart/:id', (req, res) => {

    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {
      if (err) {
        return res.redirect('/');
      }

      cart.add(product, product.id);
      req.session.cart = cart;
      res.send(cart);
    })
  });


  app.get('/prod/removefromcart/:id', (req, res) => {

    const productId = req.params.id;
    const cart = new Cart(req.session.cart);

    Product.findById(productId, (err, product) => {
      if (err) {
        return res.redirect('/');
      }

      cart.remove(product, product.id);
      req.session.cart = cart;
      res.send(cart);

    })
  });


  app.get('/prod/cart', (req, res) => {
    const cart = req.session.cart ? req.session.cart : new Cart({});
    req.session.cart = cart;
    res.send(cart);

  });

};
