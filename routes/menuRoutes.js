const express = require('express');
const router = express.Router();
const MenuItem = require('./../Models/MenuItem');
router.post('/', async (req, res) => {
          try {
                    const data = req.body;
                    const newMenuItem = new MenuItem(data);
                    const response = await newMenuItem.save();
                    console.log('data saved');
                    res.status(200).json(data);
          } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
});
router.get('/', async (req, res) => {
          try {
                    const response = await MenuItem.find();
                    console.log('data fetched');
                    res.status(200).json(response);
          } catch (error) {
                    console.log(error);
                    res.status(500).json({ error: 'Internal server error' });
          }
});
//commit added for testing
module.exports = router;  