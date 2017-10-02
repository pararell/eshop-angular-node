const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = mongoose.model('products');
const requireAdmin = require('../middlewares/requireAdmin');
const requireLogin = require('../middlewares/requireLogin');
const cloudinary = require('cloudinary');
const keys = require('../config/keys');
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Datauri = require('datauri');

cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});


module.exports = (app) => {

  app.post('/admin/removeimage',  requireLogin, requireAdmin, (req,res) => {
    const image = req.body.image;
    const filterImages = req.user.images.filter(img => img != image);
    req.user.images = filterImages;
    res.status(200).send(req.user);
  });

  app.post('/admin/addimage', requireLogin, requireAdmin, upload.single('file'), (req, res) => {

    const datauri = new Datauri();
    datauri.format('.png', req.file.buffer);

    cloudinary.uploader.upload(datauri.content, function(result) {
      req.user.images = [...req.user.images,result.url];
      req.user.save();

      res.status(200).send(req.user.images);
    });

  });

  app.post('/admin/addproduct', requireLogin, requireAdmin, (req, res) => {
    const product = new Product({
      ...req.body,
      _user: req.user.id,
      dateAdd: Date.now()
    });

    product.save();

    Product.find({}, function (err, products) {
      res.status(200).send(products);
    });

  });

  app.get('/admin/removeproduct/:name', requireAdmin, (req, res) => {
    const productTitle = req.params.name;
    Product.findOneAndRemove({
      titleUrl: productTitle
    }, function (err) {
      if (!err) {
        res.status(200).send(productTitle + ' remove');
      }
    });

  });


  app.post('/admin/udpateproduct/:name', requireAdmin, (req, res) => {
    const productTitle = req.params.name;
    Product.findOne({titleUrl: productTitle}, function (err, product) {

        const newProduct = {...product, ...req.body};
    
        newProduct.save(function (err) {
            if(err) {
                return err;
            }

            res.status(200).send(newProduct);
        });
    });

  });


};

