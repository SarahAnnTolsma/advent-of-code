let fs = require("fs");

let program = fs.readFileSync("input.txt", "utf8");

let multiplications = program.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);

let sum1 = 0;
let sum2 = 0;

let disabled = false;

for (let multiplication of multiplications)
{
    if (multiplication === "don't()")
    {
        disabled = true;
    }
    else if (multiplication === "do()")
    {
        disabled = false;
    }
    else
    {
        let numbers = multiplication.slice(4, -1).split(",").map(n => Number(n));

        sum1 += numbers[0] * numbers[1];

        if (!disabled)
        {
            sum2 += numbers[0] * numbers[1];
        }
    }
}

console.log("Part 1:", sum1);
console.log("Part 2:", sum2);