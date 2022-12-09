let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

console.log(part1(input));
console.log(part2(input));

function part1(input)
{
    let rows = input.split("\n");
    let trees = new Set();

    for (let x = 0; x < rows[0].length; x++)
    {
        // Top to bottom
        for (let y = 0, tallest = -1; y < rows.length; y++)
        {
            tallest = add(trees, `${x},${y}`, tallest, Number(rows[y][x]));
        }

        // Bottom to top
        for (let y = rows.length - 1, tallest = -1; y >= 0; y--)
        {
            tallest = add(trees, `${x},${y}`, tallest, Number(rows[y][x]));
        }
    }

    for (let y = 0; y < rows.length; y++)
    {
        // Left to right
        for (let x = 0, tallest = -1; x < rows[y].length; x++)
        {
            tallest = add(trees, `${x},${y}`, tallest, Number(rows[y][x]));
        }

        // Right to left
        for (let x = rows[y].length - 1, tallest = -1; x >= 0; x--)
        {
            tallest = add(trees, `${x},${y}`, tallest, Number(rows[y][x]));
        }
    }

    return trees.size;
}

function part2(input)
{
    let rows = input.split("\n");
    let best = 0;

    for (let x = 0; x < rows[0].length; x++)
    {
        for (let y = 0; y < rows.length; y++)
        {
            let l = 0;
            let r = 0;
            let t = 0;
            let b = 0;

            let height = Number(rows[y][x]);

            // To the left.
            for (let x1 = x - 1; x1 >= 0; x1--)
            {
                l++;

                if (Number(rows[y][x1]) >= height)
                {
                    break;
                }
            }

            // To the right.
            for (let x1 = x + 1; x1 < rows[y].length; x1++)
            {
                r++;

                if (Number(rows[y][x1]) >= height)
                {
                    break;
                }
            }

            // To the top
            for (let y1 = y - 1; y1 >= 0; y1--)
            {
                t++;

                if (Number(rows[y1][x]) >= height)
                {
                    break;
                }
            }

            // To the bottom
            for (let y1 = y + 1; y1 < rows.length; y1++)
            {
                b++;

                if (Number(rows[y1][x]) >= height)
                {
                    break;
                }
            }

            best = Math.max(best, l * r * t * b);
        }
    }

    return best;
}

function add(trees, coordinate, tallest, height)
{
    if (height > tallest)
    {
        if (!trees.has(coordinate))
        {
            trees.add(coordinate);
        }
    }

    return Math.max(tallest, height);
}