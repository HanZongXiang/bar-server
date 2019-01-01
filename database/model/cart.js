const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carts = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'goods'
  },
  total: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('carts', carts)