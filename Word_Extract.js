const fs = require('fs');
const path = require('path');

const countWords = (filePath) => {
    const text = fs.readFileSync(filePath, 'utf-8');
    const words = text.toLowerCase().split('\r\n');
    const wordCounts = {};
    words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    return wordCounts;//単語の出現回数を返す
};

const getDuplicateWords = (wordCounts) => {
    return Object.keys(wordCounts).filter((word) => wordCounts[word] > 1);
};//重複した単語を返す

const dirPath = './textFiles'; // ディレクトリのパスを指定
const files = fs.readdirSync(dirPath).filter((file) => path.extname(file) === '.txt');//ディレクトリ内のテキストファイルを取得

let totalWordCounts = {};
files.forEach((file) => {
    const wordCounts = countWords(path.join(dirPath, file));
    Object.keys(wordCounts).forEach((word) => {
        totalWordCounts[word] = (totalWordCounts[word] || 0) + wordCounts[word];
    });
});

const duplicateWords = getDuplicateWords(totalWordCounts);


/* fsモジュールとpathモジュールを使って、指定したディレクトリ内のテキストファイルの単語の出現回数を数えて、
全てのファイルの単語の出現回数を合計して、重複した単語を抽出してconsole.logで出力する。 */

fs.writeFileSync('./results/output.txt', duplicateWords.join('\r\n'), 'utf-8');

console.log(duplicateWords);