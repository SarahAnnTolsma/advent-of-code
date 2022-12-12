let fs = require("fs");
let Graph = require("node-dijkstra");

let input = fs.readFileSync("input.txt", "utf8");
let [ graph, start, end, starters ] = getGraph(input);

console.log(part1(graph, start, end));
console.log(part2(graph, starters, end));

function part1(graph, start, end)
{
    return graph.path(start, end).length - 1;
}

function part2(graph, starters, end)
{
    let shortest = Number.MAX_SAFE_INTEGER;

    for (let starter of starters)
    {
        let path = graph.path(starter, end);
        if (path)
        {
            shortest = Math.min(shortest, path.length - 1);
        }
    }

    return shortest;
}

function getGraph(input)
{
    let rows = input.split("\n");

    // Build a list of all the nodes.
    let graph = new Graph();
    let start = null;
    let starters = [ ];
    let end = null;

    for (let y = 0; y < rows.length; y++)
    {
        let row = rows[y];

        for (let x = 0; x < row.length; x++)
        {
            let neighbors = { };

            if (y > 0 && canVisit(row[x], rows[y - 1][x]))
            {
                // Up
                neighbors[`${x},${y - 1}`] = 1;
            }

            if (y + 1 < rows.length && canVisit(row[x], rows[y + 1][x]))
            {
                // Down
                neighbors[`${x},${y + 1}`] = 1;
            }

            if (x > 0 && canVisit(row[x], row[x - 1]))
            {
                // Left
                neighbors[`${x - 1},${y}`] = 1;
            }

            if (x + 1 < row.length && canVisit(row[x], row[x + 1]))
            {
                neighbors[`${x + 1},${y}`] = 1;
            }

            graph.addNode(`${x},${y}`, neighbors);

            let char = row[x];
            if (char === "E")
            {
                end = `${x},${y}`;
            }
            else if (char === "S")
            {
                start = `${x},${y}`;
                starters.push(`${x},${y}`);
            }
            else if (char === "a")
            {
                starters.push(`${x},${y}`);
            }
        }
    }

    return [ graph, start, end, starters ];
}

function canVisit(src, dst)
{
    switch (src)
    {
        case "S": src = "a"; break;
        case "E": src = "z"; break;
    }
    
    switch (dst)
    {
        case "S": dst = "a"; break;
        case "E": dst = "z"; break;
    }

    return src.charCodeAt(0) + 1 >= dst.charCodeAt(0);
}