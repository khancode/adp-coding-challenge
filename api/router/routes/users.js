/**
 * Created by khancode on 11/6/2016.
 */
var express = require('express');
var router = express.Router();
const User = require('../../models/user');

// GET /api/users
router.get('/', function(req, res) {
    User.find(function(err, users) {
        res.send(users);
    })
});

// GET /api/users/verify
router.get('/verify', function(req, res) {
    var employer = req.query.employer;
    var password = req.query.password;

    User.findOne({employer: employer}, function(err, user) {
        if (err) {
            res.status(400).json({err:err});
            return;
        }

        var notMatchedErrorMessage = 'incorrect employer and/or password';

        if (!user) {
            res.status(401).json({err: notMatchedErrorMessage});
            return;
        }

        var isAuthenticated = user.isValidPassword(password);

        if (!isAuthenticated) {
            res.status(401).json({err: notMatchedErrorMessage});
        }
        else {
            res.send({isAuthenticated: isAuthenticated});
        }
    });
});

// GET /api/users/:employer
router.get('/:employer', function(req, res) {
    User.findOne({employer: req.params.employer}, function(err, user) {
        res.send(user);
    });
});

// POST /api/users
router.post('/', function(req, res) {
    var employer = req.body.employer;
    var password = req.body.password;

    var user = new User({
        employer: employer
    });

    user.setPassword(password);

    user.save(function(err) {
        if (err) {
            res.send({err:err});
            return;
        }

        res.status(201).json(user);
    });
});

module.exports = router;