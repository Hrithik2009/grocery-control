const Product = require('../models/Product');


const addProduct = async (req, res) => {
    const {product_name} = req.body;
    const expiry_date = req.body.expiry_date; 
    const price = parseInt(req.body.price);
    const quantity = parseInt(req.body.quantity);

    try{
        //const currentUser = user._id;
        // console.log(product_name, expiry_date, price, quantity);
        const product = await Product.create({product_name, expiry_date, price, quantity});
        res.status(200).json({product});
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {addProduct};