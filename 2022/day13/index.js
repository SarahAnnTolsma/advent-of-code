let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");
let inputChunks = input.split("\n\n");

console.log(part1(inputChunks));
console.log(part2(inputChunks));

function part1(chunks)
{
    let count = 0;

    for (let i = 0; i < chunks.length; i++)
    {
        let chunk = chunks[i];

        let [ l, r ] = chunk.split("\n");

        l = JSON.parse(l);
        r = JSON.parse(r);

        if (compare(l, r) === -1)
        {
            count += i;
            count += 1; // Indices are 1-based, because of course.
        }
    }

    return count;
}

function part2(chunks)
{
    let values = [ ];

    for (let chunk of chunks)
    {
        let [ l, r ] = chunk.split("\n");

        values.push(
            JSON.parse(l),
            JSON.parse(r));
    }

    // Add the divider packets
    let div2 = [ [ 2 ] ];
    let div6 = [ [ 6 ] ];

    values.push(div2, div6);

    // Sort the packets and then find the index of the divider packets
    values.sort(compare);

    let index2 = values.findIndex(i => i === div2) + 1;
    let index6 = values.findIndex(i => i === div6) + 1;

    return index2 * index6;
}

function compare(l, r)
{
    if (typeof l === "number" && typeof r === "number")
    {
        // If both values are integers, the lower integer should come first.

        if (l < r)
        {
            // If the left integer is lower than the right integer, the inputs are in the right order.
            return -1;
        }
        else if (l > r)
        {
            // If the left integer is higher than the right integer, the inputs are not in the right order.
            return 1;
        }
        
        // Otherwise, the inputs are the same integer; continue checking the next part of the input.
        return 0;
    }
    else if (Array.isArray(l) && Array.isArray(r))
    {
        // If both values are lists, compare the first value of each list, then the second value, and so on.
        for (let i = 0, len = Math.max(l.length, r.length); i < len; i++)
        {
            if (i >= l.length)
            {
                // If the left list runs out of items first, the inputs are in the right order.
                return -1;
            }

            if (i >= r.length)
            {
                // If the right list runs out of items first, the inputs are not in the right order.
                return 1;
            }

            let comparison = compare(l[i], r[i]);
            if (comparison !== 0)
            {
                return comparison;
            }
        }

        // If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
        return 0;
    }
    else
    {
        // If exactly one value is an integer, convert the integer to a list which contains that integer as its only value,
        // then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2]
        // (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].
        return compare(
            typeof l === "number" ? [ l ] : l,
            typeof r === "number" ? [ r ] : r);
    }
}