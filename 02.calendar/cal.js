import minimist from "minimist";

function outputCalendar(year, month) {
  const firstWeekDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");

  process.stdout.write("   ".repeat(firstWeekDay));

  for (let i = 1; i <= lastDate; i++) {
    process.stdout.write(`${i.toString().padStart(2)}`);
    if ((firstWeekDay + i) % 7 === 0 || i === lastDate) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
  }
  console.log();
}

const today = new Date();
const args = minimist(process.argv.slice(2));
const year = args.y ? args.y : today.getFullYear();
const month = args.m ? args.m : today.getMonth() + 1;

outputCalendar(year, month);
