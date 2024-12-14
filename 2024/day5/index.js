let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

let [ rules, updates ] = input.split("\n\n");

rules = rules.split("\n");

// Parse the rules
let ruleset = new Map();

for (let rule of rules)
{
    let [ a, b ] = rule.split("|");
    let set = ruleset.get(a) ?? new Set();
    set.add(b);
    ruleset.set(a, set);
}

// Sort the updates
updates = updates.split("\n");

let part1 = 0;
let part2 = 0;

for (let pages of updates)
{
    let sorted = sort(pages);
    if (sorted.join(",") === pages)
    {
        part1 += Number(sorted[(sorted.length / 2) | 0]);
    }
    else
    {
        part2 += Number(sorted[(sorted.length / 2) | 0]);
    }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);

function sort(pages)
{
    return pages.split(",").toSorted(
        (a, b) =>
        {
            let set = ruleset.get(a);
            if (set && set.has(b))
            {
                // a must appear before b
                return -1;
            }

            set = ruleset.get(b);

            if (set && set.has(a))
            {
                // b must appear before a
                return 1;
            }

            // If no rule, assume pages are "equal".
            return 0;
        });
}