const jwt = require('../helpers/token');
const User = require('../models/user');
const Account = require('../models/account');
const Transaction = require('../models/transaction');

module.exports = {
  authentication: function(req, res, next) {
    let token = req.headers.token;
    // console.log("masuk authentication == 1", token)
    if (!token) {
      // console.log("masuk authentication == 2 error")
      res.status(401).json({ error: 'You must login to access this endpoint' });
    } else {
      // console.log("masuk authentication == 3")
      let decoded = jwt.verify(token);
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           req.user = user;
           console.log("masuk authentication == 5", req.user)
           next();
         } else {
           res.status(401).json({ err: 'User is not valid' });
         }
       })
       .catch(err => {
         res.status(500).json(err)
       })
    }
  },
  authorization: function(req, res, next) {
    let accountNumber = null;
    console.log("masuk 1 authorization ===", req.params, req.body, req.user)
    if (req.params.accountNumber) {
      accountNumber = req.params.accountNumber
    } else {
      accountNumber = req.body.accountNumber
    }

    Account.findOne({
      accountNumber: accountNumber
    })
     .then(account => {
      console.log("masuk 2 ===", account)
       if (account.userId.toString() === req.user._id.toString()) {
         req.transferFromId = account._id;
         console.log("masuk 3 ===", req.transferFromId)
         next();
       } else {
         res.status(403).json({ err: 'Forbidden' });
       }
     })
     .catch(err => {
       res.status(500).json(err)
     })
  },
  authForTransfer: function(req, res, next) {
    console.log("masuk 1 authForTransfer ===", req.body)
    Account.findOne({
      accountNumber: req.body.accountNumberTo
    })
    .then(account => {
      if(account) {
        req.transferToId = account._id;
        next();
      } else {
        res.status(400).json({ err: 'Your destination account number is invalid' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}
