const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    productId : {
        type : String,
    },
    quantity : {
        type : Number,
    },
    userId : {
        type : String,
    }
},
{
    timestamps : true,
});

const cartProductModel = mongoose.model('cartProducts', cartProductSchema);

module.exports = cartProductModel;