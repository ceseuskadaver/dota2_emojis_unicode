const fs = require('fs');

const emojiDescriptionMap = new Map()

function setEmojiDescription({ code, description }) {
  emojiDescriptionMap.set(code, description)
}

function configureDescriptions(descriptions) {
  for (const description of descriptions) {
    setEmojiDescription({
      code: description.code,
      description: description.description
    })
  }
}

configureDescriptions([{
  code: 270,
  description: ":davion_sexy:"
}, {
  code: 340,
  description: ":eyebrow:"
}, {
  code: 2000,
  description: ":uncalibrated:"
}, {
  code: 2001,
  description: ":herald:"
}, {
  code: 2002,
  description: ":guardian:"
}, {
  code: 2003,
  description: ":crusader:"
}, {
  code: 2004,
  description: ":archon:"
}, {
  code: 2005,
  description: ":legend:"
}, {
  code: 2006,
  description: ":ancient:"
}, {
  code: 2007,
  description: ":divine:"
}, {
  code: 2008,
  description: ":immortal:"
}, {
  code: 2009,
  description: ":top100:"
}, {
  code: 2010,
  description: ":top1:"
}])

let output = ""

for (let i = 1; i <= 6399; ++i) {
  const isOverflow = i >= 4096
  const numberToCode = isOverflow ? i - 4096 : i
  const code = numberToCode.toString(16).padStart(3, "0");
  const letter = isOverflow ? "f" : "e"
  const unicode = '%u' + letter + code
  const description = emojiDescriptionMap.has(i) ? ` - ${emojiDescriptionMap.get(i)}` : ""
  output += `${i} (${unicode}): bind <your_key> "say ${unescape(unicode)}"${description}\n`
}

fs.writeFile("emojis.txt", output, { flag: "w+" }, (err) => {
  if (err) {
    console.log(err);
  }
})