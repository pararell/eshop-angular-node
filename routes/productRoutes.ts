import { Router } from 'express';

const Product = require('../models/Product');
const Order = require('../models/Order');
const requireLogin = require('../middlewares/requireLogin');

const productRoutes = Router();

productRoutes.get('/products/:lang/:page/:sort', (req, res) => {
  var query = {};
  var lang = req.params.lang;
  var options = {
    page: parseFloat(req.params.page),
    limit: 10,
    sort: prepareSort(req.params.sort, lang)
  };
  Product.paginate(query, options)
    .then(response => {
      const updatedResponse = {
        ...response,
        docs: response.docs.map(product => prepareProduct(product, lang))
      };
      res.status(200).send(updatedResponse);
  });
});

productRoutes.get('/categoryProducts/:lang/:category/:page/:sort', (req, res) => {
  const categoriesLang = `${req.params.lang}.categories`;
  var query = {[categoriesLang] : new RegExp(req.params.category, 'i' )};
  var lang = req.params.lang;
  var options = {
    page: parseFloat(req.params.page),
    limit: 100,
    sort: prepareSort(req.params.sort, lang)
  };
  Product.paginate(query, options)
    .then(response => {
      const updatedResponse = {
        ...response,
        docs:  response.docs.map(product => prepareProduct(product, lang))
      };
      res.status(200).send(updatedResponse);
  });
});

productRoutes.get('/productId/:name/:lang*?', async (req, res) => {
  const lang = req.params.lang;
  Product.findOne({ titleUrl: req.params.name })
    .then(productFind => {
      const updatedProduct = req.params.lang
        ? prepareProduct(productFind, lang)
        : productFind;

        res.send(updatedProduct);
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


productRoutes.get('/categories/:lang', (req, res) => {
  const categoriesLang = `${req.params.lang}.categories`;
  const lang = req.params.lang;
  Product.find({[categoriesLang]: { $gt: [] }}, function(err, products) {
    const categories = products
      .reduce((catSet, product) => catSet.concat(product[lang].categories) , [])
      .filter((cat, i, arr) => arr.indexOf(cat) === i)
      .map(category => ({title: category , titleUrl: category.replace(/ /g, '_').toLowerCase() }));

    res.status(200).send(categories);
  });
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
const prepareSort = (sortParams, lang) => {
  switch (sortParams) {
    case 'newest':
      return `${lang}.dateAdded`
    case 'oldest':
      return `-${lang}.dateAdded`;
    case 'priceasc':
      return `${lang}.salePrice`
    case 'pricedesc':
    return  `-${lang}.salePrice`
    default:
     return `-${lang}.dateAdded`;
  }
};

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
  }
}


export {productRoutes};
