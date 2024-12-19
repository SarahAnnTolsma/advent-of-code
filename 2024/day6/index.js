let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

let map = input.split("\n").map(row => row.split(""));

// Find initial position of guard.
let y = 0;
let x = 0;
let direction;

outer: for (y = 0; y < map.length; y++)
{
    for (x = 0; x < map[y].length; x++)
    {
        if (isGuard(map[y][x]))
        {
            direction = toDirection(map[y][x]);
            break outer;
        }
    }
}

let occupied = walk(direction, x, y);

console.log("Part 1:", occupied);

let loops = walkLoops(direction, x, y);

console.log("Part 2:", loops);

function isGuard(x)
{
    return x === "^" ||
           x === "v" ||
           x === ">" ||
           x === "<";
}

function move(guard, x, y)
{
    switch (guard)
    {
        case 1: return [ x, y - 1 ]; // ^
        case 2: return [ x + 1, y ]; // >
        case 3: return [ x, y + 1 ]; // v
        case 4: return [ x - 1, y ]; // <
    }
}

function rotate(guard)
{
    switch (guard)
    {
        case 1: return 2; // ^ >
        case 2: return 3; // > v
        case 3: return 4; // v <
        case 4: return 1; // < ^
    }
}

function toDirection(guard)
{
    switch (guard)
    {
        case "^": return 1;
        case ">": return 2;
        case "v": return 3;
        case "<": return 4;
    }
}

function walk(direction, x, y)
{
    // Walk until we can walk no more.
    let occupied = new Set();

    while (true)
    {
        // Include the currently occupied space.
        occupied.add(x << 16 | y);

        let [ nx, ny ] = move(direction, x, y);

        if (nx < 0 || ny < 0 || ny >= map.length || nx >= map[ny].length)
        {
            // We're moving out of bounds.
            break;
        }
        else if (map[ny][nx] === "#")
        {
            // Obstruction up ahead -- rotate.
            direction = rotate(direction);
        }
        else
        {
            // Move to the new position.
            x = nx;
            y = ny;
        }
    }

    return occupied.size;
}

function walkLoops(direction, x, y)
{
    let loops = new Set();

    // Walk until we can walk no more.
    while (true)
    {
        let [ nx, ny ] = move(direction, x, y);

        if (nx < 0 || ny < 0 || ny >= map.length || nx >= map[ny].length)
        {
            // We've moved out of bounds.
            break;
        }
        else if (map[ny][nx] === "#")
        {
            // Obstruction ahead -- rotate.
            direction = rotate(direction);
        }
        else
        {
            let id = nx << 16 | y;

            if (!loops.has(id))
            {
                // Before committing to the new position, what would have happened if the space _had_ been an obstacle?
                map[ny][nx] = "#";

                if (walkLoop(rotate(direction), x, y))
                {
                    // Found a spot to create a loop.
                    loops.add(id);
                }

                map[ny][nx] = ".";
            }

            // Move to the new position.
            x = nx;
            y = ny;
        }
    }

    return loops.size;
}

function walkLoop(direction, x, y)
{
    let turns = 0;

    let sd = direction;
    let sx = x;
    let sy = y;

    let first = true;

    // Walk until we can walk no more.
    while (true)
    {
        // If the current direction and position are part of the trail then we know we've created a loop.
        if (!first && direction === sd && x === sx && y === sy)
        {
            return true;
        }

        first = false;

        let [ nx, ny ] = move(direction, x, y);

        if (nx < 0 || ny < 0 || ny >= map.length || nx >= map[ny].length)
        {
            // We've moved out of bounds.
            return false;
        }
        else if (map[ny][nx] === "#")
        {
            // Obstruction ahead -- rotate.
            direction = rotate(direction);

            if (++turns === 5)
            {
                return false;
            }
        }
        else
        {
            // Move to the new position.
            x = nx;
            y = ny;
        }
    }
}