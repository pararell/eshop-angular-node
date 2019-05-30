const mongoose = require('mongoose');
const { Schema } = mongoose;
const paginate = require('../services/paginate');


const productSchema = new Schema({
    titleUrl:String,
    mainImage: {
      url: { type: String, trim: true},
      name: { type: String, trim: true}
    },
    onSale: Boolean,
    stock: String,
    visibility: String,
    shipping: String,
    images: [],
    _user: {type: Schema.Types.ObjectId, ref: 'user'},
    dateAdded: Date,

    title: String,
    description: String,
    descriptionFull: [],
    categories: [],
    tags: [],
    regularPrice: Number,
    salePrice: Number,

    sk : {
      title: String,
      description: String,
      descriptionFull: [],
      categories: [],
      tags: [],
      regularPrice: Number,
      salePrice: Number
    },
    cs: {
      title: String,
      description: String,
      descriptionFull: [],
      categories: [],
      tags: [],
      regularPrice: Number,
      salePrice: Number
      },
    en : {
      title: String,
      description: String,
      descriptionFull: [],
      categories: [],
      tags: [],
      regularPrice: Number,
      salePrice: Number
    },
});

productSchema.plugin(paginate);

const Product = mongoose.model('products', productSchema);
module.exports = Product;
