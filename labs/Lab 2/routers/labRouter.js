import express from "express";

const router = express.Router();

router.get('/greeting', (request, response) => {
    response.send("Mauricio Trujillo Perera");
});

router.get('/add/:x/:y', (request, response) => {

    console.log(request.params.x);
    let x = parseFloat(request.params.x);
    let y = parseFloat(request.params.y);
    response.send(`${x + y}`);
})

router.get('/calc/:x/:y/:operator', (request, response) => {

    let x = parseFloat(request.params.x);
    let y = parseFloat(request.params.y);
    let operator = request.params.operator;

    switch(operator) {
        case "+":
            return response.send(`${x + y}`);
        case "-":
            return response.send(`${x - y}`);
        case "*":
            return response.send(`${x * y}`);
        case "/":
            if (y != 0 || x != 0) {
                return response.send(`${x / y}`);
            }
            else {
                return response.send("X or Y Cannot be 0!")
            }
        default:
            break;
    };
});

// SELF REMINDER: COMMIT TO GIT BEFORE HANDING IN!!!

export default router;