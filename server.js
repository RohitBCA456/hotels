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
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Person = require('./Models/Person');
const MenuItem = require('./Models/MenuItem');
app.get('/',(req,res) => {
          res.send('Welcome to my hotel');
});
const PersonRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuRoutes');
app.use('/person',PersonRoutes);
app.use('/menu',MenuItemRoutes);
app.listen(3000, () => {
          console.log('server listening on port 3000');
})