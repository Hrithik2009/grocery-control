const Admin = require('../models/Admin');
const Owner = require('../models/Owner');
const Employee = require('../models/Employee');
const Order = require('../models/Order');

const admin_dashboard = async (req, res) => {
    try{
        let user = {
            name: res.locals.user.name,
            email: res.locals.user.email,
            role: res.locals.user.role
        }
        let total_employees = await Employee.find({admin_id:res.locals.user._id});
        total_employees = total_employees.length;
        let total_shops = await Owner.find({admin_id:res.locals.user._id});
        total_shops = total_shops.length;
        let all_orders = await Order.find({admin_id:res.locals.user._id});
        let all_time_sales = 0;
        for(var i = 0;i < all_orders.length;i++) {
            all_time_sales += all_orders[i].total_price;
        }
        res.render('admin_dashboard',{
            user:user,
            total_employees:total_employees,
            total_shops:total_shops,
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

const view_shops = async (req,res) => {
    try{
        const data = await Owner.find({admin_id:res.locals.user._id});
        let total_employees = []
        for(var i = 0;i < data.length;i++) {
            let emp = await Employee.find({shop_email:data[i].shop_email});
            total_employees.push(emp.length);
        }
       // console.log(total_employees)
        res.render('view_shops',{shops:data,total_employees:total_employees});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

const admin_dashboard_stats = async (req, res) => {
    try{
        let owners = await Owner.find({admin_id:res.locals.user._id});
        let labels = []
        let datasets = []
        for(var i = 0;i < owners.length;i++){
            labels.push(owners[i].shop_email);
        }
        let data = []
        for(var i = 0;i < labels.length;i++){
           let order_per_shop = await Order.find({admin_id:res.locals.user._id,shop_email:labels[i]});
           let sales = 0;
           for(var j = 0;j < order_per_shop.length;j++){
                sales += order_per_shop[j].total_price;
           }
           data.push(sales);
        }
        let backgroundColor = [];
        for(var i = 0;i < labels.length;i++){
            backgroundColor.push(randomColor());
        }
        datasets.push({
            label:'Sales per Shop in RS',
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


module.exports = {admin_dashboard,admin_sales,add_shop_post,add_shop_get,view_shops,admin_dashboard_stats};