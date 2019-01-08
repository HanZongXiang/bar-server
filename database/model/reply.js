const mongoose = require('mongoose')

const reply = new mongoose.Schema({
  responder: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  reviewer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  content: String,
  editing: {
    type: Boolean,
    default: false
  }
},
{
  versionKey: false,
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
})

module.exports = mongoose.model('reply', reply)