let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

console.log(part1(input));
console.log(part2(input));

function part1(input)
{
    // Start dropping sand.
    let grid = build(input);
    let count = 0; 

    while (drop(grid))
    {
        count++;
    }

    return count;
}

function part2(input)
{
    let grid = build(input);

    // Add an "infinite" floor
    let floor = [ ];
    let floorGap = [ ];

    for (let x = 0; x < grid[0].length; x++)
    {
        floor[x] = "#";
        floorGap[x] = ".";
    }

    grid.push(floorGap, floor);

    // Start dropping sand.
    // Start counting 1 because drop() returns false for the last bit of sand and I'm too lazy to fix that.
    let count = 1; 

    while (drop(grid))
    {
        count++;
    }

    return count;
}

function build(input)
{
    let paths = input.split("\n");

    // Get the dimensions of the grid.
    let h = 0;
    let w = 0;

    let segments = [ ];

    for (let path of paths)
    {
        let points = path.split(" -> ");
        let segment = segments[segments.length] = [ ];

        for (let point of points)
        {
            let coordinates = point.split(",");

            let x = Number(coordinates[0]);
            let y = Number(coordinates[1]);

            h = Math.max(h, y);
            w = Math.max(w, x);

            segment.push({ x: x, y: y });
        }
    }

    // The floor is "infinitely" wide.
    w *= 2;

    // Build the actual grid.
    let grid = [ ];

    for (let y = 0; y <= h; y++)
    {
        grid[y] = ".".repeat(w).split("");
    }

    for (let segment of segments)
    {
        let srcX = segment[0].x;
        let srcY = segment[0].y;

        for (let i = 1; i < segment.length; i++)
        {
            let dstX = segment[i].x;
            let dstY = segment[i].y;

            if (srcY !== dstY)
            {
                // Vertical line.
                let y1 = Math.min(srcY, dstY);
                let y2 = Math.max(srcY, dstY);

                for (let y = y1; y <= y2; y++)
                {
                    grid[y][srcX] = "#";
                }
            }
            else
            {
                // Horizontal line.
                let x1 = Math.min(srcX, dstX);
                let x2 = Math.max(srcX, dstX);

                for (let x = x1; x <= x2; x++)
                {
                    grid[srcY][x] = "#";
                }
            }

            srcX = dstX;
            srcY = dstY;
        }
    }

    return grid;
}

function drop(grid)
{
    let x = 500;
    let y = 0;

    while (y + 1 < grid.length)
    {
        // Is there something at the destination already?
        if (grid[y + 1][x] !== ".")
        {
            if (x > 0 && grid[y + 1][x - 1] === ".")
            {
                // We can drop it to the left
                x--;
            }
            else if (x + 1 < grid[y + 1].length && grid[y + 1][x + 1] === ".")
            {
                // We can drop it to the right.
                x++;
            }
            else
            {
                // We can't drop it any further.
                grid[y][x] = "o";

                return !(y === 0 && x === 500);
            }
        }
        
        // Keep going.
        y++;
    }

    return false;
}