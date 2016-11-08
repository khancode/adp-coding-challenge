/**
 * Created by khancode on 11/6/2016.
 */
var express = require('express');
var router = express.Router();
const Employee = require('../../models/employee');

// GET /api/employees
router.get('/', function(req, res) {
    var employer = req.query.employer;

    var query = {};
    if (employer) {
        query.employer = employer;
    }

    Employee.find(query, function(err, employees) {
        res.send(employees);
    });
});

// GET /api/employees/:userId
router.get('/:userId', function(req, res) {
    Employee.findOne({userId: req.params.userId}, function(err, employee) {
        if (err) {
            res.status(400).json({err:err});
            return;
        }

        if (!employee) {
            res.status(400).json({err: 'employee not found'});
            return;
        }

        res.send(employee);
    });
});

// POST /api/employees
router.post('/', function(req, res) {
    var employee = new Employee({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        employer: req.body.employer
    });

    employee.save(function(err) {
        if (err) {
            res.send({err:err});
            return;
        }

        res.status(201).json(employee);
    });
});

// PUT /api/employees
router.put('/', function(req, res) {
    var userIdToQuery = req.body.oldUserId || req.body.userId;

    Employee.findOne({userId: userIdToQuery}, function(err, employee) {
        if (err) {
            res.status(400).json({err: err});
            return;
        }

        if (!employee) {
            res.status(400).json({err: 'employee not found'});
            return;
        }

        var userId = req.body.userId;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var phone = req.body.phone;
        var employer = req.body.employer;

        if (userId) employee.userId = userId;
        if (firstName) employee.firstName = firstName;
        if (lastName) employee.lastName = lastName;
        if (phone) employee.phone = phone;
        if (employer) employee.employer = employer;

        employee.save(function(err) {
            if (err) {
                res.status(400).json({err:err});
                return;
            }

            res.send(employee);
        });
    });
});

// PATCH /api/employees
router.patch('/', function(req, res) {
    var promiseList = [];
    for (var i in req.body) {
        var action = req.body[i];
        var operation = action.op;
        var userId = action.userId;

        if (operation === 'remove') {
            var promise = Employee.findOneAndRemove({userId: userId}, function(err, employee) {
                if (err) {
                    res.status(400).json({err: err});
                    return;
                }

            });

            promiseList.push(promise);
        }
    }

    Promise.all(promiseList)
        .then(function() {
            res.send();
        });

});

module.exports = router;