const number = [...Array(20).keys()].map((n) => n + 1);
number.forEach((num) => {
  if (num % 15 === 0) {
    console.log("FizzBuzz");
  } else if (num % 3 === 0) {
    console.log("Fizz");
  } else if (num % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log('\x1b[37m%s\x1b[0m', num);
  }
});
