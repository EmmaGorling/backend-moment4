const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});


// Hash password
userSchema.pre('save', async function (next) {
    try {
        if(this.isNew || this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Register user
userSchema.statics.register = async function (email, password, firstname, lastname) {
    try {
        const user = new this({email, password, firstname, lastname});
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

// Compare hashed password
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);

    } catch (error) {
        throw error;
    }
}

// Login user
userSchema.statics.login = async function (email, password) {
    try {
        const user = await this.findOne({email});

        if(!user) {
            throw new Error('Incorrect email or password');
        }

        const isPasswordMatch = await user.comparePassword(password);

        // Incorrect?
        if(!isPasswordMatch) {
            throw new Error('Incorrect email or password');
        }

        // Correct password
        return user;

    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;