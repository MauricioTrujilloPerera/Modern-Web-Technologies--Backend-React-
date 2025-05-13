/* 
C -> POST (create)
R -> GET (read)
U -> PUT or PATCH (update)
D -> DELETE (delete)
*/

// creating a server using HTTP protocol:
import http from "http";
import fs from "fs"; // this lets us CRUD on files/folders & others

// crate a request for a client, and receive the response
const server = http.createServer((request, response) => {

  /*
   * REQUEST: put this when requesting for the page/url
   * RESPONSE: use this to decide what to do with the response you get
   */

    if (request.url === "/") {
        response.end("This is the Home Page!") // end the connection & print the message
    } 
    else if (request.url === "/about-me") {
        const data = fs.readFileSync("./html/about-me.html") // in this case we will use sync, because we want this process to be done one by one in order, not all at once (we could lose our window to run the first one if it takes too long)
        response.end(data) // send the data information from the const we made above
    }
    else if (request.url === "/login") {
        const data = fs.readFileSync("./html/login.html")
        response.end(data)
    }
    else if (request.url === "/methods") {

      if (request.method == "GET") { // <- this is the browser default
        response.end("Hello from the GET Method!")
      }
      else if (request.method == "POST") {
        response.end("Hello from the POST Method!")
      }
      else if (request.method == "PUT") {
        response.end("Hello from the PUT Method!")
      }
    }
    else {
        response.end("404: PAGE NOT FOUND!") // in case page is not found, throw this error response
    }
});

// creates the local server on the port 3000, like when we did react in the past with nextjs
server.listen(3000, () => {
    console.log('http://localhost:3000')
});

/*
to make things update every time you save like in nextjs, run the
project server file with "nodemon ./<server file name>"
*/