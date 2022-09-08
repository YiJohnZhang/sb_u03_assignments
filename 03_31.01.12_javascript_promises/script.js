// 01. Number
// http://numbersapi.com/42

const BASEURL_01 = 'http://numbersapi.com/42';

fetchFavoriteNumber = () => {

    axios.get(BASEURL_01)
        .then((response) => {
            document.getElementById('01_numberFact').innerText = response.data;
        })
        .catch((error) => {
            console.log(error);
        });

}

// 02. Card
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1

const BASEURL_02_INITIALIZE_DECK = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let BASEURL_02_GET_DECK;

displayDrawInformation = (cardDrawn, remainingCards) => {

    document.getElementById('02_cardsLeft').innerText = `${remainingCards} Cards Remaining`;

    // const CARD_IMAGE
    const CARD_IMAGE_ELEMENT = document.createElement('img');
    CARD_IMAGE_ELEMENT.src = cardDrawn.image;

    const CARD_IMAGE_CONTAINER = document.getElementById('02_cardGame');
    CARD_IMAGE_CONTAINER.prepend(CARD_IMAGE_ELEMENT);

}

drawNextCard = () => {

    axios.get(BASEURL_02_GET_DECK)
        .then((response) => {

            // console.log(response.data.deck_id);
            // console.log(response.data.remaining);
            // console.log(response.data.cards);

            displayDrawInformation(cardDrawn = response.data.cards[0], remainingCards = response.data.remaining);

        })
        .catch((error) => {
            console.log(error);
        });
    
}

loadAssignment02 = () => {

    axios.get(BASEURL_02_INITIALIZE_DECK)
        .then((response) => {

            BASEURL_02_GET_DECK = `https://deckofcardsapi.com/api/deck/${response.data.deck_id}/draw/?count=1`;
            // console.log(BASEURL_02_GET_DECK);
            drawNextCard();

        })
        .catch((error) => {
            console.log(error);
        });

}

// General
addEventListener('load', (event) => {

    fetchFavoriteNumber();  // 01
    loadAssignment02();     // 02

});

document.getElementById('button_get02').addEventListener('click', drawNextCard);

document.getElementById('button_reset02').addEventListener('click', () => {

    loadAssignment02();
    
});