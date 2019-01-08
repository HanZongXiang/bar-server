const mongoose = require('mongoose')

const comment = new mongoose.Schema({
  content: String,
  editing: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  journalism: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'journalism'
  },
  reply: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'reply',
      
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

module.exports = mongoose.model('comment',comment)