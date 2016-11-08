/**
 * Created by khancode on 11/6/2016.
 */
module.exports = function (app) {
    app.use('/api/users', require('./routes/users'));
    app.use('/api/employees', require('./routes/employees'));
};