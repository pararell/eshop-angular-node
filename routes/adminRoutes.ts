import { Router } from 'express';

const mongoose = require('mongoose');

const Product = mongoose.model('products');
const Order = mongoose.model('orders');
const requireAdmin = require('../middlewares/requireAdmin');
const requireLogin = require('../middlewares/requireLogin');
const cloudinary = require('cloudinary');
const keys = require('../config/keys');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { clearHash } = require('../services/cache');


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

adminRoutes.post('/udpateproduct', requireAdmin, (req, res) => {
  const productTitle = req.body.titleUrl;

  if (req.body.tags) {
    req.body.tags = req.body.tags.split(',');
  }

  if (req.body.categories) {
    req.body.categories = req.body.categories.split(',');
  }

  if (req.body.mainImage) {
    req.body.mainImage = { url: req.body.mainImage, name: req.body.titleUrl };
  }

  clearHash({titleUrl: productTitle, collection: 'products'});

  Product.findOneAndUpdate({ titleUrl: productTitle }, req.body, { upsert: true },
    (err, doc) => {
      if (err) {
        return res.send(500, { error: err });
      }

      Product.find({}, function(error, products) {
        return res.status(200).send(products);
      });
    }
  );
});

adminRoutes.get('/removeproduct/:name', requireAdmin, (req, res) => {
    const productTitle = req.params.name;
    Product.findOneAndRemove({  titleUrl: productTitle },
      function(err) {
        if (!err) {
          Product.find({}, function(error, products) {
            res.status(200).send(products);
          });
        }
      }
    );
});


adminRoutes.post('/addimage/:titleUrl', requireLogin, requireAdmin, upload.single('file'), (req, res) => {
  clearHash({titleUrl: req.params.titleUrl, collection: 'products'});
  cloudinary.v2.uploader.upload_stream({resource_type: 'auto', use_filename: true},
    (error, result) => {
      if (req.params.titleUrl) {
        Product.findOneAndUpdate({ titleUrl: req.params.titleUrl },
          { '$push': { 'images': result.secure_url ? result.secure_url : result.url } },
          (err, doc) => {
            if (err) {
              req.user.images = [...req.user.images, result.secure_url ? result.secure_url : result.url ];
              req.user.save();
             return res.status(200).send(req.user.images);
            }
            return res.status(200).send(doc);
          }
        )
      }
    })
    .end(req.file.buffer);
  }
);

adminRoutes.post('/addimageurl', requireLogin, requireAdmin, (req, res) => {
  req.user.images = [...req.user.images, req.body.imageUrl ];
  req.user.save();
  return res.status(200).send(req.user.images);
  }
);

adminRoutes.post('/addimageurl/:titleUrl', requireLogin, requireAdmin, (req, res) => {
  clearHash({titleUrl: req.params.titleUrl, collection: 'products'});

    Product.findOneAndUpdate({ titleUrl: req.params.titleUrl },
      { '$push': { 'images': req.body.imageUrl } },
          (err, doc) => {
            if (err) {
              req.user.images = [...req.user.images, req.body.imageUrl ];
              req.user.save();
             return res.status(200).send(req.user.images);
            }
            return res.status(200).send(doc);
          }
        )
    }
);

adminRoutes.post('/addimage', requireLogin, requireAdmin, upload.single('file'), (req, res) => {
  cloudinary.v2.uploader.upload_stream({resource_type: 'auto', use_filename: true},
    (error, result) => {
        req.user.images = [...req.user.images, result.secure_url ? result.secure_url : result.url ];
        req.user.save();
        return res.status(200).send(req.user.images);
    })
    .end(req.file.buffer);
  }
);


adminRoutes.post('/removeimage/:titleUrl', requireLogin, requireAdmin, (req, res) => {
  clearHash({titleUrl: req.params.titleUrl, collection: 'products'});
  Product.findOneAndUpdate({ titleUrl: req.params.titleUrl }, { '$pull': { 'images': req.body.image }},
    (err, doc) => {
      if (err) {
        const image = req.body.image;
        const filterImages = req.user.images.filter(img => img !== image);
        req.user.images = filterImages;
        req.user.save();

        return res.status(200).send(req.user);
      }

      const updatedProduct = {...doc, images: doc.images.filter(img => img !== req.body.image)};

      return res.status(200).send(updatedProduct);
    }
  );

});


adminRoutes.post('/removeimage', requireLogin, requireAdmin, (req, res) => {
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

  Order.findOneAndUpdate({ orderId: orderId },
    req.body,
    { new: true },
    function(err, doc) {
      if (err) {
        return res.send(500, { error: err });
      }
      return res.status(200).send(doc);
    }
  );
});

export {adminRoutes};
