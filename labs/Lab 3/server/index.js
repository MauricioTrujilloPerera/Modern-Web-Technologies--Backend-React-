import express from "express";
import cors from "cors";
import multer from "multer";
import lodash from "lodash";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const server = express();
const PORT = process.env.PORT || 3000;
server.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
console.log(_directoryName);

const storage = multer.diskStorage({
    destination: function (request, file, cd){
        cb(null, "uploads/")
    },
    filename: function (request, file, cb) {
        
    }
});

/* - - - - - MAIN SERVER SETTINGS - - - - - */

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

server.get("/", (request, response) => {
    response.send("Welcome to the Server Backend!")
});

/* getting information - - - - - - - - - - - - - - - */
server.get("/fetch/single", (request, response) => {
    // find directory
    let content = fs.readdirSync("/.uploads") // gives an array of all files

    // pick a random file
    let randomFile = lodash.sample(content);
    response.sendFile(`/server/uploads/${randomFile}`); // looks and puts the file in the folder

    // find file from the directory

    // send the file
});

const upload = multer({storage: storage});

/* saving information - - - - - - - - - - - - - - - */
server.post("/save/single", (request, response) => {
    //...
});