import { Router } from 'express';
import * as passport from 'passport';

const mongoose = require('mongoose');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Order = mongoose.model('orders');
const Cart = require('../models/Cart');
const Mailer = require('../services/mailer');

const billingRoutes = Router();

billingRoutes.post('/order/add' , (req, res, next) => {

  const orderId = 'order' + new Date().getTime() + 't' +  Math.floor(Math.random() * 1000 + 1);

  const newOrder = {
    orderId,
    amount: req.body.amount * 100,
    _user: req.user.id,
    dateAdded: Date.now(),
    cart: req.session.cart,
    status: 'NEW',
    description: 'PAY_ON_DELIVERY',
    customerEmail: req.body.email,
    outcome: {
      seller_message: 'Payment on delivery'
    },
    source: {
      address_city: req.body.city,
      address_country: req.body.country,
      address_line1: req.body.adress,
      address_zip: req.body.zip,
      name: req.body.name,
      object: 'deliver'
    }
  };

  const mailer = new Mailer(
    req.session.cart,
    req.body.email,
    orderId
  );
  mailer.send();

  const cart = new Cart({});
  req.session.cart = cart;
  if (req.user) {
    req.user.cart = cart;
    req.user.save();
  }

  const order = new Order(newOrder);
  order.save();

  res.send({ order, cart });

});


billingRoutes.post('/stripe', (req, res, next) => {
    const charge = stripe.charges
      .create({
        amount: req.body.amount * 100,
        currency: 'eur',
        description: 'Credit Card Payment',
        source: req.body.token.id
      }).then(
        result => {
          const orderId = 'order' + new Date().getTime() + 't' +  Math.floor(Math.random() * 1000 + 1);
          const newOrder = Object.assign(result, {
            orderId,
            customerEmail: req.body.token.email,
            status: 'NEW',
            cart: req.session.cart,
            _user: req.user.id,
            dateAdded: Date.now()
          });
          const order = new Order(newOrder);
          order.save();

          const mailer = new Mailer(
            req.session.cart,
            req.body.token.email,
            orderId
          );
          mailer.send();

          const cart = new Cart({});
          req.session.cart = cart;
          if (req.user) {
            req.user.cart = cart;
            req.user.save();
          }

          res.send({ order, cart });
        },
        err => {
          switch (err.type) {
            case 'StripeCardError':
              // A declined card error
              res.send(err);
              break;
            case 'RateLimitError':
              // Too many requests made to the API too quickly
              res.send(err);
              break;
            case 'StripeInvalidRequestError':
              // Invalid parameters were supplied to Stripe's API
              res.send(err);
              break;
            case 'StripeAPIError':
              // An error occurred internally with Stripe's API
              res.send(err);
              break;
            case 'StripeConnectionError':
              // Some kind of error occurred during the HTTPS communication
              res.send(err);
              break;
            case 'StripeAuthenticationError':
              // You probably used an incorrect API key
              res.send(err);
              break;
            default:
              // Handle any other types of unexpected errors
              res.send(err);
              break;
          }
        }
      );


});

export {billingRoutes};
