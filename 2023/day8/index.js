let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");

function Node(id, left, right)
{
    this.end = id[2] === "Z";
    this.start = id[2] === "A";

    this.id = id;

    this.L = left;
    this.R = right;
}

// Get instructions
let instructions = lines.shift().split("");

// Remove empty line.
lines.shift();

let nodes = { };

for (let line of lines)
{
    let matches = line.match(/^(...) = \((...), (...)\)$/);
    let id = matches[1];
    let left = matches[2];
    let right = matches[3];

    nodes[id] = new Node(id, left, right);
}

function part1()
{
    let current = nodes["AAA"];
    let index = 0;
    let steps = 0;

    while (current.id !== "ZZZ")
    {
        if (index >= instructions.length)
        {
            index = 0;
        }

        let instruction = instructions[index];

        current = nodes[current[instruction]];

        index++;
        steps++;
    }

    console.log(steps);
}

function part2()
{
    let current = [ ];

    for (let id in nodes)
    {
        let node = nodes[id];
        if (node.start)
        {
            current.push(node);
        }
    }

    let index = 0;
    let steps = 0;
    let ended = false;

    while (!ended)
    {
        ended = true;

        let instruction = instructions[index];

        for (let i = 0; i < current.length; i++)
        {
            let node = current[i];
            node = current[i] = nodes[node[instruction]];
            ended &&= node.end;
        }

        index = (index + 1) % instructions.length;
        steps++;
    }

    console.log(steps);
}

part1();
part2();