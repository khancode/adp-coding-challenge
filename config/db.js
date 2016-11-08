/**
 * Created by khancode on 11/6/2016.
 */

var mongoose = require('mongoose');

var username = 'mainUser';
var password = 'userMain';
var dbHostUrl = 'ds145677.mlab.com:45677';
var dbName = 'employee_records';

var url = 'mongodb://' + username + ':' + password + '@' + dbHostUrl + '/' + dbName;

mongoose.connect(url);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to mongodb");
});

module.exports = db;