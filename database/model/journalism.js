const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalism = new mongoose.Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  content: String,
  readnums: {
    type:Number,
    default:66
  },
  commentnums: {
    type: Number,
    default: 88
  }
},
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  })

module.exports = mongoose.model('journalism', journalism)