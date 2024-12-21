let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

let map = input.split("\n").map(n => n.split("").map(o => Number(o)));

let part1 = 0;
let part2 = 0;

for (let y = 0; y < map.length; y++)
{
    for (let x = 0; x < map[y].length; x++)
    {
        if (map[y][x] === 0)
        {
            let [ scoreUnique, scoreTotal ] = walk(map, x, y, 1, new Set());

            part1 += scoreUnique;
            part2 += scoreTotal;
        }
    }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);

function walk(map, x, y, next, seen)
{
    if (next === 10)
    {
        let id = x << 16 | y;

        if (!seen.has(id))
        {
            // Found the end of the path.
            seen.add(id);
            return [ 1, 1 ];
        }

        return [ 0, 1 ];
    }

    let scoreUnique = 0;
    let scoreTotal = 0;

    if (y > 0 && map[y - 1][x] === next)
    {
        let score = walk(map, x, y - 1, next + 1, seen);
        scoreUnique += score[0];
        scoreTotal += score[1];
    }

    if (x > 0 && map[y][x - 1] === next)
    {
        let score = walk(map, x - 1, y, next + 1, seen);

        scoreUnique += score[0];
        scoreTotal += score[1];
    }

    if (x + 1 < map[y].length && map[y][x + 1] === next)
    {
        let score = walk(map, x + 1, y, next + 1, seen);

        scoreUnique += score[0];
        scoreTotal += score[1];
    }

    if (y + 1 < map.length && map[y + 1][x] === next)
    {
        let score = walk(map, x, y + 1, next + 1, seen);

        scoreUnique += score[0];
        scoreTotal += score[1];
    }

    return [ scoreUnique, scoreTotal ];
}