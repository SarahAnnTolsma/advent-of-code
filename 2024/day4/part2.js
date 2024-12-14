let fs = require("fs");

let data = fs.readFileSync("input.txt", "utf8");
let rows = data.split("\n");

let cells = rows.map(row => row.split(""));
let locis = new Map();

// Assume each row is the same length.
let height = cells.length;
let width = cells[0].length;

// diagonal, left-to-right, top-to-bottom (\v)
scan(
    "d-ltr-ttb",
    cells,
    locis,
    () => 0,
    () => 0,
    (x, y) => [ x + 1, y + 1 ],
    (x, y) => [
        x + 1 === width ? 0     : x + 1,
        x + 1 === width ? y + 1 : y
    ]);

// diagonal, right-to-left, top-to-bottom (v/)
scan(
    "d-rtl-ttb",
    cells,
    locis,
    () => width - 1,
    () => 0,
    (x, y) => [ x - 1, y + 1 ],
    (x, y) => [
        x === 0 ? width - 1 : x - 1,
        x === 0 ? y + 1     : y
    ]);

// diagonal, right-to-left, bottom-to-top (^\)
scan(
    "d-rtl-btt",
    cells,
    locis,
    () => width - 1,
    () => height - 1,
    (x, y) => [ x - 1, y - 1 ],
    (x, y) => [
        x === 0 ? width - 1 : x - 1,
        x === 0 ? y - 1     : y
    ]);

// diagonal, left-to-right, bottom-to-top (/^)
scan(
    "d-ltr-btt",
    cells,
    locis,
    () => 0,
    () => height - 1,
    (x, y) => [ x + 1, y - 1 ],
    (x, y) => [
        x + 1 === width ? 0     : x + 1,
        x + 1 === width ? y - 1 : y
    ]);

// Count overlaps.
let count = 0;

for (let [ coordinate, intersects ] of locis)
{
    if (intersects > 1)
    {
        count++;
    }
}

console.log("Part 2:", count);

function scan(direction, cells, locis, initialX, initialY, updateInner, updateOuter)
{
    let starts = new Set();

    for (let x = initialX(), 
             y = initialY(); 
             x >= 0 && x < width &&
             y >= 0 && y < height;
             [x, y] = updateOuter(x, y))
    {
        let next = null;
        let from = null;
        let loci = null;

        for (let x2 = x,
                 y2 = y;
                 x2 >= 0 && x2 < width &&
                 y2 >= 0 && y2 < height;
                 [x2, y2] = updateInner(x2, y2))
        {
            if (cells[y2][x2] === "M")
            {
                if (!starts.has(`${y2},${x2}`))
                {
                    // Found a start, look for "A".
                    from = `${y2},${x2}`;
                    loci = null;
                    next = "A";
                }
                else
                {
                    from = null;
                    loci = null;
                    next = null;
                }
            }
            else if (cells[y2][x2] === next)
            {
                // Move to the next letter.
                switch (next)
                {
                    case "A":
                        loci = `${y2},${x2}`;
                        next = "S";
                        break;
                    case "S":
                        starts.add(from);
                        locis.set(loci, (locis.get(loci) ?? 0) + 1);
                        from = null;
                        loci = null;
                        next = null;
                        break;
                }
            }
            else
            {
                // Reset to the start.
                from = null;
                loci = null;
                next = null;
            }
        }
    }
}