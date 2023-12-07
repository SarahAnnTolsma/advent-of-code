let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");

function Range(dst, src, length)
{
    this.dst = dst;
    this.length = length;
    this.src = src;
}

// Parse the input. Sigh.
let seeds = [ ];
let maps = [ ];

for (let i = 0; i < lines.length; i++)
{
    let line = lines[i];
    if (line.startsWith("seeds: "))
    {
        // Seeds are on the same line.
        seeds.push(
            ...line
                .slice("seeds: ".length)
                .split(" ")
                .map(Number));
    }
    else if (line.endsWith(" map:"))
    {
        let ranges = [ ];

        for (i++; i < lines.length; i++)
        {
            if (lines[i].length === 0)
            {
                // No more ranges.
                break;
            }

            let range = lines[i].split(" ");

            ranges.push(
                new Range(
                    Number(range[0]),
                    Number(range[1]),
                    Number(range[2])));
        }

        maps.push(ranges);
    }
}

function part1()
{
    let location = Number(-1);

    for (let seed of seeds)
    {
        let mapped = seed;

        for (let ranges of maps)
        {
            for (let range of ranges)
            {
                if (mapped >= range.src &&
                    mapped < range.src + range.length)
                {
                    // Found a corresponding mapped value.
                    mapped = range.dst + (mapped - range.src);
                    break;
                }
            }
        }

        if (location === -1 || location > mapped)
        {
            location = mapped;
        }
    }

    console.log(location);
}

function part2()
{
    let location = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < seeds.length; i += 2)
    {
        for (let n = 0, count = seeds[i + 1]; n < count; n++)
        {
            let mapped = seeds[i] + n;

            for (let k = 0; k < maps.length; k++)
            {
                let ranges = maps[k];

                for (let p = 0; p < ranges.length; p++)
                {
                    let range = ranges[p];

                    if (mapped >= range.src &&
                        mapped < range.src + range.length)
                    {
                        // Found a corresponding mapped value.
                        mapped = range.dst + (mapped - range.src);
                        break;
                    }
                }
            }

            if (location > mapped)
            {
                location = mapped;
            }
        }
    }

    console.log(location);
}

part1();
part2();