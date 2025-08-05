import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recipesRouter from './routes/recipes_router.js';

const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://apielixer:AKM2D7aCzng6DhK6@cluster0.3ghm8iq.mongodb.net/Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/', recipesRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Recipe API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 