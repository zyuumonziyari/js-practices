#!/usr/bin/env node

import minimist from "minimist";

function outputCalendar(year, month) {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");
  process.stdout.write("   ".repeat(firstDate.getDay()));
  while (firstDate <= lastDate) {
    process.stdout.write(firstDate.getDate().toString().padStart(2));
    if (
      firstDate.getDay() === 6 ||
      firstDate.getDate() === lastDate.getDate()
    ) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
    firstDate.setDate(firstDate.getDate() + 1);
  }
}

const today = new Date();
const args = minimist(process.argv.slice(2));
const year = args.y ?? today.getFullYear();
const month = args.m ?? today.getMonth() + 1;
outputCalendar(year, month);
