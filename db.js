const mongoose = require('mongoose');
require('dotenv').config();
// const mongooseURL = "mongodb://localhost:27017/hotels";
const mongooseURL = process.env.DB_URL;
mongoose.connect(mongooseURL,{
          useNewUrlParser : true,
          useUnifiedTopology : true
})
const db = mongoose.connection;
db.on('connected',() => {
          console.log('Connected to MongoDB server');
})

db.on('error',(err) => {
          console.log('Error connecting to MongoDB server',err);
})

db.on('disconnected',() => {
          console.log('Disconnected from MongoDB server');
})
module.exports = db;