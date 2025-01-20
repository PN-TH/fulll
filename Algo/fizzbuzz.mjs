/* Pour exécuter le programme depuis la console, utilisez la commande : node runFizzBuzz.mjs */

export const fizzBuzz = (range) => {
  let result = [];
  for (let i = 1; i <= range; i += 1) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";

    result = [...result, output || i];
  }

  return result;
};
