const mongoose = require('mongoose');
const {isEmail} = require('validator');

const productSchema = new mongoose.Schema({
    admin_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    shop_email: {
        type: String,
        required: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    product_name: {
        type: String,
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
    },
    availability:{
        type: Boolean
    }
});

module.exports = mongoose.model('products', productSchema);