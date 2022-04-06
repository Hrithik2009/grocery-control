const mongoose = require('mongoose');
const {isEmail} = require('validator');

const bcrypt = require('bcrypt');

const ownerSchema = new mongoose.Schema({
    admin_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    shop_email:{
        type: String,
        required: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    shop_name:{
        type: String,
        required: [true, 'Pls enter shop name']
    },
    name:{
        type: String,
        required: [true, 'Pls enter name']
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
    },
    role:{
        type: String,
        default:'owner'
    }
});


ownerSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// userSchema.post('save', function(doc, next) {
//     console.log('new user is created..', doc);
//     next();
// })

ownerSchema.statics.login = async function(email, password){
    const owner = await this.findOne({email});
    if(owner){
        const res = await bcrypt.compare(password, owner.password);
        if(res){
            return owner;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

module.exports = mongoose.model('owners', ownerSchema);