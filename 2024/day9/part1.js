let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

// Create disk.
let disk = [ ];

for (let i = 0, id = 0, offset = 0; i < input.length; i++)
{
    let size = Number(input[i]);

    if (i & 1)
    {
        // Odd position: This is empty space.
        offset += size;
    }
    else
    {
        // Even position: This is a block.
        for (let n = 0; n < size; n++)
        {
            disk[offset++] = {
                id: id,
            };
        }

        id++;
    }
}

// Compact disk. Calculate the checksum as we go.
let checksum = 0n;

outer: for (let i = 0, n = disk.length - 1; i < disk.length; i++)
{
    if (disk[i] === undefined)
    {
        // An empty space, find the next available block.
        while (disk[n] === undefined)
        {
            n--;
        }

        if (n <= i)
        {
            // We're done.
            break outer;
        }

        // Move it.
        disk[i] = disk[n];
        disk[n] = undefined;
    }

    checksum += BigInt(i * disk[i].id);
}

console.log("Part 1:", checksum);