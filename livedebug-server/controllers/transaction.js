const Transaction = require('../models/transaction');

class TransactionController {
  static transfer(req, res) {
    console.log("masuk 1 transfer ===", req.body, req.transferFromId)
    Transaction.create({
      amount: req.body.amount,
      from: req.transferFromId,
      to: req.transferToId
    })
    .then(success => {
      console.log("masuk 2 transfer ===", success)
      return Transaction.findOne({
        _id: success._id
      })
      .populate({
        path: 'from',
        populate: {
          path: 'userId'
        }
      })
    })
    .then(trans => {
      console.log("masuk 3 transfer ===", trans)
      res.status('201').json(trans);
    })
    .catch(err => {
      console.log("masuk 4 transfer ===", err)
      if (err.message) {
        res.status(400).json({ err: err.message });
      } else {
        res.status(500).json(err);
      }
    })
  }
}

module.exports = TransactionController
