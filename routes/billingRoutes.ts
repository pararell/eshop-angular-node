import { Router } from 'express';

const keys      = require('../config/keys');
const stripe    = require('stripe')(keys.stripeSecretKey);
const Order     = require('../models/Order');
const Cart      = require('../models/Cart');
const Mailer    = require('../services/mailer');

const billingRoutes = Router();

billingRoutes.post('/order/add', (req:any, res, next) => {
  const orderId = 'order' + new Date().getTime() + 't' + Math.floor(Math.random() * 1000 + 1);
  const date = Date.now();

  const newOrder = {
    orderId,
    amount: req.body.amount * 100,
    _user: req.user ? req.user.id : '123456789012',
    dateAdded: date,
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

  const adress = {
    city: req.body.city,
    country: req.body.country,
    adress: req.body.adress,
    zip: req.body.zip
  };

  const emailType = {
    subject: 'Order',
    cart: req.session.cart,
    currency: req.body.currency,
    orderId: orderId,
    adress,
    notes: req.body.notes,
    date: new Date()
  };

  const mailer = new Mailer(req.body.email, emailType);

  mailer.send();

  keys.adminEmails
    .split(',')
    .filter(Boolean)
    .forEach(email => {
      var mailerToAdmin = new Mailer(email, emailType);
      mailerToAdmin.send();
    });

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

billingRoutes.post('/stripe', (req:any, res, next) => {
  const charge = stripe.charges
    .create({
      amount: req.body.amount * 100,
      currency: 'eur',
      description: 'Credit Card Payment',
      source: req.body.token.id
    })
    .then(
      result => {
        const orderId = 'order' + new Date().getTime() + 't' + Math.floor(Math.random() * 1000 + 1);
        const newOrder = Object.assign(result, {
          orderId,
          customerEmail: req.body.token.email,
          status: 'NEW',
          cart: req.session.cart,
          _user: req.user ? req.user.id : '123456789012',
          dateAdded: Date.now()
        });
        const order = new Order(newOrder);
        order.save();

        const adress = {
          city: req.body.token.card.address_city,
          country: req.body.token.card.address_country,
          adress: req.body.token.card.address_line1,
          zip: req.body.token.card.address_zip
        };

        const emailType = {
          subject: 'Order',
          cart: req.session.cart,
          currency: req.body.currency,
          orderId: orderId,
          adress,
          notes: req.body.notes,
          date: new Date()
        };

        const mailer = new Mailer(req.body.token.email, emailType);
        mailer.send();

        keys.adminEmails
          .split(',')
          .filter(Boolean)
          .forEach(email => {
            var mailerToAdmin = new Mailer(email, emailType);
            mailerToAdmin.send();
          });

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

billingRoutes.post('/contact', (req:any, res, next) => {
  const emailType = {
    subject: 'Contact',
    cart: req.session.cart,
    contact: req.body
  };

  const mailer = new Mailer(req.body.email, emailType);
  mailer.send();

  keys.adminEmails
    .split(',')
    .filter(Boolean)
    .forEach(email => {
      var mailerToAdmin = new Mailer(email, { ...emailType, subject: 'Contact-From-Customer' });
      mailerToAdmin.send();
    });
});

export { billingRoutes };
