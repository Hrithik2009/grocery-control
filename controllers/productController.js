const Product = require('../models/Product');

const getProducts = async(req, res) => {
    const shop_email = res.locals.user.email;
    let product = await Product.find({shop_email: shop_email});
    // res.status(200).json({product});
    res.render('products', {
        product: product
    });
}

const addProduct = async (req, res) => {
    const shop_email = res.locals.user.email;
    const product_name = req.body.product_name;
    const expiry_date = req.body.expiry_date; 
    const price = parseInt(req.body.price);
    const quantity = parseInt(req.body.quantity);

    try{
        const product = await Product.create({shop_email, product_name, expiry_date, price, quantity});
        res.status(200).json({product});
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {addProduct, getProducts};