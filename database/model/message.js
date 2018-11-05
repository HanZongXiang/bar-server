const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title:String,
  content:String
},
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  })

module.exports = mongoose.model('message', message)