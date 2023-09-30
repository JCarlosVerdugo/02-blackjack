/**
 * 2C = Two of clubs
 * 2D = Two of diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

// This function creates a deck of cards
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const type of types) {
            deck.push(`${i}${type}`);
        }
    }

    for (const type of types) {
        for (const esp of specials) {
            deck.push(`${esp}${type}`)
        }
    }

    deck = _.shuffle(deck);
    return deck
}

createDeck();

// This function allows me to draw a card.
const drawCard = () => {
    if (deck.length === 0) {
        throw 'There is no card in deck'
    }

    const card = deck.pop();
    
    console.log(deck)
    console.log(card)
    
    return card;
}

const valueCard = (card) => {
    const value = card.substring(0, card.length -1);
    return (isNaN(value)) ? 
           (value == 'A') ? 11 : 10
           : Number(value);
}

const card = drawCard();
const value = valueCard(card);
console.log({value})