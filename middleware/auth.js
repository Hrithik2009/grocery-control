const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Owner = require('../models/Owner');
// const User = require('../models/User');
const auths = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        
        jwt.verify(token, 'Secret', (err, decodedToken) => {
            if(err) {
                res.redirect('/login');
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

const checkEmployee = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'Secret', async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.redirect('/login');
            }
            else{
                const role = decodedToken.role;
                if(role === 'employee'){
                    const user = await Employee.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
                else{
                    res.locals.user = null;
                    res.redirect('/login');
                }
            }
        })
    }
    else{
        res.locals.user = null;
        res.redirect('/login');
    }
};

const checkOwner = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'Secret', async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.redirect('/login');
            }
            else{
                const role = decodedToken.role;
                if(role === 'owner'){
                    const user = await Owner.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
                else{
                    res.locals.user = null;
                    res.redirect('/login');
                }
            }
        })
    }
    else{
        res.locals.user = null;
        res.redirect('/login');
    }
};

const checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'Secret', async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                res.redirect('/login');
            }
            else{
                const role = decodedToken.role;
                if(role === 'admin'){
                    const user = await Admin.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
                else{
                    res.locals.user = null;
                    res.redirect('/login');
                }
            }
        })
    }
    else{
        res.locals.user = null;
        res.redirect('/login');
    }
};


module.exports = {auths,checkOwner,checkAdmin,checkEmployee};