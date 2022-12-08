let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");
let lines = input.split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines)
{
    let count = 0;

    for (let line of lines)
    {
        let [ group1, group2 ] = line.split(",");

        let [ a, b ] = group1.split("-").map(x => Number(x));
        let [ c, d ] = group2.split("-").map(x => Number(x));

        if ((c >= a && d <= b) || (a >= c && b <= d))
        {
            count++;
        }
    }

    return count;
}

function part2(lines)
{
    let count = 0;

    for (let line of lines)
    {
        let [ group1, group2 ] = line.split(",");

        let [ a, b ] = group1.split("-").map(x => Number(x));
        let [ c, d ] = group2.split("-").map(x => Number(x));

        if ((c >= a && c <= b) ||
            (d >= a && d <= b) ||
            (a >= c && a <= d) ||
            (b >= c && b <= d))
        {
            count++;
        }
    }

    return count;
}