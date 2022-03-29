const { object } = require('webidl-conversions');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const errorHandler = (err) => {
    // console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    if(err.message == 'incorrect email'){
        errors.email = 'Email is not registered';
    }

    if(err.message == 'incorrect password'){
        errors.email = 'Entered password is wrong';
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
      }

    if(err.message.includes('users validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60; // in secs
const createToken = (id) => {
    return jwt.sign({id}, 'Secret', {
        expiresIn: maxAge
    });
}

const signup_get = (req, res) => {
    res.render('shop_signup');
}

const signup_post =  async (req, res) => {
    const {shopname, email, password} = req.body;
    // console.log(email, password);
    try{
        const user = await User.create({shopname, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
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
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    }
    catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/login');
}

module.exports = {signup_get, signup_post, login_get, login_post, logout_get}