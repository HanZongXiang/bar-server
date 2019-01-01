const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orders = new Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'goods'
  },
  nums: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('orders', orders)