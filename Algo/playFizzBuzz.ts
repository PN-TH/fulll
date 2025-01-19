import * as readline from "readline";
import { fizzBuzz } from "./src/fizzbuzz";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter the max value for FizzBuzz: ", (input) => {
    const range = Number(input)

    if (isNaN(range) || range <= 0) {
        console.log("Please enter a valid number greater than 0");
    } else {
        const result = fizzBuzz(range);
        console.log(result.join(", "));
    }

    rl.close();
});
