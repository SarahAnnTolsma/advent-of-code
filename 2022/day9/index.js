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
        state.pos.push(
            {
                x: 0,
                y: 0,
            });
    }

    state.tail.add("0,0");

    for (let line of lines)
    {
        let direction = line[0];
        let count = Number(line.slice(2));

        while (count--)
        {
            switch (direction)
            {
                case "L": state.pos[0].x--; break;
                case "R": state.pos[0].x++; break;
                case "U": state.pos[0].y--; break;
                case "D": state.pos[0].y++; break;
            }

            for (let i = 1; i < knots; i++)
            {
                moveTail(state.pos[i - 1], state.pos[i]);
            }

            state.tail.add(`${state.pos[knots - 1].x},${state.pos[knots - 1].y}`);
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
            if (tail.x < head.x)
            {
                // Move right
                tail.x++;
            }
            else
            {
                // Move left
                tail.x--;
                
            }
        }
        else if (head.x === tail.x)
        {
            // Same column
            if (tail.y < head.y)
            {
                // Move down
                tail.y++;
            }
            else
            {
                // Move up
                tail.y--;
            }
        }
        else
        {
            if (tail.x < head.x && tail.y < head.y)
            {
                // Move _\|
                tail.x++;
                tail.y++;
            }
            else if (tail.x > head.x && tail.y < head.y)
            {
                // Move |/_
                tail.x--;
                tail.y++;
            }
            else if (tail.x < head.x && tail.y > head.y)
            {
                // Move ‾/|
                tail.y--;
                tail.x++;
            }
            else if (tail.x > head.x && tail.y > head.y)
            {
                // Move |\‾
                tail.y--;;
                tail.x--;
            }
        }
    }
}