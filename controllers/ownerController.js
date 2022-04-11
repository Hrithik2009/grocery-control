const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Owner = require('../models/Owner');
const Order = require('../models/Order');
const Product = require('../models/Product');
const owner_dashboard = async (req, res) => {
    try{
        let user = {
            name: res.locals.user.name,
            email: res.locals.user.email,
            role: res.locals.user.role
        }
        let total_employees = await Employee.find({shop_email:res.locals.user.shop_email});
        total_employees = total_employees.length;
        // let total_orders = await Order.find({shop_email:res.locals.user.shop_email});
        // total_orders = total_orders.length;
        let total_products = await Product.find({shop_email:res.locals.user.shop_email});
        total_products = total_products.length;
        let all_orders = await Order.find({shop_email:res.locals.user.shop_email});
        let all_time_sales = 0;
        for(var i = 0;i < all_orders.length;i++) {
            all_time_sales += all_orders[i].total_price;
        }
        res.render('owner_dashboard',{
            user:user,
            total_employees:total_employees,
            total_products:total_products,
            all_time_sales:all_time_sales
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const owner_inventory = async (req, res) => {
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

const owner_sales = async (req, res) => {
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

const add_employee_get = async (req, res) => {
    try{
        res.render('add_employee');
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const add_employee_post = async (req, res) => {
    try{
        const data = await Employee.create(req.body);
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

const view_employees = async (req,res) => {
    try{
        const data = await Employee.find({},{_id:0,admin_id:0});
        res.render('view_employees',{employee:data});
    }
    catch(err){
        console.log("Inside Error ",err);
        res.status(500).json({
            status:"failure",
            err: err
        })
    }
}

const view_owner_profile = async (req,res) => {
    try{
        const data = await Owner.findOne({_id:res.locals.user._id},{_id:0});
        res.render('view_owner_profile',{owner:data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"failure",
            err: err
        })
    }
}

const owner_dashboard_stats = async (req, res) => {
    try{
        let employees = await Employee.find({shop_email:res.locals.user.shop_email});
        let labels = []
        let e_id = []
        let datasets = []
        for(var i = 0;i < employees.length;i++){
            labels.push(employees[i].name);
            e_id.push(employees[i]._id);
        }
        let data = []
        for(var i = 0;i < labels.length;i++){
           let order_per_emp = await Order.find({employee_id:e_id[i]});
           let sales = 0;
           for(var j = 0;j < order_per_emp.length;j++){
                sales += order_per_emp[j].total_price;
           }
           data.push(sales);
        }
        let backgroundColor = [];
        for(var i = 0;i < labels.length;i++){
            backgroundColor.push(randomColor());
        }
        datasets.push({
            label:'Sales Per Employee in RS',
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



module.exports = {owner_dashboard,owner_inventory,owner_sales,add_employee_get,add_employee_post,view_employees,view_owner_profile,
    owner_dashboard_stats}