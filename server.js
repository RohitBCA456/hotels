// const notes = require('./notes.js');
// var _ = require('lodash');
// var age = notes.age;
// var result = notes.addNumber(age + 18,10);
// console.log(age);
// console.log(`The result is : ${result}`);
// var data = ["person","person",1,2,1,2,'name','age','2'];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.isString(3));
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Person = require('./Models/Person');
const MenuItem = require('./Models/MenuItem');
const passport = require('./auth');
const PORT = process.env.PORT || 3000;
const logRequest = (req,res,next) => {
          // console.log(`[${new Date().toLocaleString()}]Request Mode to : ${req.originalUrl}`);
          next();
}
app.use(logRequest);
app.use(passport.initialize());
const localAuth = passport.authenticate('local',{session : false});
app.get('/',function(req,res) {
          res.send('Welcome to my hotel');
});
const PersonRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuRoutes');
app.use('/person',PersonRoutes);
app.use('/menu',MenuItemRoutes);
app.listen(PORT, () => {
          console.log('server listening on port 3000');
})