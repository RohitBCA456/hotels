const express = require('express');
const router = express.Router();
const Person = require('./../Models/Person');
const {jwtAuthMiddleWare,generateToken} = require('./../jwt');
router.post('/signup', async (req, res) => {
          try {
                    const data = req.body;
                    const newPerson = new Person(data);
                    const response = await newPerson.save();
                    console.log('data saved');
                    const payLoad = {
                              id : response.id,
                              username : response.username
                    }
                    console.log(JSON.stringify(payLoad));
                    const token = generateToken(payLoad);
                    console.log(`Token is ${token}`);
                    res.status(200).json({response : response,token : token});
          } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
});
router.post('/login',async (req,res) => {
          try{
                    const {username,password} = req.body;
                    const user = await Person.findOne({ username: username});
                    if(!user || !(await user.comparePassword(password) !== password)){
                              return res.status(401).json({ error: 'Invalid username or password'});
                    }
                    const payLoad = {
                              id : user.id,
                              username : user.username
                    }
                    const token = generateToken(payLoad);
                    res.json({token});
          }catch(error){
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
})
router.get('/profile',jwtAuthMiddleWare,async(req,res) => {
          try{
                    const userData = req.user;
                    console.log(userData);
                    const userId = userData.id;
                    const user = await Person.findById(userId);
                    res.status(200).json({ user: user });
          }catch(error){
                    res.status(200).json({error : 'internal server error'});
          }
})
router.get('/',jwtAuthMiddleWare,async (req, res) => {
          try {
                    const data = await Person.find();
                    console.log('data successfully fetched');
                    res.status(200).json(data);
          } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
})
router.get('/:workType', async(req, res) => {
          try {
                    const workType = req.params.workType;
                    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
                              const response = await Person.find({work: workType});
                              res.status(200).json(response);
                    }
                    else {
                              res.status(404).json({ error: 'Invalid work type' });
                    }
          }    catch(error){
                    
          }
});
router.put('/:id',async(req,res) => {
          try{
                    const personId = req.params.id;
                    const updatedPersonData = req.body;
                    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
                              new : true,
                              runValidators : true,
                    });
                    if(!response){
                              return res.status(404).json({error : 'person not found'});
                    }
                    console.log('data updatd');
                    res.status(200).json(response);
          }catch(error){
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
});
router.delete('/:id',async(req,res) => {
          try{
                    const personId = req.params.id;
                    const response = await Person.findByIdAndDelete(personId);
                    if(!response){
                              return res.status(404).json({error : 'person not found'});
                    }
                    else {
                              console.log('data deleted');
                              res.status(200).json({message : 'person deleted successfully!'});
                    }
          }catch(error){
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
});
module.exports = router;