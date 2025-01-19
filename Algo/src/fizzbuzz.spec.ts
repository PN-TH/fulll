import { fizzBuzz } from "./fizzbuzz";

describe("FizzBuzz", () => {
  it("should return a list of numbers from 1 to FizzBuzz", () => {
    const range = 15;
    const result = fizzBuzz(range);

    expect(result).toEqual(
      [
        1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz",
        11, "Fizz", 13, 14, "FizzBuzz"
      ]
    );
  });
});
