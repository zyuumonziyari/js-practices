import minimist from "minimist";

const today = new Date();
let requestedYear = today.getFullYear();
let requestedMonth = today.getMonth() + 1;
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

const args = minimist(process.argv.slice(2));
if (args["y"]) requestedYear = parseInt(args["y"], 10);
if (args["m"]) requestedMonth = parseInt(args["m"], 10);

const firstDay = new Date(requestedYear, requestedMonth - 1, 1);
const lastDay = new Date(requestedYear, requestedMonth, 0);

function outputCalendar(year, month) {
  console.log(`      ${month}月 ${year}`);
  console.log(weekdays.join(" "));

  const startingDay = firstDay.getDay();
  process.stdout.write(" ".repeat(startingDay * 3));

  for (let i = 1; i <= lastDay.getDate(); ++i) {
    process.stdout.write(i.toString().padStart(2) + " ");
    if ((startingDay + i) % 7 === 0) {
      process.stdout.write("\n");
    }
  }
  process.stdout.write("\n");
}
outputCalendar(requestedYear, requestedMonth);
