// one way to do require this node library:
const tailwindcss = require("tailwindcss");

/* for THIS second one to work, you need to go into the
package.json file and add "type": "module", to make it
accept modules. Without it, this second line wont work! */
import lodash_2 from "lodash";

/* WHEN YOU RUN "npm start" IN THE TERMINAL, IT CHECKS YOUR SCRIPTS:

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node 02.js"
  },

  you can add, remove & modify this. you can select the file start location, 
  and make it start from there. Without the "start", npm start will NOT work as 
  it is not recognized!
*/