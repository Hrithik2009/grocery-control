const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Owner = require('../models/Owner');

const owner_dashboard = async (req, res) => {
    try{
        let user = {
            name: res.locals.user.name,
            email: res.locals.user.email,
            role: res.locals.user.role
        }
        res.render('owner_dashboard',{user:user});
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


module.exports = {owner_dashboard,owner_inventory,owner_sales,add_employee_get,add_employee_post,view_employees,view_owner_profile}