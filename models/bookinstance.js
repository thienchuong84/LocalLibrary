var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var BookInstanceShema = new Schema({
  book: {
    type: Schema.ObjectId,
    ref: 'Book',
    required: true
  }, // reference to the associated book
  imprint: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance'
  },
  due_back: {
    type: Date,
    default: Date.now
  }
});

// Virtual for bookinstance's URL
BookInstanceShema
  .virtual('url')
  .get(function () {
    return '/catalog/bookinstance/' + this._id;
  });

BookInstanceShema
  .virtual('due_back_formatted')
  .get(function() {
    return moment(this.due_back).format('MMMM Do, YYYY');
  });

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceShema);