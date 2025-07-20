const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    socketId: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}

userSchema.methods.comparePassword = async function (pswd) {
    return await bcrypt.compare(pswd,this.password)
}

userSchema.statics.hashPassword = async function (pswd){
    return await bcrypt.hash(pswd,10);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
