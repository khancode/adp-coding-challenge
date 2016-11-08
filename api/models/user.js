/**
 * Created by khancode on 11/6/2016.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    employer: {type: String, index: {unique: true}},
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.isValidPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);