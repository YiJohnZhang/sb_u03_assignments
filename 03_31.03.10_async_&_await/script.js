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
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

const BASEURL_02_INITIALIZE_DECK = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let BASEURL_02_GET_DECK;

generateNewDeck = () => {

    axios.get(`${BASEURL_02_GET_DECK}`)
        .then((response) => {

            console.log(response.data.deck_id);
            return response.data.deck_id;

        })
        .catch((error) => {
            console.log(error);
        });

}

displayCardNumber = (cardNumber) => {

    // append image

}

drawNextCard = (nextCardNumber, DECK_ID) => {

    displayCardNumber();

}

loadAssignment02 = () => {

    const DECK_ID = generateNewDeck();
    BASEURL_02_GET_DECK = `https://deckofcardsapi.com/api/deck/${DECK_ID}/draw/`;
    displayNextCard(1);

}

// General
addEventListener('load', (event) => {

    fetchFavoriteNumber();  // 01
    loadAssignment02();     // 02

});

document.getElementById('button_get02').addEventListener('click', () => {

    //

});

document.getElementById('button_reset02').addEventListener('click', () => {

    loadAssignment02();
    
});