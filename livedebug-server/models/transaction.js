const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = require('./account');

const transactionSchema = new Schema({
  amount: {
    type: Number,
    min: [ 10000, 'Minimal amount 10000' ],
    require: [ true, 'amount is required']
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    require: [ true, 'Destination account must fill']
  }
})

transactionSchema.pre('save', function(next) {
  console.log("masuk pre transaction 1===", this.from, this.amount)
  Account.findOne({
    _id: this.from,
    balance: { $gte: Number(this.amount)  }
  })
  .then(updated => {
    console.log("masuk pre transaction 2===", updated)
    if (updated) {
      console.log("masuk pre transaction 3===")
      updated.balance -= this.amount;
      updated.save();
    } else {
      next({
        message: 'Insufficient balance'
      });
    }
  })
  .then(updated => {
    console.log("masuk pre transaction 4===", updated)
    return Account.findOne({
      _id: this.to
    })
  })
  .then(updated => {
    updated.balance += this.amount;
    updated.save();
    console.log("masuk pre transaction 5===", updated)
    next();
  })
  .catch(err => {
    next({
      message: 'Transaction failed'
    });
  })
})

let Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction
