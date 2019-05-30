const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    cart: { type: Schema.Types.Mixed, default: {items: [], totalQty: 0, totalPrice: 0} },
    images: [],
    admin: Boolean
});

const User = mongoose.model('users', userSchema);
module.exports = User;
