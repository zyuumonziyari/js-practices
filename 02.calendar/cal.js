import minimist from "minimist";

function outputCalendar(year, month) {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  const firstWeekday = firstDate.getDay();

  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");
  process.stdout.write("   ".repeat(firstDate.getDay()));
  for (let date = firstDate; date <= lastDate; date.setDate(date.getDate() + 1)) {
    process.stdout.write(date.getDate().toString().padStart(2));
    if ((firstWeekday + date.getDate()) % 7 === 0 || date.getDate() === lastDate.getDate()) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
  }
  console.log();
}

const today = new Date();
const args = minimist(process.argv.slice(2));
const year = args.y || today.getFullYear();
const month = args.m || today.getMonth() + 1;
outputCalendar(year, month);
