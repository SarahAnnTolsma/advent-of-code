let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

let [stackText, instructionsText] = input.split("\n\n");

let stacks = [ ];
let stackLines = stackText.split("\n");

for (let i = 0; i < stackLines.length - 1; i++)
{
    let line = stackLines[i];

    for (let k = 0, n = 0; k < line.length; k += 4, n++)
    {
        let box = line.charAt(k + 1);
        if (box !== " ")
        {
            let stack = stacks[n] || [ ];
            stack.unshift(box);
            stacks[n] = stack;
        }
    }
}

let instructions = instructionsText.split("\n");

console.log(part1(stacks, instructions));
console.log(part2(stacks, instructions));

function part1(stacks, instructions)
{
    stacks = JSON.parse(JSON.stringify(stacks));

    for (let instruction of instructions)
    {
        let matches = instruction.match(/^move (\d+) from (\d+) to (\d+)$/);

        let count = Number(matches[1]);
        let src = Number(matches[2]) - 1;
        let dst = Number(matches[3]) - 1;

        let stackSrc = stacks[src];
        let stackDst = stacks[dst];

        for (let i = 0; i < count; i++)
        {
            stackDst.push(stackSrc.pop());
        }
    }

    let tops = "";

    for (let stack of stacks)
    {
        tops += stack[stack.length - 1];
    }

    return tops;
}

function part2(stacks, instructions)
{
    stacks = JSON.parse(JSON.stringify(stacks));

    for (let instruction of instructions)
    {
        let matches = instruction.match(/^move (\d+) from (\d+) to (\d+)$/);

        let count = Number(matches[1]);
        let src = Number(matches[2]) - 1;
        let dst = Number(matches[3]) - 1;

        let stackSrc = stacks[src];
        let stackDst = stacks[dst];

        stackDst.push(...stackSrc.splice(stackSrc.length - count, count));
    }

    let tops = "";

    for (let stack of stacks)
    {
        tops += stack[stack.length - 1];
    }

    return tops;
}