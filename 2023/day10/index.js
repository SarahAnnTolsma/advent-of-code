let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");

function Pipe(type, x, y)
{
    this.type = type;
    this.x = x;
    this.y = y;
}

Pipe.prototype.exits = function()
{
    
}

// Populate the map.
let map = [ ];

for (let y = 0; y < lines.length; y++)
{
    let row = [ ];
    map.push(row);

    for (let x = 0; x < lines[y].length; x++)
    {
        row[x] = new Pipe(lines[y][x], x, y);
    }
}