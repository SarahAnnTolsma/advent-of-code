let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split(/\n/g);

let max = {
    red: 12,
    green: 13,
    blue: 14,
};

let ids = 0;
let powers = 0;

for (let line of lines)
{
    let [ rawId, rawSets ] = line.split(": ");

    let id = Number(rawId.slice(5));
    let sets = rawSets.split(/; /g);
    let possible = true;

    let min = {
        red: 0,
        green: 0,
        blue: 0,
    };

    for (let set of sets)
    {
        for (let color of set.split(/, /g))
        {
            let [ rawCount, name ] = color.split(" ");

            let count = Number(rawCount);
            if (count > max[name])
            {
                possible = false;
            }

            min[name] = Math.max(min[name], count);
        }
    }

    if (possible)
    {
        ids += id;
    }

    powers += min.red * min.green * min.blue;
}

console.log(ids);
console.log(powers);