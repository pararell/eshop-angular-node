import { Router } from 'express';

const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Order = mongoose.model('orders');
const requireLogin = require('../middlewares/requireLogin');

const productRoutes = Router();

productRoutes.get('/products/:page', (req, res) => {
  Product.paginate({}, { page: parseFloat(req.params.page), limit: 10 })
    .then(response => {
      const productsWithPagination = {
        products: response.docs,
        pagination: {
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total
        }
      };
      res.status(200).send(productsWithPagination);
  });
});

productRoutes.get('/products/:category/:page', (req, res) => {
  Product.find({ categories: req.params.category }, function(err, products) {
    res.status(200).send(products);
  });
});

productRoutes.get('/categories', (req, res) => {
  Product.find({}, function(err, products) {
    const categories = products
      .filter(product => product.categories && product.categories.length)
      .map(product => product.categories)
      .reduce((catSet, allCategories) => catSet.concat(allCategories) , [])
      .filter((cat, i, arr) => arr.indexOf(cat) === i)
      .map(category => ({title: category , titleUrl: category.split(' ').join('_').toLowerCase() }));

    res.status(200).send(categories);
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
