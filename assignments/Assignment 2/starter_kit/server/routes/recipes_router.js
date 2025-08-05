import express from 'express';
const router = express.Router();
import Recipe from '../models/Recipe.js';

// GET route to fetch all recipes
router.get('/recipe', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add a recipe
router.post('/recipe', async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    steps: req.body.steps
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route with param of id to find and send content
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route with param of id to find and edit documents
router.put('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      recipe.name = req.body.name;
      recipe.description = req.body.description;
      recipe.difficulty = req.body.difficulty;
      recipe.ingredients = req.body.ingredients;
      recipe.steps = req.body.steps;

      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route with param of id to find and delete the selected document
router.delete('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      await recipe.deleteOne();
      res.json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 