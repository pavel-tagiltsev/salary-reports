import {decrementAdapter, incrementAdapter, pieceworkAdapter} from "./helpers/adapters.js";
import {clearUnneededRows} from "./helpers/helpers.js";
import XLSX from "xlsx";
import path from "path";
import pug from "pug";
import fs from "fs";

const startedTime = new Date().getTime();

const workbook = XLSX.readFile(path.resolve('data', 'performance.xlsx'));

const sheetPiecework = workbook.Sheets[workbook.Props.SheetNames[0]];
const sheetIncrement = workbook.Sheets[workbook.Props.SheetNames[1]];
const sheetDecrement = workbook.Sheets[workbook.Props.SheetNames[2]];

const dataPiecework = XLSX.utils.sheet_to_json(sheetPiecework, { defval: "-" });
const dataIncrement = XLSX.utils.sheet_to_json(sheetIncrement, { defval: "-" });
const dataDecrement = XLSX.utils.sheet_to_json(sheetDecrement, { defval: "-" });

const piecework = clearUnneededRows(pieceworkAdapter(dataPiecework));
const increment = incrementAdapter(dataIncrement);
const decrement = decrementAdapter(dataDecrement);

const teachersNames = new Set(piecework.map((row) => row.name));
const teachers = Array.from(teachersNames).map((teacherName) => {
  const lessons = piecework
    .filter((row) => row.name === teacherName)
    .map((lesson) => delete lesson.name && lesson);

  const increments = increment.filter((row) => row.name === teacherName);
  const decrements = decrement.filter((row) => row.name === teacherName);

  return {
    name: teacherName,
    lessons,
    increments,
    decrements,
  }
});

const fn = pug.compileFile(path.resolve('templates', 'salary', 'salary.pug'));
teachers.forEach(async (teacher) => {
  const html = fn(teacher);
  fs.writeFileSync(path.resolve('output', teacher.name + '.html'), html);
  console.log('Completed:', teacher.name);
})

const finishedTime = new Date().getTime();
const scriptDuration = finishedTime - startedTime;

console.log(`Finished in ${new Date(scriptDuration).getMilliseconds()} ms`);