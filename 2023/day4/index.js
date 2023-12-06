let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");
let games = [ ];

function Game(winners, numbers)
{
    this.winners = winners;
    this.numbers = numbers;
}

for (let line of lines)
{
    // Remove double spaces.
    line = line.replace(/\s\s/g, " ");

    let game = line.slice(line.indexOf(": ") + 2);

    let numbers = game.split(" | ");

    let winners = new Set(numbers[0].split(/ /g).map(n => Number.parseInt(n)));
    let ours    = new Set(numbers[1].split(/ /g).map(n => Number.parseInt(n)));

    games.push(new Game(winners, ours));
}

function part1()
{
    let sum = 0;

    for (let game of games)
    {
        let points = 0;

        for (let number of game.numbers)
        {
            if (game.winners.has(number))
            {
                points = Math.max(points * 2, 1);
            }
        }

        sum += points;
    }

    console.log(sum);
}

function part2()
{
    let counts = Array(games.length).fill(1);

    for (let i = 0; i < games.length; i++)
    {
        let game = games[i];
        let count = 0;

        for (let number of game.numbers)
        {
            if (game.winners.has(number))
            {
                count++;
            }
        }

        for (let n = 0; n < count; n++)
        {
            counts[i + n + 1] += counts[i];
        }
    }

    console.log(counts.reduce((a, b) => a + b, 0));
}

part1();
part2();