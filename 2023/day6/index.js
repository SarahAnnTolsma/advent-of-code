let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");

let times = lines[0]
    .slice("Time:".length)
    .replace(/^\s+/, "")
    .split(/\s+/)
    .map(Number);

let distances = lines[1]
    .slice("Distance:".length)
    .replace(/^\s+/, "")
    .split(/\s+/)
    .map(Number);

function part1()
{
    // Just bruteforce, the numbers are small enough.
    let ways = 1;

    for (let i = 0; i < times.length; i++)
    {
        let time = times[i];
        let dist = distances[i];
        let count = 0;

        for (let n = 1; n < time; n++)
        {
            // Hold the button for `n` ms, which means we travel for `time - n` ms, at `n` mm/ms.
            let speed = n;
            let remaining = time - n;
            let distance = speed * remaining;

            if (distance > dist)
            {
                count++;
            }
        }

        ways *= count;
    }

    console.log(ways);
}

function part2()
{
    // After all.. why not? Why shouldn't I bruteforce?
    let time = Number(times.join(""));
    let dist = Number(distances.join(""));
    let ways = 0;

    for (let n = 1; n < time; n++)
    {
        // Hold the button for `n` ms, which means we travel for `time - n` ms, at `n` mm/ms.
        let speed = n;
        let remaining = time - n;
        let distance = speed * remaining;

        if (distance > dist)
        {
            ways++;
        }
    }

    console.log(ways);
}

part1();
part2();