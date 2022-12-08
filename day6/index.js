let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

// for(var a=4,b=-1;a<input.length&&b>=0;a++)new Set(input.slice(i-4,i)).size==0&&return i;


console.log(part1(input));
console.log(part2(input));

function part1(input)
{
    let i=4;for(;new Set(input.slice(i-4,i)).size<4;i++);return i;
    /*
    for (let i = 4; i < input.length; i++)
    {
        let chars = new Set(input.slice(i - 4, i).split(""));
        if (chars.size === 4)
        {
            return i;
        }
    }

    return -1;*/
}


function part2(input)
{
    for (let i = 14; i < input.length; i++)
    {
        let chars = new Set(input.slice(i - 14, i).split(""));
        if (chars.size === 14)
        {
            return i;
        }
    }

    return -1;
}
