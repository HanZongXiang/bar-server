const mongoose = require('mongoose')

const user = new mongoose.Schema({
  username: String,
  desc: String,
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  avatar: String,
  date:String,
  tel:String,
  level: {
    type: Number,
    default: 0 // 0表示普通用户，1表示管理员
  },
  problem: String,
  anwser: String
},
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  })

module.exports = mongoose.model('user', user)