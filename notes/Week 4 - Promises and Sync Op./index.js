import express from "express";

const server =  express();
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

server.get("/", (request, response) => {
    response.send("Hello from Get!");
});