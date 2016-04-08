var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var Invoice = mongoose.model('Invoice');
var User = mongoose.model('User');
var SessionService = require('../services/sessions.js');

/* GET invoice. */
router.get('/:id', function(req, res, next) {
    if(!(req.query.token)){
        return res.status(412).json({
            msg: "Route requisites not met."
        });
    }

    validateUser(req, res, displayInvoice);

    function displayInvoice(user){
        Invoice.findOne({
            _id: parseInt(req.params.id),
            accountId: user._id
        }).lean().select().exec(function(err, invoice){
            if(err){
                res.status(500).send("There was an error");
            } if(!invoice){
                res.status(404).send("Invoice Not Found!");
            } else {
                res.status(200).json(invoice);
            }
        });
    }
});

/* GET invoices for self. */
router.get('/self/:token', function(req, res, next) {
    validateUser(req, res, displayInvoice);

    function displayInvoice(user){
        Invoice.find({
            accountId: user._id
        }).lean().select().exec(function(err, invoices){
            if(err){
                res.status(500).send("There was an error");
            } if(!invoices){
                res.status(404).send("Invoice Not Found!");
            } else {
                res.status(200).json(invoices);
            }
        });
    }
});

router.post('/', function(req, res, next) {
    if(!(req.query.token
      && req.query.accountId
      && req.query.total)){
        return res.status(412).json({
            msg: "Route requisites not met."
        });
    }

    validateUser(req, res, checkInvoicedUser);

    function checkInvoicedUser(user){
        if(!user.admin){
            res.status(401).json({
                msg: "Not an admin!"
            });
        } else {
            User.findOne({
                _id: req.query.accountId
            }).lean().select().exec(function(err, invoicedUser){
                if(err){
                    res.status(500).send("There was an error");
                } if(!invoicedUser){
                    res.status(409).send("Invoiced user does not exist!");
                } else {
                    createInvoice(user);
                }
            });
        }
    }

    function createInvoice(user){
      if(!user.admin){
          res.status(401).json({
              msg: "Not an admin!"
          });
      } else {
        new Invoice({
            accountId: req.query.accountId,
            paid: req.query.paid,
            total: parseInt(req.query.total),
            due: req.query.due
        }).save(function(err, invoice) {
            if (err) {
                console.log("Error saving invoice to DB!");
                res.status(500).json({
                    msg: "Error saving invoice to DB!"
                });
            } else {
                res.status(201).send(invoice);
            }
        });
      }
    }
});

router.put('/:id', function(req, res, next) {
    if(!(req.body.token)){
        return res.status(412).json({
            msg: "Route requisites not met."
        });
    }

    validateUser(req, res, updateInvoice);

    function updateInvoice(user){
        if(!user.admin){
            res.status(401).json({
                msg: "Not an admin!"
            });
        } else {
            var updatedInvoice = {
              $set: {},
              $push: {
                documents: {
                  $each: []
                }
              }
            };

            if (req.body.paid && typeof req.body.paid === 'boolean') updatedInvoice.$set.paid = req.body.paid;
            if (req.body.total && typeof req.body.total === 'number') updatedInvoice.$set.total = req.body.total;
            if (req.body.due && typeof req.body.due === 'string') updatedInvoice.$set.due = req.body.due;

            for(var i = 0; i < req.body.documents.length; i++){
              updatedInvoice.$push.documents.$each.push({
                title: req.body.documents[i].title,
                description: req.body.documents[i].description,
                url: req.body.documents[i].url,
              })
            }

            Invoice.update({
                _id: req.params.id
            }, updatedInvoice)
            .exec(function(err, invoice) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).send(invoice);
                }
            });
        }
    }
});

function validateUser(req, res, success){
    var token = req.params.token || req.body.token || req.query.token;
    SessionService.validateSession(token, "user", function(accountId) {
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
