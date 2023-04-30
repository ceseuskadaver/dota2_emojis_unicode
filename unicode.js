const fs = require('fs');

let output = `2000-2010 - ranks\n\n`

for (let i = 1; i <= 4095; ++i) {
  let code = i.toString(16).padStart(3, "0");
  let unicode = '%ue' + code
  output += `${i} (${unicode}): bind <your_key> "say ${unescape(unicode)}"\n`
}

fs.writeFile("emojis.txt", output, { flag: "w+" }, (err) => {
  if (err) {
    console.log(err);
  }
})