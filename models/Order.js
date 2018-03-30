const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderId : String,
    amount: Number,
    amount_refunded: Number,
    description: String,
    customerEmail: String,
    status: String,
    cart: {},
    outcome: {},
    source: {},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateAdded: { type: Date, default: Date.now }
});


mongoose.model('orders', orderSchema);
