var mongoose = require('mongoose');

module.exports = function Configuration() {
    mongoose.connect('mongodb://localhost/test');
   
}