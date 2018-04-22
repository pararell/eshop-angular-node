import { Router } from 'express';

const mongoose = require('mongoose');
const Product = mongoose.model('products');
const Order = mongoose.model('orders');
const requireLogin = require('../middlewares/requireLogin');

const productRoutes = Router();

productRoutes.get('/products/:page/:sort', (req, res) => {
  var query = {};
  var options = {
    page: parseFloat(req.params.page),
    limit: 10,
    sort: prepareSort(req.params.sort)
  };
  Product.paginate(query, options)
    .then(response => {
      res.status(200).send(response);
  });
});

productRoutes.get('/categoryProducts/:category/:page/:sort', (req, res) => {
  var query = {categories: new RegExp(req.params.category, 'i' )};
  var options = {
    page: parseFloat(req.params.page),
    limit: 100,
    sort: prepareSort(req.params.sort)
  };
  Product.paginate(query, options)
    .then(response => {
      res.status(200).send(response);
  });
});

productRoutes.get('/categories', (req, res) => {
  Product.find({ categories: { $gt: [] }}, 'categories', function(err, products) {
    const categories = products
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

productRoutes.get('/productId/:name', async (req, res) => {
  const product = await Product.findOne({ titleUrl: req.params.name }).cache();

  res.send(product);
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


// help functions
const prepareSort = (sortParams) => {
  switch (sortParams) {
    case 'newest':
      return  { dateAdded: 1 }
    case 'oldest':
      return  { dateAdded: -1 };
    case 'priceasc':
      return  { salePrice: 1 }
    case 'pricedesc':
    return  { salePrice: -1 }
    default:
     return { dateAdded: -1 };
  }
};


export {productRoutes};
