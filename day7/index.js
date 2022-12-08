let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");
let lines = input.split("\n");

console.log(part1(lines));
console.log(part2(lines));

function part1(lines)
{
    let [ items, directories, files ] = process(lines);

    return directories
        .filter(d => d.size <= 100000)
        .reduce((total, d) => total + d.size, 0);
}

function part2(lines)
{
    let [ items, directories, files ] = process(lines);

    let total = 70000000;
    let target = 30000000;
    let unused = total - directories[0].size;

    return directories
        .filter(d => unused + d.size >= target)
        .reduce((smallest, d) => Math.min(smallest, d.size), Number.MAX_SAFE_INTEGER);
}

function process(lines)
{
    let segments = [ ];

    let items = { 
        "/": {
            children: { },
            name: "",
            parent: null,
            path: "/",
            size: 0,
            type: "directory",
        }
    };

    let directories = [ items["/"] ];
    let files = [ ];

    for (let line of lines)
    {
        if (line.startsWith("$ cd"))
        {
            let name = line.slice(5);
            if (name === "..")
            {
                segments.pop();
            }
            else
            {
                segments.push(name);
            }
        }
        else if (line.startsWith("$ ls"))
        {
            // no-op
        }
        else if (line.startsWith("dir"))
        {
            // Add directory entry.
            let parentKey = segments.join("/");
            let parent = items[parentKey];

            let directoryKey = line.slice(4);

            if (!parent.children[directoryKey])
            {
                let directory = {
                    children: { },
                    name: directoryKey,
                    parent: parent,
                    path: segments.concat(directoryKey).join("/"),
                    size: 0,
                    type: "directory",
                };

                parent.children[directoryKey] = directory;
                items[directory.path] = directory;
                directories.push(directory);
            }
        }
        else
        {
            let parentKey = segments.join("/");
            let parent = items[parentKey];

            let parts = line.split(" ");

            let fileKey = parts.slice(1).join(" ");
            let fileSize = Number(parts[0]);
            
            if (!parent.children[fileKey])
            {
                let file = {
                    name: fileKey,
                    parent: parent,
                    path: segments.concat(fileKey).join("/"),
                    size: fileSize,
                    type: "file",
                };

                parent.children[fileKey] = file;

                while (parent)
                {
                    parent.size += file.size;
                    parent = parent.parent;
                }

                items[file.path] = file;
                
                files.push(file);
            }
        }
    }

    return [ items, directories, files ];
}