let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");

let grid = [ ];

function Part(value)
{
    this.value = value;
}

function isGear(x, y)
{
    return x >= 0 &&
           y >= 0 &&
           grid[y][x] === "*";
}

function isPart(x, y)
{
    return x >= 0 &&
           y >= 0 &&
           grid[y][x] instanceof Part;
}

function isSymbol(x, y)
{
    return x >= 0 &&
           y >= 0 &&
           typeof grid[y][x] === "string" &&
           grid[y][x] !== ".";
}

function add(set, x, y)
{
    if (isPart(x, y))
    {
        let cell = grid[y][x];

        if (!set.has(cell))
        {
            set.add(cell);
            return true;
        }
    }

    return false;
}

// Convert the input into a useful grid.
for (let y = 0; y < lines.length; y++)
{
    let line = lines[y];
    let part = null;

    grid.push([ ]);

    for (let x = 0; x < line.length; x++)
    {
        let c = line.charAt(x);
        if (c >= "0" && c <= "9")
        {
            if (!part)
            {
                part = new Part(0);
            }

            grid[y][x] = part;

            part.value *= 10;
            part.value += Number.parseInt(c, 10);
        }
        else
        {
            grid[y][x] = c;
            part = null;
        }
    }
}

function part1()
{
    // Scan the grid to find parts next to symbols.
    let counted = new Set();

    for (let y = 0; y < grid.length; y++)
    {
        for (let x = 0; x < grid[y].length; x++)
        {
            if (isSymbol(x, y))
            {
                add(counted, x - 1, y - 1); // nw
                add(counted, x    , y - 1); // n
                add(counted, x + 1, y - 1); // ne
                add(counted, x - 1, y    ); // w
                add(counted, x + 1, y    ); // e
                add(counted, x - 1, y + 1); // sw
                add(counted, x    , y + 1); // s
                add(counted, x + 1, y + 1); // se
            }
        }
    }

    // Add up all the part numbers.
    let sum = 0;

    for (let part of counted)
    {
        sum += part.value;
    }

    console.log(sum);
}

function part2()
{
    let sum = 0;

    for (let y = 0; y < grid.length; y++)
    {
        for (let x = 0; x < grid[y].length; x++)
        {
            if (isGear(x, y))
            {
                // Add the surrounding parts.
                let counted = new Set();

                add(counted, x - 1, y - 1); // nw
                add(counted, x    , y - 1); // n
                add(counted, x + 1, y - 1); // ne
                add(counted, x - 1, y    ); // w
                add(counted, x + 1, y    ); // e
                add(counted, x - 1, y + 1); // sw
                add(counted, x    , y + 1); // s
                add(counted, x + 1, y + 1); // se

                if (counted.size === 2)
                {
                    // Next to exactly two parts.
                    let parts = Array.from(counted);
                    sum += parts[0].value * parts[1].value;
                }
            }
        }
    }

    console.log(sum);
}

part1();
part2();