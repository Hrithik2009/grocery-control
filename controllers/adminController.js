const Admin = require('../models/Admin');
const Owner = require('../models/Owner');


const admin_dashboard = async (req, res) => {
    try{
        let user = {
            name: res.locals.user.name,
            email: res.locals.user.email,
            role: res.locals.user.role
        }
        res.render('admin_dashboard',{user:user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const add_shop_get = async (req, res) => {
    try{
        res.render('add_shop');
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const add_shop_post = async (req, res) => {
    try{
        const data = await Owner.create(req.body);
        if(data){
            res.json({
                status:"success",
            });
        }
        else{
            res.json({
                status:"failure",
            });
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const admin_sales = async (req, res) => {
    try{
        let user = {
            name: res.locals.user.name,
            email: res.locals.user.email,
            role: res.locals.user.role
        }
        res.render('sales',{user:user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}


module.exports = {admin_dashboard,admin_sales,add_shop_post,add_shop_get}