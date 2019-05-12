import { Router } from 'express';

const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Cart = require('../models/Cart');

const cartRoutes = Router();

cartRoutes.get('/addcart/:id/:lang', (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }

    const updatedProduct = prepareProduct(product, req.params.lang);
    cart.add(updatedProduct, product.id);
    req.session.cart = cart;

    if (req.user) {
      req.user.cart = cart;
      req.user.save();
    }
    res.send(cart);
  });
});

cartRoutes.get('/removefromcart/:id/:lang', (req, res) => {
  const productId = req.params.id;
  const storeCart = req.session.cart ? req.session.cart : new Cart({});
  const cart = new Cart(storeCart);

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }

    const updatedProduct = prepareProduct(product, req.params.lang);

    cart.remove(updatedProduct, product.id);
    req.session.cart = cart;
    if (req.user) {
      req.user.cart = cart;
      req.user.save();
    }
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0').send(cart);
  });
});

cartRoutes.get('/cart', (req, res) => {
  const cart = req.user ? req.user.cart : req.session.cart ? req.session.cart : new Cart({});
  req.session.cart = cart;
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0').send(cart);
});

const prepareProduct = (product, lang) => {
  return {
    _id       : product._id,
    titleUrl  : product.titleUrl,
    mainImage : product.mainImage,
    onSale    : product.onSale,
    stock     : product.stock,
    visibility: product.visibility,
    shipping  : product.shipping,
    images    : product.images,
    _user     : product._user,
    dateAdded : product.dateAdded,
    ...product[lang]
  };
};

export { cartRoutes };
