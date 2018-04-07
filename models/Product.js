const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');


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
    shipping: [],
    onSale: Boolean,
    status: String,
    categories: [],
    tags: [],
    stock: String,
    visibility: String,
    regularPrice: Number,
    salePrice: Number,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateAdded: Date,
});

productSchema.plugin(mongoosePaginate);

mongoose.model('products', productSchema);
