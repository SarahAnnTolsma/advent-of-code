let fs = require("fs");

let data = fs.readFileSync("input.txt", "utf8");
let rows = data.split("\n");

let cells = rows.map(row => row.split(""));
let count = 0;

// Assume each row is the same length.
let height = cells.length;
let width = cells[0].length;

// left-to-right (-->)
count += scan(
    "ltr",
    cells,
    () => 0,
    () => 0,
    (x, y) => [ x + 1, y ],
    (x, y) => [ 0, y + 1 ]);

// right-to-left (<--)
count += scan(
    "rtl",
    cells,
    () => width - 1,
    () => 0,
    (x, y) => [ x - 1, y ],
    (x, y) => [ width - 1, y + 1 ]);

// top-to-bottom (v)
count += scan(
    "ttb",
    cells,
    () => 0,
    () => 0,
    (x, y) => [ x, y + 1 ],
    (x, y) => [ x + 1, 0 ]
)

// bottom-to-top (^)
count += scan(
    "btt",
    cells,
    () => 0,
    () => height - 1,
    (x, y) => [ x, y - 1 ],
    (x, y) => [ x + 1, height - 1 ]);

// diagonal, left-to-right, top-to-bottom (\v)
count += scan(
    "d-ltr-ttb",
    cells,
    () => 0,
    () => 0,
    (x, y) => [ x + 1, y + 1 ],
    (x, y) => [
        x + 1 === width ? 0     : x + 1,
        x + 1 === width ? y + 1 : y
    ]);

// diagonal, right-to-left, top-to-bottom (v/)
count += scan(
    "d-rtl-ttb",
    cells,
    () => width - 1,
    () => 0,
    (x, y) => [ x - 1, y + 1 ],
    (x, y) => [
        x === 0 ? width - 1 : x - 1,
        x === 0 ? y + 1     : y
    ]);

// diagonal, right-to-left, bottom-to-top (^\)
count += scan(
    "d-rtl-btt",
    cells,
    () => width - 1,
    () => height - 1,
    (x, y) => [ x - 1, y - 1 ],
    (x, y) => [
        x === 0 ? width - 1 : x - 1,
        x === 0 ? y - 1     : y
    ]);

// diagonal, left-to-right, bottom-to-top (/^)
count += scan(
    "d-ltr-btt",
    cells,
    () => 0,
    () => height - 1,
    (x, y) => [ x + 1, y - 1 ],
    (x, y) => [
        x + 1 === width ? 0     : x + 1,
        x + 1 === width ? y - 1 : y
    ]);

console.log("Part 1:", count);

function scan(direction, cells, initialX, initialY, updateInner, updateOuter)
{
    let count = 0;
    let starts = new Set();

    for (let x = initialX(), 
             y = initialY(); 
             x >= 0 && x < width &&
             y >= 0 && y < height;
             [x, y] = updateOuter(x, y))
    {
        let next = null;
        let from  = null;

        for (let x2 = x,
                 y2 = y;
                 x2 >= 0 && x2 < width &&
                 y2 >= 0 && y2 < height;
                 [x2, y2] = updateInner(x2, y2))
        {
            if (cells[y2][x2] === "X")
            {
                if (!starts.has(`${y2},${x2}`))
                {
                    // Found a start, look for "M".
                    next = "M";
                    from = `${y2},${x2}`;
                }
                else
                {
                    next = null;
                    from = null;
                }
            }
            else if (cells[y2][x2] === next)
            {
                // Move to the next letter.
                switch (next)
                {
                    case "M": next = "A"; break;
                    case "A": next = "S"; break;
                    case "S":
                        count++;
                        starts.add(from);
                        next = null;
                        from = null;
                        break;
                }
            }
            else
            {
                // Reset to the start.
                next = null;
                from = null;
            }
        }
    }

    return count;
}