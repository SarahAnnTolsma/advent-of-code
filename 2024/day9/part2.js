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
                size: size,
                start: n === 0,
            };
        }

        id++;
    }
}

// Compact disk
let compacted = new Set();

for (let i = disk.length - 1; i >= 0; i--)
{
    let block = disk[i];
    if (block && block.start && !compacted.has(block.id))
    {
        // Find a gap to fit it.
        let size = 0;

        for (let n = 0, o = 0; n < disk.length && n < i; n++)
        {
            if (disk[n])
            {
                // There's a block.
                size = 0;
                o = n + 1;
            }
            else if (++size === block.size)
            {
                // We can fit the block here.
                let blocks = disk.splice(i, size, ...new Array(size));
                disk.splice(o, size, ...blocks);
                compacted.add(block.id);
                break;
            }
        }
    }
}

// Compute checksum
let checksum = 0n;

for (let i = 0; i < disk.length; i++)
{
    let block = disk[i];
    if (block)
    {
        checksum += BigInt(block.id * i);
    }
}

console.log("Part 2:", checksum);