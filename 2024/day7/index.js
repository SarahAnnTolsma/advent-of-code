let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");
let lines = input.split("\n");

let part1 = 0n;
let part2 = 0n;

for (let line of lines)
{
    let [ answer, inputs ] = line.split(": ");

    answer = BigInt(answer);
    inputs = inputs.split(" ").map(n => BigInt(n));

    if (evaluate1(answer, [ ...inputs ]))
    {
        part1 += answer;
    }

    if (evaluate2(answer, [ ...inputs ]))
    {
        part2 += answer;
    }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);

function evaluate1(answer, numbers)
{
    let a = numbers.shift();
    let b = numbers.shift();

    if (numbers.length > 0)
    {
        // Recurse until we find an answer.
        return evaluate1(answer, [ a + b, ...numbers ]) ||
               evaluate1(answer, [ a * b, ...numbers ]);
    }
    else
    {
        return a + b === answer ||
               a * b === answer;
    }
}

function evaluate2(answer, numbers)
{
    let a = numbers.shift();
    let b = numbers.shift();

    if (numbers.length > 0)
    {
        // Recurse until we find an answer.
        return evaluate2(answer, [ a + b             , ...numbers ]) ||
               evaluate2(answer, [ a * b             , ...numbers ]) ||
               evaluate2(answer, [ BigInt(`${a}${b}`), ...numbers ]);
    }
    else
    {
        return a + b === answer ||
               a * b === answer ||
               BigInt(`${a}${b}`) === answer;
    }
}