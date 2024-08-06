import minimist from "minimist";

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

const args = minimist(process.argv.slice(2));
const year = args["y"]? parseInt(args["y"], 10) : thisYear;
const month = args["m"]? parseInt(args["m"], 10) : thisMonth;

const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0);

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
outputCalendar(year, month);
