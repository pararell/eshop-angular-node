import { Router } from 'express';

const Product       = require('../models/Product');;
const Order         = require('../models/Order');;
const Translation   = require('../models/Translation');;
const requireAdmin  = require('../middlewares/requireAdmin');
const requireLogin  = require('../middlewares/requireLogin');
const cloudinary    = require('cloudinary');
const keys          = require('../config/keys');
const multer        = require('multer');
const storage       = multer.memoryStorage();
const upload        = multer({ storage: storage });
const { clearHash } = require('../services/cache');

cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

const adminRoutes = Router();

adminRoutes.post('/addproduct', requireLogin, requireAdmin, (req:any, res) => {
  const newProduct = Object.assign(req.body, {
    _user     : req.user.id,
    dateAdded : Date.now()
  });
  const product = new Product(newProduct);

  product.save();

  Product.find({}, function(err, products) {
    res.status(200).send(products);
  });
});

adminRoutes.post('/udpateproduct', requireAdmin, (req, res) => {
  const productTitle = req.body.titleUrl;

  clearHash({ titleUrl: productTitle, collection: 'products' });

  Product.findOneAndUpdate({ titleUrl: productTitle }, req.body, { upsert: true }, (err, doc) => {
    if (err) {
      return res.status(500).send({ error: err });
    }

    Product.find({}, function(error, products) {
      return res.status(200).send(products);
    });
  });
});

adminRoutes.get('/removeproduct/:name', requireAdmin, (req, res) => {
  const productTitle = req.params.name;
  Product.findOneAndRemove({ titleUrl: productTitle }, function(err) {
    if (!err) {
      Product.find({}, function(error, products) {
        res.status(200).send(products);
      });
    }
  });
});

adminRoutes.post('/addimage/:titleUrl', requireLogin, requireAdmin, upload.single('file'), (req: any, res) => {
  clearHash({ titleUrl: req.params.titleUrl, collection: 'products' });
  cloudinary.v2.uploader
    .upload_stream({ resource_type: 'auto', use_filename: true }, (error, result) => {
      if (req.params.titleUrl) {
        Product.findOneAndUpdate({ titleUrl: req.params.titleUrl }, { $push: { images: result.secure_url ? result.secure_url : result.url } }, (err, doc) => {
          if (err) {
            req.user.images = [...req.user.images, result.secure_url ? result.secure_url : result.url];
            req.user.save();
            return res.status(200).send(req.user.images);
          }
          return res.status(200).send(doc);
        });
      }
    })
    .end(req.file.buffer);
});

adminRoutes.post('/addimageurl', requireLogin, requireAdmin, (req:any, res) => {
  req.user.images = [...req.user.images, req.body.imageUrl];
  req.user.save();
  return res.status(200).send(req.user.images);
});

adminRoutes.post('/addimageurl/:titleUrl', requireLogin, requireAdmin, (req:any, res) => {
  clearHash({ titleUrl: req.params.titleUrl, collection: 'products' });

  Product.findOneAndUpdate({ titleUrl: req.params.titleUrl }, { $push: { images: req.body.imageUrl } }, (err, doc) => {
    if (err) {
      req.user.images = [...req.user.images, req.body.imageUrl];
      req.user.save();
      return res.status(200).send(req.user.images);
    }
    return res.status(200).send(doc);
  });
});

adminRoutes.post('/addimage', requireLogin, requireAdmin, upload.single('file'), (req:any, res) => {
  cloudinary.v2.uploader
    .upload_stream({ resource_type: 'auto', use_filename: true }, (error, result) => {
      req.user.images = [...req.user.images, result.secure_url ? result.secure_url : result.url];
      req.user.save();
      return res.status(200).send(req.user.images);
    })
    .end(req.file.buffer);
});

adminRoutes.post('/removeimage/:titleUrl', requireLogin, requireAdmin, (req:any, res) => {
  clearHash({ titleUrl: req.params.titleUrl, collection: 'products' });
  Product.findOneAndUpdate({ titleUrl: req.params.titleUrl }, { $pull: { images: req.body.image } }, (err, doc) => {
    if (err) {
      const image = req.body.image;
      const filterImages = req.user.images.filter(img => img !== image);
      req.user.images = filterImages;
      req.user.save();

      return res.status(200).send(req.user);
    }

    const updatedProduct = { ...doc, images: doc.images.filter(img => img !== req.body.image) };

    return res.status(200).send(updatedProduct);
  });
});

adminRoutes.post('/removeimage', requireLogin, requireAdmin, (req:any, res) => {
  const image = req.body.image;
  const filterImages = req.user.images.filter(img => img !== image);
  req.user.images = filterImages;
  req.user.save();

  return res.status(200).send(req.user);
});

adminRoutes.get('/orders', (req, res) => {
  Order.find({}, function(err, orders) {
    return res.status(200).send(orders);
  });
});

adminRoutes.get('/orderId/:id', (req, res) => {
  Order.findOne(
    {
      orderId: req.params.id
    },
    function(err, order) {
      res.status(200).send(order);
    }
  );
});

adminRoutes.post('/updateOrder', requireAdmin, (req, res) => {
  const orderId = req.body.orderId;

  Order.findOneAndUpdate({ orderId: orderId }, req.body, { new: true }, function(err, doc) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    return res.status(200).send(doc);
  });
});

adminRoutes.get('/translations', (req, res) => {
  Translation.find({}, function(err, translations) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    return res.status(200).send(translations);
  });
});

adminRoutes.get('/translations/:lang', (req, res) => {
  const lang = req.params.lang;

  Translation.findOne({ lang: lang }, function(err, translations) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    return res.status(200).send(translations);
  });
});

adminRoutes.post('/updateTranslation/:lang', requireAdmin, (req, res) => {
  const lang = req.params.lang;

  Translation.findOneAndUpdate({ lang: lang }, req.body, { new: true }, function(err, translation) {
    if (err) {
      return res.status(500).send({ error: err });
    }
    Translation.find({}, function(error, translations) {
      res.status(200).send(translations);
    });
  });
});

export { adminRoutes };
