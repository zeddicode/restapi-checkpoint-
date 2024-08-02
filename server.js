import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,})

  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
  });
app.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {$set: req.body},
          {new: true, runValidators: true}
        );
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

app.delete('/users/:id', async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted' });
} catch (err) {
  res.status(500).json({ message: err.message });
}
});
  
  
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});