const mongoose = require('mongoose');
const {isEmail} = require('validator');

const orderSchema = new mongoose.Schema({
    admin_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    shop_email: {
        type: String,
        required: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    employee_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    customer_name:{
        type: String,
        required: [true, 'Pls enter customer name']
    },
    customer_contact:{
        type: String,
        required: [true, 'Pls enter customer contact']
    },
    products: {
        type: Array
    },
    total_price: {
        type: Number,
        required: [true, 'Pls enter the price']
    },
    total_items:{
        type: Number
    }
});

module.exports = mongoose.model('orders', orderSchema);