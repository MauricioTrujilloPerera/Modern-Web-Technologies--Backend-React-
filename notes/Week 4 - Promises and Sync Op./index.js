import express from "express";

const server =  express();
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

/* - - - - - - - - - - - - - - - - - - - - - - - - */

// to make to cleaner and easier to just do these when calling the function
const logger = (request, response, next) => {
    console.log(request.url);
    console.log(request.method);
    console.log(Date());
    next();
}

const newMiddleWare = (request, response, next) => {
    console.log("Hello from the Middleware!")
    next();
}

server.use(logger);

server.get("/", newMiddleWare, logger, (request, response) => {
    response.send("Hello from the Server!");
});

server.get("/login", (request, response) => {
    logger(request);
    response.send("Welcome to the Login Page!");
});