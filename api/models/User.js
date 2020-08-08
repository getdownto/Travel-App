const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        require: true
    },

    trips: [{ type: ObjectId, ref: "Order" }],

    isAdmin: {
        type: Boolean,
        default: false
    },

});

userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

const User = mongoose.model ('User', userSchema);
User.seedAdminUser = () => {
    User.find({}).then(users => {
        if(users.length > 0) {return}
        return User.create({username: 'admin', password: 'admin', isAdmin: true})
    })
}

module.exports = User
