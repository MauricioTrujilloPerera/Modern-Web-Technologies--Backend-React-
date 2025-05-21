import express from "express";

const app =  express();
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

// does the request.method for you (no longer need the long list of 'if' statements):

// GET method request
app.get("/", (request, response) => {
    response.send("Hello from the Backend!") // send a response to the request;
});

// POST method request
app.post("/", (request, response) => {
    response.send("Hello from POST request!")
});

// PUT method request
app.put("/", (request, response) => {
    response.send("Hello from PUT request!")
});

// using watch as an example from youtube
app.get("/watch", (request, response) => {
    response.send("Hello from the Backend!") // send a response to the request;
    console.log(request.url); // watch (the long string aka location to video)
    console.log(request.query);
    console.log(request.params);
    console.log(request.body);
    response.send("You got to the Watch Endpoint!");
});

// parameters
app.get("/params/:itemID", (request, response) => {
    console.log(request.url); 
    console.log(request.query);
    console.log(request.params.itemID); // now recognized itemID as an object and lets us manipulate it
    console.log(request.body);
    response.send("You got to the Params Endpoint!");
});