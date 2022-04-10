const Admin = require('../models/Admin');
const Owner = require('../models/Owner');
const Employee = require('../models/Employee');
const Product = require('../models/Product');
const Order = require('../models/Order');

const employee_dashboard = async (req, res) => {
    try{
        let user = {
            name: res.locals.user.name,
            email: res.locals.user.email,
            role: res.locals.user.role
        }
        res.render('employee_dashboard',{user:user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const employee_inventory = async (req, res) => {
    try{
        let user = {
            name: res.locals.user.name,
            email: res.locals.user.email,
            role: res.locals.user.role
        }
        res.render('inventory',{user:user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const employee_sales = async (req, res) => {
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

const checkout_order_get = async (req,res) => {
    try{
        const data = await Product.find({},{_id:0,admin_id:0});
        res.render('checkout_order',{products:data});
    }
    catch(err){
        console.log("Inside Error ",err);
        res.status(500).json({
            status:"failure",
            err: err
        })
    }
}

const checkout_order_post = async (req,res) => {
    try{
        const new_order = await Order.create(req.body);
        if(new_order){
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
            status:"failure",
            err: err
        })
    }
}


const view_orders = async (req,res) => {
    try{
        const data = await Order.find({},{_id:0,admin_id:0});
        res.render('view_orders',{orders:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"failure",
            err: err
        })
    }
}

const view_profile = async (req,res) => {
    try{
        const data = await Employee.findOne({_id:res.locals.user._id},{_id:0,admin_id:0});
        res.render('view_employee_profile',{employee:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"failure",
            err: err
        })
    }
}

module.exports = {employee_dashboard,employee_inventory,employee_sales,checkout_order_get,checkout_order_post,
    view_orders,view_profile}