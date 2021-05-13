'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Record = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  book_title: {
    type: String,
    required: 'Please, Add Book Title'
  },
  author_name: {
    type: String,
    required: 'Please, Add Author Name'
  }
});

module.exports = mongoose.model('Record', Record);