import { Router } from 'express';

const mongoose = require('mongoose');

const Product = mongoose.model('products');
const requireAdmin = require('../middlewares/requireAdmin');
const requireLogin = require('../middlewares/requireLogin');
const cloudinary = require('cloudinary');
const keys = require('../config/keys');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
// const Datauri = require('datauri');

cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

const adminRoutes = Router();

adminRoutes.post('/addproduct', requireLogin, requireAdmin, (req, res) => {
    const newProduct = Object.assign(req.body, {
      tags: req.body.tags ? req.body.tags.split(',') : [],
      categories: req.body.categories ? req.body.categories.split(',') : [],
      mainImage: { url: req.body.mainImage, name: req.body.titleUrl },
      _user: req.user.id,
      dateAdd: Date.now()
    });

    const product = new Product(newProduct);

    product.save();

    Product.find({}, function(err, products) {
      res.status(200).send(products);
    });
});

adminRoutes.get('/removeproduct/:name', requireAdmin, (req, res) => {
    const productTitle = req.params.name;
    Product.findOneAndRemove({  titleUrl: productTitle },
      function(err) {
        if (!err) {
          Product.find({}, function(err, products) {
            res.status(200).send(products);
          });
        }
      }
    );
});

adminRoutes.post('/udpateproduct', requireAdmin, (req, res) => {
    const productTitle = req.body.titleUrl;

    Product.findOneAndUpdate({ titleUrl: productTitle },
      req.body,
      { upsert: true },
      function(err, doc) {
        if (err) return res.send(500, { error: err });
        Product.find({}, function(err, products) {
          return res.status(200).send(products);
        });
      }
    );
});

adminRoutes.post( '/addimage', requireLogin, requireAdmin, upload.single('file'), (req, res) => {
    // const datauri = new Datauri();
    // datauri.format('.png', req.file.buffer);

    cloudinary.uploader.upload(req.file.buffer, function(result) {
      req.user.images = [...req.user.images, result.url];
      req.user.save();

      res.status(200).send(req.user.images);
    });
  }
);


adminRoutes.post('/removeimage', requireLogin, requireAdmin, (req, res) => {
    const image = req.body.image;
    const filterImages = req.user.images.filter(img => img != image);
    req.user.images = filterImages;
    req.user.save();
    res.status(200).send(req.user);
  });

export {adminRoutes};

