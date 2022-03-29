const mongoose = require('mongoose');
const {isEmail} = require('validator');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    shopname: {
        type: String,
        required: [true, 'Please enter shop name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a passoword'],
        minlength: [6, 'You must enter a passowrd of atleast 6 characters'],
    }
});


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// userSchema.post('save', function(doc, next) {
//     console.log('new user is created..', doc);
//     next();
// })

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const res = await bcrypt.compare(password, user.password);
        if(res){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

module.exports = mongoose.model('users', userSchema);