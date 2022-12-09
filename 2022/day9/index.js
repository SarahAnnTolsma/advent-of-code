let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");
let lines = input.split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines)
{
    return move(lines, 2);
}

function part2(lines)
{
    return move(lines, 10);
}

function move(lines, knots)
{
    let state = {
        pos: [ ],
        tail: new Set(),
    };

    for (let i = 0; i < knots; i++)
    {
        state.pos.push({ x: 0, y: 0, });
    }

    state.tail.add("0,0");

    let head = state.pos[0];
    let tail = state.pos[knots - 1];

    for (let line of lines)
    {
        let direction = line[0];
        let count = Number(line.slice(2));

        while (count--)
        {
            switch (direction)
            {
                case "L": head.x--; break;
                case "R": head.x++; break;
                case "U": head.y--; break;
                case "D": head.y++; break;
            }

            for (let i = 1; i < knots; i++)
            {
                moveTail(state.pos[i - 1], state.pos[i]);
            }

            state.tail.add(`${tail.x},${tail.y}`);
        }
    }

    return state.tail.size;
}

function moveTail(head, tail)
{
    let dx = Math.abs(head.x - tail.x);
    let dy = Math.abs(head.y - tail.y);

    if (dx > 1 || dy > 1)
    {
        if (head.y === tail.y)
        {
            // Same row
            tail.x = tail.x < head.x ?
                tail.x + 1 :
                tail.x - 1;
        }
        else if (head.x === tail.x)
        {
            // Same column
            tail.y = tail.y < head.y ?
                tail.y + 1 :
                tail.y - 1;
        }
        else
        {
            // Diagonal
            tail.x = tail.x < head.x ?
                tail.x + 1 :
                tail.x - 1;

            tail.y = tail.y < head.y ?
                tail.y + 1 :
                tail.y - 1;
        }
    }
}