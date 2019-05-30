const mongoose = require('mongoose');
const { Schema } = mongoose;

const translationSchema = new Schema({
  lang: String,
  keys : {type: Schema.Types.Mixed, default: { } }
});

const Translation = mongoose.model('translations', translationSchema);
module.exports = Translation;
