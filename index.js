import { writeFile } from 'fs';
import { DESCRIPTIONS } from './descriptions.js';

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

function main() {
  configureDescriptions(DESCRIPTIONS)

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

  writeFile("emojis.txt", output, { flag: "w+" }, (err) => {
    if (err) {
      console.log(err);
    }
  })
}

main()