const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    shop_name: {
        type: String
    },
    product_name: {
        type: String,
        unique: true,
        required: [true, 'Pls enter product name']
    },
    expiry_date:{
        type: String,
        required: [true, 'Pls enter the date']
    },
    price: {
        type: Number,
        required: [true, 'Pls enter the price']
    },
    quantity: {
        type: Number,
        required: [true, 'Pls enter quantity']
    }
});

module.exports = mongoose.model('product', productSchema);