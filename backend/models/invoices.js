var mongoose = require('mongoose'),
  moment = require('moment');
var Invoice = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        require: 'Please provide the id of the account'
    },
    paid: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number,
        require: "Please provide the total amount of the invoice"
    },
    created: {
        type: Date,
        default: Date.now
    },
    due: {
        type: Date,
        default: moment().add(14, 'd')
    },
    documents: [{
      title: {
        type: String
      },
      description: {
        type: String
      },
      url: {
        type: String
      }
    }]
});

mongoose.model('Invoice', Invoice);
