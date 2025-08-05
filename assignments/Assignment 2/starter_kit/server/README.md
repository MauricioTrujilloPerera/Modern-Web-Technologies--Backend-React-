# Recipe Server

A Node.js/Express server for managing recipes with MongoDB.

## Prerequisites

- Node.js installed
- MongoDB running locally on port 27017

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /recipe` - Get all recipes
- `POST /recipe` - Create a new recipe
- `GET /recipe/:id` - Get a specific recipe
- `PUT /recipe/:id` - Update a recipe
- `DELETE /recipe/:id` - Delete a recipe

## Recipe Model

- `name` (String, required)
- `description` (String, required)
- `difficulty` (String, required, enum: ['Easy', 'Medium', 'Hard'])
- `ingredients` (Array of Strings, required)
- `steps` (Array of Strings, required)

## Running the Client

Navigate to the client directory and run:
```bash
npm install
npm run dev
```

The client will connect to the server running on port 8001. 