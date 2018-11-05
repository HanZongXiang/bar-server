const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MiniBar',
{ useNewUrlParser:true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error:'));
db.once('open', () => {
  console.log('success to connect');
});

module.exports = db;