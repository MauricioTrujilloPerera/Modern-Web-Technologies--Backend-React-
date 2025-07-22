import express, { response } from "express";
import mongoose from "mongoose"; //connect to database
import dotenv from "dotenv"; // this links the .env file we have in this dir
import Book from "./models/book.js"

dotenv.config(); // adds our env config to the server config for use

const app = express();
const PORT = process.env.PORT || 8000;

/* MongoDB Setup - - - - - - - - - - - - - - - - - - - - - - - */
mongoose.connect(process.env.MONGODB_CONNECTION);
const database = mongoose.connection;

database.once("open", () => { // opens the mongodb database server
  console.log("Connected to MongoDB");
});

database.on("error", (err) => { // turns the mongodb connection ON
  console.log("DB Error");
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

// this makes it so when you open the books json on the web, it filters whatever you're looking for!
app.get("/books", async(req, res) => {
    try {
        const results = await Book.find(); // example filter: {title: "Parallel Lines"}, {title: 1, price: 1}
        res.json(results)
    } catch (error) {
        
    }
});

const laptopSchema = mongoose.Schema()
const laptops = mongoose.model("laptops", laptopSchema)
app.get("laptops", async(request, response) => {
  try {
    
  } catch (error) {
    
  }
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});