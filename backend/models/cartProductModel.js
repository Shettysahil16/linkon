const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    productId : {
        ref : 'products',
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