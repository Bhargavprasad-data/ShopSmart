const express = require('express');
const router = express.Router();

// If saving to MongoDB:
const Feedback = require('../models/Feedback'); // optional

router.post('/', async (req, res) => {
  const { feedback } = req.body;
  if (!feedback) return res.status(400).json({ error: 'Feedback is required' });

  try {
    // Just log or save to DB
    console.log('Received Feedback:', feedback);

    // To save in MongoDB:
    const newFeedback = new Feedback({ message: feedback });
    await newFeedback.save();

    res.status(200).json({ message: 'Feedback received' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving feedback' });
  }
});

module.exports = router;
