/**
 * Created by khanc on 11/5/2016.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    userId: {type: String, index: {unique: true}},
    firstName: String,
    lastName: String,
    phone: String,
    employer: String
});

module.exports = mongoose.model('Employee', employeeSchema);