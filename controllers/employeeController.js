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
        // let total_employees = await Employee.find({shop_email:res.locals.user.shop_email});
        // total_employees = total_employees.length;
        let total_orders = await Order.find({shop_email:res.locals.user.shop_email});
        total_orders = total_orders.length;
        let total_products = await Product.find({shop_email:res.locals.user.shop_email});
        total_products = total_products.length;
        let all_orders = await Order.find({employee_id:res.locals.user._id});
        let emp_sales = 0;
        for(var i = 0;i < all_orders.length;i++) {
            emp_sales += all_orders[i].total_price;
        }
        res.render('employee_dashboard',{
            user:user,
            total_orders:total_orders,
            total_products:total_products,
            emp_sales:emp_sales
        });
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

const employee_dashboard_stats = async (req, res) => {
    try{
        let customers = await Order.find({employee_id:res.locals.user._id});
        let labels = []
        let datasets = []
        for(var i = 0;i < customers.length;i++){
            labels.push(customers[i].customer_name);
        }
        let data = []
        for(var i = 0;i < labels.length;i++){
           let order_per_cust = await Order.find({customer_name:labels[i]});
           let sales = 0;
           for(var j = 0;j < order_per_cust.length;j++){
                sales += order_per_cust[j].total_price;
           }
           data.push(sales);
        }
        let backgroundColor = [];
        for(var i = 0;i < labels.length;i++){
            backgroundColor.push(randomColor());
        }
        datasets.push({
            label:'Sales Per Customer in RS',
            data:data,
            backgroundColor:backgroundColor
        });
        res.json({
            labels:labels,
            datasets:datasets
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

// Function for Generating Random RGB color
function randomColor(){
    return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
}


module.exports = {employee_dashboard,employee_inventory,employee_sales,checkout_order_get,checkout_order_post,
    view_orders,view_profile,employee_dashboard_stats}