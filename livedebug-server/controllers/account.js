const Account = require('../models/account');

class AccountController {
  static findAccounts(req, res) {
    // console.log("masuk findAccounts 1 ===", req.params )
    Account.findOne({ accountNumber: req.params.accountNumber })
     .populate('userId')
     .then(account => {
      // console.log("masuk sini 2 ===", account )
       res.status(200).json(account);
     })
     .catch(err => {
      // console.log("masuk sini 3 ===", err )
       res.status(500).json(err);
     })
  }

  static newAccount(req, res) {
    let acc = null;
    // console.log("masuk == 1", req.body, req.user)
    if (req.body.hasOwnProperty('balance')) {
      acc = {
        balance: req.body.balance,
        userId: req.user._id
      }
    } else {
      acc = {
        userId: req.user._id
      }
    }
    // console.log("masuk == 2", acc)
    Account.create(acc)
     .then(account => {
      // console.log("masuk == 3", account)
       res.status(201).json(account);
     })
     .catch(err => {
      // console.log("masuk == 4", err)
       res.status(500).json(err);
     })
  }

  static remove(req, res) {
    console.log("masuk remove acc 1 ===", req.params )
    Account
     .deleteOne({
       accountNumber: req.params.accountNumber
     })
     .then(deleted => {
       res.status(200).json(deleted);
     })
     .catch(err => {
       res.status(500).json(err);
     })
  }

}

module.exports = AccountController
