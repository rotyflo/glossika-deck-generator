"use strict";

if (process.argv.length < 3) {
    console.log("\nUsage: node app.js LANGUAGE\n");
    process.exit();
}

let fs = require("fs");
let output = "";
let language = {
    "german": "DE",
    "icelandic": "IS"
};
let selection = process.argv[2];

if (language[selection] === undefined) {
    console.log(`\n${selection} does not exist\n`);
    process.exit();
}

// GMS-B FILES AUDIO
for (let i = 1; i <= 6000; i++) {
    let bookNum = JSON.stringify(Math.floor((i - 1) / 2000) + 1);
    let setNum = JSON.stringify(Math.floor((i - 1) / 100) * 50 + 1);
    let audioFileNum = (i % 100 !== 0) ? JSON.stringify(i % 100) : "100";

    if (setNum.length < 4) setNum = "0".repeat(4 - setNum.length) + setNum;
    if (audioFileNum.length < 2) audioFileNum = "0" + audioFileNum;

    if (i % 2 === 0) output += `[sound:GLOSSIKA-EN${language[selection]}-F${bookNum}-GMS-${setNum}B-${audioFileNum}.mp3]\r\n`;
    else output += `[sound:GLOSSIKA-EN${language[selection]}-F${bookNum}-GMS-${setNum}B-${audioFileNum}.mp3]\t`;
}

fs.writeFileSync(`EN-${language[selection]}.txt`, output);
console.log(`\nEN-${language[selection]}.txt created\n`);