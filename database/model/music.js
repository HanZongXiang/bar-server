const mongoose = require('mongoose')
const Schema = mongoose.Schema


const music = new mongoose.Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title:String,
  artist:String,
  pic:String,
  src:String,
  lrc:String
},
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  })

module.exports = mongoose.model('music', music)