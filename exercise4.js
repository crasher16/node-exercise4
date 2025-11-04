// ----------------------------------------------------
// Exercise 4 – Create 10 random files and merge lines
// Developer: Idan Dror
// Description:
// 1. Creates 10 text files (file1.txt ... file10.txt).
//    Each file gets a random number of lines (1–20).
//    Each line looks like "A1", "B3", etc.
// 2. Then creates output.txt that takes:
//    1 line from file1, 2 lines from file2, etc.
//    If a file has fewer lines, it copies only the available ones.

// On terminal: node exercise4.js
// ----------------------------------------------------

const fs = require("fs");
const path = require("path");

// Number of input files
const NUM_FILES = 10;
const OUTPUT_FILE = "output.txt";

// Step 1 – Create 10 random text files
for (let i = 1; i <= NUM_FILES; i++) {
  const numLines = Math.floor(Math.random() * 20) + 1; // 1–20 random lines
  let content = "";
  for (let j = 1; j <= numLines; j++) {
    const letter = String.fromCharCode(64 + i); // A, B, C...
    content += `${letter}${j}\n`;
  }
  fs.writeFileSync(path.join(__dirname, `file${i}.txt`), content.trim());
  console.log(`📄 Created file${i}.txt (${numLines} lines)`);
}

// Step 2 – Reset the output file
fs.writeFileSync(OUTPUT_FILE, "");

// Step 3 – Copy lines based on file index
for (let i = 1; i <= NUM_FILES; i++) {
  const filePath = path.join(__dirname, `file${i}.txt`);
  const linesToCopy = i; // 1 from file1, 2 from file2, etc.

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/).filter((line) => line.trim() !== "");
  const selected = lines.slice(0, linesToCopy);

  fs.appendFileSync(OUTPUT_FILE, selected.join("\n") + "\n");
  console.log(`✅ Copied ${selected.length} lines from file${i}.txt`);
}

console.log(`\n✨ Done! All merged into ${OUTPUT_FILE}`);
