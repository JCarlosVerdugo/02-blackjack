/**
 * 2C = Two of clubs
 * 2D = Two of diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const miModulo = (() => {
    'use strict'
    let deck       = [];
    const types    = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];

    let scorePlayers = [];

    const btnPedir = document.querySelector('#btnPedir'),
          btnNuevo = document.querySelector('#btnNuevo'),
          btnDetener = document.querySelector('#btnDetener');

    const divCardsPlayers = document.querySelectorAll('.divCards'),
          scoreHTML = document.querySelectorAll('small');

    // This funct start game
    const initGame = (numPlayers = 2) => {
        console.clear();
        
        for (const i in scorePlayers) {
            scoreHTML[i].innerText = 0;
            divCardsPlayers[i].innerHTML = '';
        }
        
        scorePlayers = [];
        deck = createDeck();
        
        for (let i = 0; i < numPlayers; i++) {
            scorePlayers.push(0);
        }

        scoreHTML.forEach((elem) => elem.innerText = 0);
        divCardsPlayers.forEach(elem => elem.innerHTML = '');

        btnDetener.disabled = false;
        btnPedir.disabled = false;

    }

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
        return _.shuffle(deck);
    }

    // This function allows me to draw a card.
    const drawCard = () => (deck.length === 0) ? console.log('There is no card in deck') : deck.pop();
    

    // This funct is for get value of each card
    const valueCard = (card) => {
        const value = card.substring(0, card.length -1);
        return (isNaN(value)) ? 
            (value == 'A') ? 11 : 10
            : Number(value);
    }


    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        divCardsPlayers[turn].append(imgCard);
    }

    const getWinner = () => {
        const [scoreMin, scorePc] = scorePlayers;

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


    //Add score player
    const accScore = (card, turn) => {
        scorePlayers[turn] += valueCard(card);
        scoreHTML[turn].innerText = scorePlayers[turn];
        return scorePlayers[turn];
    }

    
    // Computer turn
    const turnPc = (scoreMin) => {
        let scorePc = 0;

        do {
            const card = drawCard();
            scorePc = accScore(card, scorePlayers.length - 1);
            createCard(card, scorePlayers.length - 1);

        } while ((scorePc <= scoreMin) && (scoreMin <= 21));

        getWinner();
    }


    // Events
    btnPedir.addEventListener('click', () => {
        const card = drawCard();
        const scorePlayer = accScore(card, 0);
        createCard(card, 0)
        
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
        turnPc(scorePlayers[0]);
    });


    btnNuevo.addEventListener('click', () => {
        initGame();
    });


    return {
        inicializarJuego: initGame
    };
})();


