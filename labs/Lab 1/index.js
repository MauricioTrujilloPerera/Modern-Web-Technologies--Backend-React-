import bob from "lodash";

// create an object for the current date
let currentDate = new Date();

// creating list of holidays into a list
const holidays = [
    {name: "Christmas", date: new Date("2025-12-25")},
    {name: "Canada Day", date: new Date("2025-7-01")},
    {name: "New Years", date: new Date("2026-01-01")},
    {name: "Easter", date: new Date("2026-04-20")},
];

// create a loop to iterate all the items in the list, and show how many days until that holiday
holidays.forEach(holiday => {
    console.log("- - - - - - - - - - - - - - -")
    const timeTillHoliday = (holiday.date - currentDate);
    const daysTill = (Math.ceil(timeTillHoliday / (1000 * 60 * 60 * 24)))
    console.log(`${holiday.name} is in ${daysTill} days`); // convert milliseconds -> seconds -> hours -> days
});

const randomHoliday = bob.sample(holidays)
console.log(`Random Holiday: ${randomHoliday}`)
console.log(randomHoliday)

const indexChristmas = bob.findIndex(holidays, {name: "Christmas"});
const indexCanadaDay = bob.findIndex(holidays, {name: "Canada Day"});

console.log(`Index of Christmas: ${indexChristmas}`);
console.log(`Index of Christmas: ${indexCanadaDay}`);