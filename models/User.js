const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    cart: {},
    order: [],
    images: [],
    admin: Boolean
});


mongoose.model('users', userSchema);