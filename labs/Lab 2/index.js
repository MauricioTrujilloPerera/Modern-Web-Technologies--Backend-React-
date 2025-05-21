import express from "express";
import router from "./routers/labRouter.js";

const server =  express();
const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

server.use('/lab', router);