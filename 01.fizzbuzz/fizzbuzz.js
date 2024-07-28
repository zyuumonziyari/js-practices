const number = [...Array(20).keys()].map((n) => n + 1);
number.forEach((num) => {
  if (num % (3 * 5) === 0) {
    console.log("FizzBuzz");
  } else if (num % 3 === 0) {
    console.log("Fizz");
  } else if (num % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(num);
  }
});
