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
  tel:String
},
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdTime',
      updatedAt: 'updatedTime'
    }
  })

module.exports = mongoose.model('user', user)