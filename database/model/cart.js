const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carts = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  checked: {
    type: Boolean,
    default: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'goods'
  },
  productNum: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime'
  }
})

module.exports = mongoose.model('carts', carts)