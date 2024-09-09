const express = require('express');
const router = express.Router();
const Person = require('./../Models/Person');
router.post('/', async (req, res) => {
          try {
                    const data = req.body;
                    const newPerson = new Person(data);
                    const response = await newPerson.save();
                    console.log('data saved');
                    res.status(200).json(response);
          } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
});
router.get('/', async (req, res) => {
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