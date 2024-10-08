#!/usr/bin/env node

import minimist from "minimist";

function outputCalendar(year, month) {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  console.log(`      ${month}月 ${year}`);
  console.log("日 月 火 水 木 金 土");
  process.stdout.write("   ".repeat(firstDate.getDay()));
  for (
    let currentDate = new Date(firstDate);
    currentDate <= lastDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    process.stdout.write(currentDate.getDate().toString().padStart(2));
    if (
      currentDate.getDay() === 6 ||
      currentDate.getDate() === lastDate.getDate()
    ) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
  }
}

const args = minimist(process.argv.slice(2));
const today = new Date();
const year = args.y ?? today.getFullYear();
const month = args.m ?? today.getMonth() + 1;

outputCalendar(year, month);
