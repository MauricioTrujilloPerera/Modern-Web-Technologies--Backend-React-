import express from "express";
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

/* !IMPORTANT MIDDLEWARE! */
server.use(cors());
server.use(express.json()); // allows parsing of JSON
server.use(express.urlencoded({extended: true})); // allows FORM data from HTML
/* - - - - - - - - - - - */

// main page
server.get("/", (request, response) => {
    response.send("Welcome to the Main Server Page!")
});

// data route *(super important!)*
server.get("/data", (request, response) => {

    let user01 = {
        fname: "John",
        lname: "Doe",
        age: 21,
        bio: "Hi! I'm John!"
    }
    // sends the fetch request BACK to the front end as a JSON!
    response.json(user01); 
});

// we use post request here to 
server.post("/register", (request, response) => {
    console.log(request.query);
    console.log(request.params);
    console.log(request.body); // this is the info we got!

    response.json({message: "Information Received!"});
});

server.use(cors());

// error handling
server.use("", (request, response) => {
    response.status(404).send("404 - Page Not Found!")
});