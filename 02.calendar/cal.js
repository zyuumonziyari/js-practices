import minimist from "minimist";

function outputCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

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

const today = new Date();
const args = minimist(process.argv.slice(2));
const year = args.y? args.y : today.getFullYear();
const month = args.m? args.m : today.getMonth() + 1;

outputCalendar(year, month);
