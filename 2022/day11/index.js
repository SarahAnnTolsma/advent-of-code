let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8");

console.log(part1(input));
console.log(part2(input));

function part1(input)
{
    let monkies = parse(input);

    for (let i = 0; i < 20; i++)
    {
        round(monkies, true);
    }

    monkies.sort((a, b) => b.handled - a.handled);

    return monkies[0].handled * monkies[1].handled;
}

function part2(input)
{
    let monkies = parse(input);

    // Compute value to modulo with.
    let modulo = monkies.reduce((a, monkey) => a * monkey.test, 1);

    for (let i = 0; i < 10000; i++)
    {
        round(monkies, modulo);
    }

    monkies.sort((a, b) => b.handled - a.handled);

    return monkies[0].handled * monkies[1].handled;
}

function round(monkies, reduceWorry)
{
    for (let monkey of monkies)
    {
        while (monkey.items.length > 0)
        {
            let item = monkey.items.shift();
            
            // Worry level goes up as monkey inspects the item.
            item = monkey.operation(item);

            // Worry level goes down
            if (reduceWorry === true)
            {
                item = Math.floor(item / 3);
            }
            else
            {
                item %= reduceWorry;
            }
            
            // Move item to the next monkey.
            if (item % monkey.test === 0)
            {
                monkies[monkey.consequent].items.push(item);
            }
            else
            {
                monkies[monkey.alternate].items.push(item);
            }

            // Monkey handled an item.
            monkey.handled++;
        }
    }
}

function parse(input)
{
    let inputs = input.split("\n\n");
    let monkies = [ ];

    for (let chunk of inputs)
    {
        let monkey = {
            items: [ ],
            operation: null,
            test: 0,
            consequent: 0,
            alternate: 0,
            handled: 0,
        };

        let lines = chunk.split("\n").map(line => line.trim());

        let items = lines[1].split(": ");
        let operation = lines[2].split(": ");
        let test = lines[3].split(" ");
        let consequent = lines[4].split(" ");
        let alternate = lines[5].split(" ");

        monkey.items.push(
            ...items[1]
                .split(", ")
                .map(i => Number(i)));

        // Create a new evaluator from the update. Note that JS reserves "new" as a keyword, so just stick a $ in front.
        monkey.operation = new Function(
            "$old",
            "$new",
            operation[1].replace(/(new|old)/g, "$$$1") + `; return $new;`);

        monkey.test = Number(test.pop());
        monkey.consequent = Number(consequent.pop());
        monkey.alternate = Number(alternate.pop());

        monkies.push(monkey);
    }

    return monkies;
}