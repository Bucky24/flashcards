const fs = require("fs");
const path = require("path");
const readline = require("readline");

function help() {
    console.log("node add_new_words.js <module> \"<sentence>\"");
    process.exit(1);
}

if (process.argv.length <= 2) {
    help();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function ask(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (result) => {
            resolve(result);
        });
    });
}

const section = process.argv[2];
const sentence = process.argv[3].toLowerCase();

const dataDir = path.resolve(__dirname, "..", "data");
const dutchFile = path.join(dataDir, "dutch.json");

const contentsString = fs.readFileSync(dutchFile, "utf8");
const contents = JSON.parse(contentsString);

const allWords = {};

for (let tempSection in contents) {
    for (let word in contents[tempSection]) {
        allWords[word] = tempSection;
    }
}

if (!contents[section]) {
    console.log("Adding new section " + section);
    contents[section] = {};
}

(async () => {
    const words = sentence.split(" ");

    for (const word of words) {
        console.log("Adding " + word);

        if (allWords[word]) {
            console.log(word + " was already found in " + allWords[word] + ". Skipping");
            continue;
        }

        const full = await ask("Is there a full verb form of the word? ");

        let useWord = word;
        if (full) {
            useWord = full;
        }

        if (allWords[useWord]) {
            console.log(useWord + " was already found in " + allWords[useWord] + ". Skipping");
            continue;
        }

        const prefix = await ask("Does word have a prefix? ");

        if (prefix) {
            useWord = prefix + " " + useWord;
        }

        if (allWords[useWord]) {
            console.log(useWord + " was already found in " + allWords[useWord] + ". Skipping");
            continue;
        }

        console.log("Adding " + useWord);

        const answer = await ask("What is the translation? ");
        contents[section][word] = answer;
    }

    fs.writeFileSync(dutchFile, JSON.stringify(contents, null, 4));

    rl.close();
})();