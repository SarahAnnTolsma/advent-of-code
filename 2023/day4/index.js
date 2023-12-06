let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");

let sum = 0;

for (let line of lines)
{
    // Remove double spaces.
    line = line.replace(/\s\s/g, " ");

    let game = line.slice(line.indexOf(": ") + 2);

    let numbers = game.split(" | ");

    let winners = new Set(numbers[0].split(/ /g).map(n => Number.parseInt(n)));
    let ours    = new Set(numbers[1].split(/ /g).map(n => Number.parseInt(n)));

    let points = 0;

    for (let number of ours)
    {
        if (winners.has(number))
        {
            points = Math.max(points * 2, 1);
        }
    }

    sum += points;
}

console.log(sum);