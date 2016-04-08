var mongoose = require('mongoose'),
  moment = require('moment');
var Project = new mongoose.Schema({
    accountId: {
      type: String,
      require: 'Please provide the id of the account'
    },
    created: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Date
    },
    version: {
      type: String
    },
    reports: [{
      title: {
        type: String
      },
      description: {
        type: String
      },
      url: {
        type: String
      },
      response: {
        type: String
      },
      status: {
        type: String
      }
    }]
});

mongoose.model('Project', Project);
