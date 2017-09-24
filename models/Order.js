const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    amount: Number,
    amount_refunded: Number,
    description: String,
    customerEmail: String,
    cart: {},
    outcome: {},
    source: {},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateAdded: Date
});


mongoose.model('orders', orderSchema);
