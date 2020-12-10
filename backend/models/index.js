const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'local'
const configDB = require('../config/db.json')[env]
module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(configDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    const db = mongoose.connection
    db.on('error',console.error.bind(console, 'db connection error: 🔥'))
    db.once('open', () => {
    })
  },
  disconnect: done => {
    mongoose.disconnect(done);
  }
};
