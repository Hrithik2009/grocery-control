const req = require('express/lib/request');
const Product = require('../models/Product');

const getProducts = async(req, res) => {
    const shop_email = res.locals.user.shop_email;
    let product = await Product.find({shop_email: shop_email});
    res.render('products', {
        product: product
    });
}

const addProduct = async (req, res) => {
    const shop_email = res.locals.user.shop_email;
    const product_name = req.body.product_name.toLowerCase();
    const expiry_date = req.body.expiry_date; 
    const price = parseInt(req.body.price);
    const quantity = parseInt(req.body.quantity);
    const availability = true;
    const admin_id = res.locals.user.admin_id;

    try{
        const present = await Product.findOne({shop_email: shop_email, product_name: product_name}).exec();
        if(!present){
            const product = await Product.create({shop_email, product_name, expiry_date, price, quantity,availability,admin_id});
            res.status(201).json({product});
        }
        else{
            res.status(500).json({err: 'Product is already there'});
        }
    }
    catch(err){
        console.log(err);
    }
};

const getEditproduct = async(req, res) =>{
    const {id: productId} = req.params;
    let product = await Product.findOne({_id: productId});
    res.render('edit_product', {
        product: product
    });
}

const editproduct = async(req, res) =>{
    const shop_email = res.locals.user.shop_email;
    const product_name = req.body.product_name;
    const expiry_date = req.body.expiry_date; 
    const price = parseInt(req.body.price);
    const quantity = parseInt(req.body.quantity);
    const availability = true;
    try{
        const product = await Product.findOneAndUpdate({shop_email: shop_email, product_name: product_name}, {expiry_date, price, quantity,availability}, {
            new: true,
            runValidators: true
        });
        res.status(200).json({product});
    }
    catch(err){
        console.log(err);
    }
}

const deleteProduct = async(req, res) => {
    const productId = req.body.productID;
    try{
        const delProduct = await Product.findOneAndDelete({_id: productId});
        res.status(200).json({status: 'Success'});
    }
    catch(err){
        res.status(500).json({msg: err});
    }
}

module.exports = {addProduct, getProducts, getEditproduct, editproduct, deleteProduct};