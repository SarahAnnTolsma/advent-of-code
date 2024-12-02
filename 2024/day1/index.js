let fs = require("fs");

let data = fs.readFileSync("input.txt", "utf8");

let a = [ ];
let b = [ ];

let lines = data.split("\n");

for (let line of lines)
{
    let [ x, y ] = line.split("   ");
    
    a.push(x);
    b.push(y);
}

a.sort((x, y) => x - y);
b.sort((x, y) => x - y);

let distances = [ ];

for (let i = 0; i < a.length; i++)
{
    distances.push(Math.abs(a[i] - b[i]));
}

console.log("Part 1:", distances.reduce((x, y) => x + y, 0));

let counts = new Map();

for (let x of b)
{
    counts.set(x, (counts.get(x) ?? 0) + 1);
}

let similarities = [ ];

for (let x of a)
{
    similarities.push(x * (counts.get(x) ?? 0));
}

console.log("Part 2:", similarities.reduce((x, y) => x + y, 0));