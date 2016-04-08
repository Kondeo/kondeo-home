var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(404).send('Route Not Enabled');
});

router.post('/register', function(req, res) {
    if(!(req.body.cardToken &&
        req.body.email &&
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
                StripeService.charge(req.body.cardToken, CONST.SUBSCRIPTION_PRICE.NEW, function(charge){
                    //Create a random salt
                    var salt = crypto.randomBytes(128).toString('base64');
                    //Create a unique hash from the provided password and salt
                    var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512);
                    //Create a new user with the assembled information
                    var subscriptionDate = moment().add(1, 'y');
                    var newUser = new User({
                        email: (req.body.email.toLowerCase()).trim(),
                        password: hash,
                        salt: salt,
                        subscription: subscriptionDate.toDate()
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
                                    token: token,
                                    subscription: subscriptionDate.toDate()
                                });
                            }, function(err){
                                res.status(err.status).json(err);
                            });
                        }
                    });
                }, function(err){
                    res.status(402).json({
                        msg: "Card was declined!"
                    });
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
    .select('password salt subscription admin')
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
                //Check if subscription has expired
                if(moment(user.subscription).isAfter(moment()) || user.admin){
                    SessionService.generateSession(user._id, "user", function(token){
                        //All good, give the user their token
                        res.status(200).json({
                            token: token,
                            subscription: user.subscription,
                            admin: user.admin
                        });
                    }, function(err){
                        res.status(err.status).json(err);
                    });
                } else {
                    res.status(402).json({
                        msg: "Subscription expired!",
                        subscription: user.subscription
                    });
                }
            } else {
                res.status(401).json({
                    msg: "Password is incorrect!"
                });
            }
        }
    });
});

module.exports = router;
