/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
      // regex split on space and line break characters.
    this.words = words.filter(c => c !== "");
    // console.log(this.words);
    const wordSet = new Set(this.words);
    this.wordSetArray = [...wordSet];
    // console.log(wordSet);
    this.markovMap = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  generateRandomInteger(maximumInteger){

    const randomNumber = Math.floor(Math.random()*maximumInteger);
    return randomNumber;

  }

  makeChains() {

    let wordObject = {} // to create array of each word.

    for (let word of this.wordSetArray){

      let adjacentWords = [];

      const adjacentWord = this.words.forEach((element, index) => {

        if(element == word){

          if(this.words[index+1]){
            adjacentWords.push(this.words[index+1]);
          }else{
            adjacentWords.push(null);
          }

        }

      });

      wordObject[word] = adjacentWords;

    }

    console.log(JSON.stringify(wordObject));
    return wordObject;
    
  }


  /** return random text from chains */
  makeText(numWords = 100) {
    // randomly select one word, however, the random number generator depends what is selected.
    let markovSetLength = this.wordSetArray.length;
    let markovChain = [];

    while(markovChain.length < numWords){

      let randomNumber = this.generateRandomInteger(markovSetLength);
      let randomWord = this.wordSetArray[randomNumber];

      // while(randomWord !== null){ (interesting what is this distribution based on complexity?)
      while(randomWord !== null && markovChain.length < 50){

        markovChain.push(randomWord);
        randomNumber = this.generateRandomInteger(this.markovMap[randomWord].length)
        randomWord = this.markovMap[randomWord][randomNumber];

      }

    }

    return markovChain;

  }
}


const markovInstance = new MarkovMachine('the cat in the hat');
const markovChain = markovInstance.makeText(numWords = 50);
// console.log(`${markovChain.length}: ${markovChain}`);