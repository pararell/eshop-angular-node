import { Router } from 'express';

const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Cart = require('../models/Cart');

const cartRoutes = Router();

cartRoutes.get('/addcart/:id', (req, res) => {

    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {
      if (err) {
        return res.redirect('/');
      }

      cart.add(product, product.id);

      req.session.cart = cart;

      if (req.user) {
        req.user.cart = cart;
        req.user.save();
      }
      res.send(cart);
    });
  });


cartRoutes.get('/removefromcart/:id', (req, res) => {
    const productId = req.params.id;
    const storeCart = req.session.cart ? req.session.cart : new Cart({});
    const cart = new Cart(storeCart);

    Product.findById(productId, (err, product) => {
      if (err) {
        return res.redirect('/');
      }

      cart.remove(product, product.id);
      req.session.cart = cart;
      if (req.user) {
        req.user.cart = cart;
        req.user.save();
      }
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
         .send(cart);
    });
  });

cartRoutes.get('/cart', (req, res) => {
    const cart = req.user ? req.user.cart : req.session.cart ? req.session.cart : new Cart({});
    req.session.cart = cart;
    res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
      .send(cart);
  });


export {cartRoutes};
