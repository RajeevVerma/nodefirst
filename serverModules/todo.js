var mongoose = require('mongoose');
// define model =================
module.exports = mongoose.model('restaurants', {
    address: {
        building: String,

    },
    name: String
});

