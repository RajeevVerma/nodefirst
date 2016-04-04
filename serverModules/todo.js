var mongoose = require('mongoose');
// define model =================
module.exports = mongoose.model('Todo', {
    address: {
        building: String,

    },
    name: String
});

