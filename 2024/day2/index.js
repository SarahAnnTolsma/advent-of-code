let fs = require("fs");

let data = fs.readFileSync("input.txt", "utf8");
let reports = data.split("\n");

let safe = 0;

outer: for (let report of reports)
{
    let levels = report.split(" ").map(n => Number(n));

    let asc = levels.toSorted((x, y) => x - y);
    if (asc.join(" ") === report)
    {
        for (let i = 0; i + 1 < asc.length; i++)
        {
            let diff = asc[i + 1] - asc[i];
            if (diff === 0 || diff > 3)
            {
                continue outer;
            }
        }

        safe++;

        continue;
    }

    let desc = levels.toSorted((x, y) => y - x);
    if (desc.join(" ") === report)
    {
        for (let i = 0; i + 1 < desc.length; i++)
        {
            let diff = desc[i] - desc[i + 1];
            if (diff === 0 || diff > 3)
            {
                continue outer;
            }
        }

        safe++;

        continue;
    }
}

console.log("Part 1:", safe);

safe = 0;

outer: for (let report of reports)
{
    let levelsOriginal = report.split(" ").map(n => Number(n));

    inner: for (let n = -1; n < levelsOriginal.length; n++)
    {
        let levels = levelsOriginal;

        if (n >= 0)
        {
            levels = levels.slice();
            levels.splice(n, 1);
            report = levels.join(" ");
        }

        let asc = levels.toSorted((x, y) => x - y);
        if (asc.join(" ") === report)
        {
            for (let i = 0; i + 1 < asc.length; i++)
            {
                let diff = asc[i + 1] - asc[i];
                if (diff === 0 || diff > 3)
                {
                    continue inner;
                }
            }

            safe++;

            continue outer;
        }

        let desc = levels.toSorted((x, y) => y - x);
        if (desc.join(" ") === report)
        {
            for (let i = 0; i + 1 < desc.length; i++)
            {
                let diff = desc[i] - desc[i + 1];
                if (diff === 0 || diff > 3)
                {
                    continue inner;
                }
            }

            safe++;

            continue outer;
        }
    }
}

console.log("Part 2:", safe);