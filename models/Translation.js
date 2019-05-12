const mongoose = require('mongoose');
const { Schema } = mongoose;

const translationSchema = new Schema({
  lang: String,
  keys : {type: Schema.Types.Mixed, default: { } }
});


mongoose.model('translations', translationSchema);
