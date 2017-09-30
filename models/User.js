const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    cart: { }
});


mongoose.model('users', userSchema);