const { object } = require('webidl-conversions');
// const User = require('../models/User');
const Admin = require('../models/Admin');
const Owner = require('../models/Owner');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');


const errorHandler = (err) => {
    // console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    if(err.message == 'incorrect email'){
        errors.email = 'Email is not registered';
    }

    if(err.message == 'incorrect password'){
        errors.password = 'Entered password is wrong';
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    if(err.message.includes('admins validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60; // in secs
const createToken = (id,role) => {
    return jwt.sign({id,role}, 'Secret', {
        expiresIn: maxAge
    });
}

const signup_get = (req, res) => {
    res.render('shop_signup');
}

const signup_post =  async (req, res) => {
    const {name, email, password} = req.body;
    // console.log(email, password);
    try{
        const admin = await Admin.create({name, email, password});
        const token = createToken(admin._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: admin._id});
    }
    catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}

const login_get = (req, res) => {
    res.render('shop_login');
}

const login_post = async (req, res) => {
    const {email,password,role} = req.body;
    // console.log(req.body);
    try{
        let user;
        if(role === "admin") 
            user = await Admin.login(email, password);
        else if(role === "owner")
            user = await Owner.login(email, password);
        else 
            user = await Employee.login(email, password);
        const token = createToken(user._id,user.role);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id,role:user.role});
    }
    catch(err){
        console.log(err);
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/login');
}

module.exports = {signup_get, signup_post, login_get, login_post, logout_get}