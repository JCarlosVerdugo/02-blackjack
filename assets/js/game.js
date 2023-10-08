/**
 * 2C = Two of clubs
 * 2D = Two of diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let scorePlayer = 0,
    scorePc = 0;

const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const divCardsPlayer = document.querySelector('#jugador-cartas');
const divCardsPc = document.querySelector('#computadora-cartas');
const scoreHTML = document.querySelectorAll('small');
const btnDetener = document.querySelector('#btnDetener');

// This function creates a deck of cards
const createDeck = () => {
    deck = [];

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

// This function allows me to draw a card.
const drawCard = () => {
    if (deck.length === 0) {
        throw 'There is no card in deck'
    }
    const card = deck.pop();
    return card;
}

const valueCard = (card) => {
    const value = card.substring(0, card.length -1);
    return (isNaN(value)) ? 
           (value == 'A') ? 11 : 10
           : Number(value);
}

createDeck();


// computer turn
const turnPc = (scoreMin) => {
    do {
        const card = drawCard();

        scorePc += valueCard(card);
        scoreHTML[1].innerText = scorePc;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('carta');
        divCardsPc.append(imgCard);

        if ( scoreMin > 21 ) {
            break;
        }

    } while ((scorePc <= scoreMin) && (scoreMin <= 21));

    setTimeout(() => {
        if (scorePc === scoreMin) {
            alert('Nadie gana :c');
        } else if (scoreMin > 21 || (scorePc > scoreMin && scorePc <= 21)) {
            alert('Computadora gana');
        } else if (scorePc > 21 || (scoreMin > scorePc && scorePc <= 21)) {
            alert('Ganaste')
        }
    }, 500);
}


// Events
btnPedir.addEventListener('click', () => {
    const card = drawCard();
    scorePlayer += valueCard(card);
    scoreHTML[0].innerText = scorePlayer;
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList.add('carta');
    divCardsPlayer.append(imgCard);

    if (scorePlayer > 21) {
        console.warn('Lo siento mucho, perdiste')
        btnPedir.disabled = true; 
        btnDetener.disabled = true;
        turnPc(scorePlayer);

    } else if (scorePlayer === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true; 
        btnDetener.disabled = true;
        turnPc(scorePlayer);

    }
});

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnPc(scorePlayer);
});

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = createDeck();

    scorePlayer = 0,
    scorePc = 0;

    scoreHTML[0].innerText = 0;
    scoreHTML[1].innerText = 0;

    divCardsPlayer.innerHTML = '';
    divCardsPc.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})