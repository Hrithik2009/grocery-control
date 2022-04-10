const Admin = require('../models/Admin');
const Owner = require('../models/Owner');
const Employee = require('../models/Employee');

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


module.exports = {admin_dashboard,admin_sales,add_shop_post,add_shop_get,view_shops};