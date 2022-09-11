// 01. Number
// http://numbersapi.com/42

const fetchFavoriteNumber = async () => {

    const BASEURL_01 = 'http://numbersapi.com/42';

    try {

        const response = await axios.get(BASEURL_01);
        document.getElementById('01_numberFact').innerText = response.data;
    
    }catch(error){
        console.error(error);
    }


    

}

// 02. Card
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1

const assignment02 = {

    async init(){
        // (Re-)Initialize the Deck

        const INITIALIZE_DECK_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
        const initialDeckResponse = await axios.get(INITIALIZE_DECK_URL);
        this.deckID = initialDeckResponse.data.deck_id;
        console.log(this.deckID);

    },

    async drawNextCard(){

        console.log(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`)

        try{
            const drawDeckResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`);
            this.displayDrawInformation(cardDrawn = drawDeckResponse.data.cards[0], cardsRemaining = drawDeckResponse.data.remaining);
        }catch(error){
            console.log(error);
        }

    }, 

    displayDrawInformation(){

        document.getElementById('02_cardsLeft').innerText = `${remainingCards} Cards Remaining`;

        // const CARD_IMAGE
        const CARD_IMAGE_ELEMENT = document.createElement('img');
        CARD_IMAGE_ELEMENT.src = cardDrawn.image;
    
        const CARD_IMAGE_CONTAINER = document.getElementById('02_cardGame');
        CARD_IMAGE_CONTAINER.prepend(CARD_IMAGE_ELEMENT);

    }

}

// General
addEventListener('load', (event) => {

    fetchFavoriteNumber();  // 01
    assignment02.init();    // 02

    document.getElementById('button_get02').addEventListener('click', assignment02.drawNextCard);

    document.getElementById('button_reset02').addEventListener('click', () => {

        assignment02.init();
    
    });

});