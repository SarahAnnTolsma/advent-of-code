let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
let lines = input.split("\n");

function Hand(cards, bid, jokers)
{
    this.bid = bid;
    this.cards = cards;
    this.value = 0;

    for (let card of cards)
    {
        // The maximum value of a card is 14, which we can hold in 4 bits.
        this.value <<= 4;
        this.value |= card;
    }

    if (jokers)
    {
        // Generate all the combinations, then find the best one.
        this.type = 0;

        for (let combination of getCombinations(cards, 0))
        {
            this.type = Math.max(this.type, getType(combination));

            if (this.type === 6)
            {
                // This is the maximum possible type. Stop scanning.
                break;
            }
        }
    }
    else
    {
        this.type = getType(cards);
    }
}

function getCombinations(cards, offset)
{
    let combinations = [ ];

    for (let i = offset; i < cards.length; i++)
    {
        let card = cards[i];
        if (card === 0)
        {
            // This is a joker, so go through all the possible cards it can be.
            for (let n = 2; n <= 13; n++)
            {
                let combination = cards.slice();
                combination[i] = n;

                // Then recurse to find other jokers.
                combinations.push(...getCombinations(combination, i + 1));
            }

            break;
        }
    }

    if (combinations.length === 0)
    {
        // Just include the cards as-is.
        combinations.push(cards);
    }

    return combinations;
}

function getScore(jokers)
{
    let hands = [ ];

    for (let line of lines)
    {
        let parts = line.split(" ");
        let cards = parts[0].split("");
        let bid = Number(parts[1]);

        // Map A...J into numerical values.
        let queen = jokers ? 11 : 12;

        cards = cards.map(
            (card) =>
            {
                switch (card)
                {
                    case "A": return queen + 2;
                    case "K": return queen + 1;
                    case "Q": return queen;
                    case "J": return jokers ? 0 : 11; // Jokers are worthless
                    case "T": return 10;
                    default:  return Number(card);
                }
            });

        hands.push(new Hand(cards, bid, jokers));
    }

    hands.sort(
        (a, b) =>
        {
            if (a.type > b.type)
            {
                // a is a better hand than b, so it should be sorted to the bottom.
                return 1;
            }
            else if (a.type < b.type)
            {
                // a is worse than b, so it should be sorted to the top.
                return -1;
            }
            
            // The hand types are the same, so compare their values (i.e. cards, left-to-right)
            return a.value - b.value;
        });

    // Calculate the final score by just multiplying the bids with the rank (rank starts at 1)
    return hands.reduce((prev, curr, index) => prev + (curr.bid * (index + 1)), 0);
}

function getType(cards)
{
    let map = new Map();

    for (let card of cards)
    {
        map.set(card, (map.get(card) | 0) + 1);
    }

    if (map.size === 1)
    {
        // There is only one card, so this is a five-of-a-kind.
        return 6;
    }
    else if (map.size === 2)
    {
        // This is a four-of-a-kind or full house.
        return 4 + Array.from(map).some(e => e[1] === 4);
    }
    else if (map.size === 3)
    {
        // This is a three-of-a-kind or two pair.
        return 2 + Array.from(map).some(e => e[1] === 3);
    }
    else if (map.size === 4)
    {
        // This is a single pair
        return 1;
    }

    return 0;
}

console.log(getScore(false));
console.log(getScore(true));