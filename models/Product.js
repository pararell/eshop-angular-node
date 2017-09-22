const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: String,
    titleUrl:String,
    description: String,
    descriptionFull: [],
    mainImage: {
        url: { type: String, trim: true},
        name: { type: String, trim: true}
    },
    images: [],
    tags: [],
    shipping: [],
    totalSales: [],
    onSale: Boolean,
    status: String,
    type: String,
    category: String,
    stock: String,
    regularPrice: Number,
    salePrice: Number,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateAdded: Date,
});


mongoose.model('products', productSchema);