var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  crypto = require('crypto'),
  SessionService = require('../services/sessions.js'),
  User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    validateUser(req, res, "admin", getUsers);

    function getUsers(user){
        User.find().lean().select().exec(function(err, users){
            if(err){
                res.status(500).send("There was an error");
            } else {
                res.status(200).json(users);
            }
        });
    }
});

router.post('/register', function(req, res) {
    if(!(req.body.email &&
        req.body.password)){
        return res.status(412).json({
            msg: "Route requisites not met."
        });
    }

    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
    if (!emailRegex.test(req.body.email)) {
        res.status(412).json({
          msg: "Email is not valid!"
        });
    } else {
        //Check if a user with that username already exists
        User.findOne({
            email: (req.body.email.toLowerCase()).trim()
          })
          .select('_id')
          .exec(function(err, user) {
            if (user) {
                res.status(406).json({
                    msg: "Email taken!"
                });
            } else {
                //Create a random salt
                var salt = crypto.randomBytes(128).toString('base64');
                //Create a unique hash from the provided password and salt
                var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512);
                //Create a new user with the assembled information
                var newUser = new User({
                    email: (req.body.email.toLowerCase()).trim(),
                    password: hash,
                    salt: salt,
                    requireNewPassword: req.body.requireNewPassword
                }).save(function(err, newUser) {
                    if (err) {
                      console.log("Error saving user to DB!");
                      res.status(500).json({
                          msg: "Error saving user to DB!"
                      });
                    } else {
                        SessionService.generateSession(newUser._id, "user", function(token){
                            //All good, give the user their token
                            res.status(201).json({
                                token: token
                            });
                        }, function(err){
                            res.status(err.status).json(err);
                        });
                    }
                });
            }
          });
    }
});

router.post('/login', function(req, res, next) {
    if(!(req.body.email &&
        req.body.password)){
        return res.status(412).json({
            msg: "Route requisites not met."
        });
    }

    //Find a user with the username requested. Select salt and password
    User.findOne({
        email: (req.body.email.toLowerCase()).trim()
    })
    .select('password salt admin requireNewPassword')
    .exec(function(err, user) {
        if (err) {
            res.status(500).json({
                msg: "Couldn't search the database for user!"
            });
        } else if (!user) {
            res.status(401).json({
                msg: "Wrong email!"
            });
        } else {
            //Hash the requested password and salt
            var hash = crypto.pbkdf2Sync(req.body.password, user.salt, 10000, 512);

            //Compare to stored hash
            if (hash == user.password) {
                var type = user.admin ? "admin" : "user";
                SessionService.generateSession(user._id, type, function(token){
                    //All good, give the user their token
                    res.status(200).json({
                        token: token,
                        admin: user.admin,
                        requireNewPassword: user.requireNewPassword
                    });
                }, function(err){
                    res.status(err.status).json(err);
                });
            } else {
                res.status(401).json({
                    msg: "Password is incorrect!"
                });
            }
        }
    });
});

/* Update user */
router.put('/self/:token', function(req, res, next) {
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
    if (req.body.email && !emailRegex.test(req.body.email)) {
        res.status(412).json({
            msg: "Email is not valid!"
        });
    } else {
        SessionService.validateSession(req.params.token, "user", function(accountId) {
            var updatedUser = {};

            if (req.body.email && typeof req.body.email === 'string') updatedUser.email = req.body.email;
            if (typeof req.body.requireNewPassword == 'boolean') updatedUser.requireNewPassword = req.body.requireNewPassword;
            if (req.body.password && typeof req.body.password === 'string') {
                //Create a random salt
                var salt = crypto.randomBytes(128).toString('base64');
                //Create a unique hash from the provided password and salt
                var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512);
                updatedUser.password = hash;
                updatedUser.salt = salt;
            }

            var setUser = {
                $set: updatedUser
            }

            User.update({
                _id: accountId
            }, setUser)
            .exec(function(err, user) {
                if (err) {
                    res.status(500).json({
                        msg: "Could not update user"
                    });
                } else {
                    res.status(200).json(user);
                }
            });
        }, function(err){
            res.status(err.status).json(err);
        });
    }
});

function validateUser(req, res, type, success){
    var token = req.params.token || req.body.token || req.query.token;
    SessionService.validateSession(token, type, function(accountId) {
        User.findById(accountId)
        .select('name email subscription admin')
        .exec(function(err, user) {
            if (err) {
                res.status(500).json({
                    msg: "Couldn't search the database for user!"
                });
            } else if (!user) {
                res.status(401).json({
                    msg: "User not found, user table out of sync with session table!"
                });
            } else {
                success(user);
            }
        });
    }, function(err){
        res.status(err.status).json(err);
    });
}

module.exports = router;
