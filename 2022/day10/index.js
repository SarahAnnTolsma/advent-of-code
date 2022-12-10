let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");
let lines = input.split("\n");

let cpu = {
    pc: 1,
    x: 1,
    strengths: [ ],
    crt: [
        [ ],
        [ ],
        [ ],
        [ ],
        [ ],
        [ ],
    ]
};

execute(cpu, lines);

console.log(part1(cpu));
console.log(part2(cpu));

function part1(cpu)
{
    return cpu.strengths.reduce((a, b) => a + b, 0);
}

function part2(cpu)
{
    return cpu.crt.map(l => l.join("")).join("\n");
}

function execute(cpu, instructions)
{
    for (let instruction of instructions)
    {
        // Both noop and addx take at least one tick.
        tick(cpu);

        if (instruction !== "noop")
        {
            // The addx instruction takes an additional tick.
            tick(cpu);

            // By the end of the cycle, x will be incremented.
            cpu.x += Number(instruction.slice(5));
        }
    }
}

function tick(cpu)
{
    if (cpu.pc === 20 || cpu.pc % 40 === 20)
    {
        // Make a note of the signal strength at the 20th, and every 40th cycle after.
        cpu.strengths.push(cpu.x * cpu.pc);
    }

    // Determine x/y at which the CRT is drawing
    let x = (cpu.pc - 1) % 40;
    let y = Math.floor((cpu.pc - 1) / 40);

    if (x >= cpu.x - 1 && x <= cpu.x + 1)
    {
        // Pixel is lit.
        cpu.crt[y][x] = "#";
    }
    else
    {
        // Pixel is unlit. Challenge says unlit is ".", but using space makes the text easier to read.
        cpu.crt[y][x] = " ";
    }

    cpu.pc++;
}