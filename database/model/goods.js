const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goods = new Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: String,
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  heat: {
    type:Number,
    default: 0
  },
  desc: String
},
{
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('goods', goods)