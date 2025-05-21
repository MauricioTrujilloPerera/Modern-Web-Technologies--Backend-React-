import express from "express";

const app =  express();
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

app.get("/", (request, response) => {
    response.send("Hello from the Backend!") // send a response to the request;
});