const fs = require('fs');
const path = require('path');
const readline = require('readline');

const countWords = async (filePath) => {
    const wordCounts = {};
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
    });

    for await (const line of readInterface) {
        const word = line.toLowerCase();
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    return wordCounts;
};

const getDuplicateWords = (wordCounts) => {
    return Object.keys(wordCounts).filter((word) => wordCounts[word] > 1);//wordCountsオブジェクトより値が1より大きいものを抽出
};

const dirPath = './textFiles';
const files = fs.readdirSync(dirPath).filter((file) => path.extname(file) === '.txt');

let totalWordCounts = {};
const processFiles = async () => {
    for (const file of files) {
        const wordCounts = await countWords(path.join(dirPath, file));
        Object.keys(wordCounts).forEach((word) => {
            totalWordCounts[word] = (totalWordCounts[word] || 0) + wordCounts[word];
        });
    }

    const duplicateWords = getDuplicateWords(totalWordCounts);
    fs.writeFileSync('./results/output.txt', duplicateWords.join('\r\n'), 'utf-8');
    console.log(duplicateWords);
};

processFiles();