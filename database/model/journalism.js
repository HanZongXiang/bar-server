const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalism = new mongoose.Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: String,
  img: {
    type: String,
    required: true
  },
  content: String,
  readnums: {
    type:Number,
    default:0
  },
  commentnums: {
    type: Number,
    default: 0
  },
  comment: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'comment'
    }
  ]
},
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  })

module.exports = mongoose.model('journalism', journalism)