let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split(/\n/g);

let sum = 0;

let digits = [ "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
let pattern = new RegExp("(0|1|2|3|4|5|6|7|8|9|" + digits.join("|") + ")", "g");

function map(input)
{
    return input.length > 1 ? digits.indexOf(input) + 1 : Number.parseInt(input, 10);
}

for (let line of lines)
{
    // First digit we can just look forward.
    pattern.lastIndex = 0;
    let match = pattern.exec(line);
    sum += map(match[1]) * 10;

    // Second digit we need to scan backwards.
    for (let i = line.length - 1; i >= 0; i--)
    {
        pattern.lastIndex = i;

        let match = pattern.exec(line);
        if (match)
        {
            sum += map(match[1]);
            break;
        }
    }
}

console.log(sum);