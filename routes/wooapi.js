const express = require('express');
const WooCommerceAPI = require('woocommerce-api');
const mongoose = require('mongoose');
const router = express.Router();
const Product = mongoose.model('products');


const WooCommerce = new WooCommerceAPI({
  url: 'http://localhost:8081/apiE',
  consumerKey: 'ck_87d2b9e4c2762d3ce8874b62b061b2a09d5d2d37',
  consumerSecret: 'cs_91d96a41e69b23cc1238de8c10917e439f5a215b',
  wpAPI: true,
  version: 'wc/v2'
});
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('wordpress api works');
});

// Get all posts
router.get('/products', (req, res) => {
WooCommerce.get('products', function(err, data, result) {

  const product = new Product({
    any: JSON.parse(result),
    _user: req.user.id,
    dateAdd: Date.now()
  });


  console.log(data,result, product, 'data result product')

  product.save();

  // res.status(200).send(JSON.parse(result));
  res.send(req.user);

});


// WooCommerce.getAsync('products').then(function(result) {
//   return JSON.parse(result.toJSON().body);
// });


});


module.exports = router;