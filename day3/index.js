let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");
let lines = input.split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines)
{
    let sum = 0;

    for (let line of lines)
    {
        let a = new Set(line.slice(0, line.length / 2).split(""));
        let b = new Set(line.slice(line.length / 2).split(""));

        for (let char of a)
        {
            if (b.has(char))
            {
                if (char >= 'a')
                {
                    sum += char.charCodeAt(0) - 96;
                }
                else
                {
                    sum += (char.charCodeAt(0) - 64) + 26;
                }

                break;
            }
        }
    }

    return sum;
}

function part2(lines)
{
    let sum = 0;

    for (let i = 0; i < lines.length; i += 3)
    {
        let a = new Set(lines[i].split(""));
        let b = new Set(lines[i + 1].split(""));
        let c = new Set(lines[i + 2].split(""));

        for (let char of a)
        {
            if (b.has(char) && c.has(char))
            {
                if (char >= 'a')
                {
                    sum += char.charCodeAt(0) - 96;
                }
                else
                {
                    sum += (char.charCodeAt(0) - 64) + 26;
                }

                break;
            }
        }
    }

    return sum;
}