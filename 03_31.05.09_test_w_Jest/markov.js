/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    
    this.words = this.splitWords(text);
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

  splitWords(text){
    // regex split on space and line break characters; remove space.
    const words = text.split(/[ \r\n]+/);
    return words.filter((element) => element !== "");
  }

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

    // console.log(JSON.stringify(wordObject));
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
      // while(randomWord !== null && markovChain.length < 50){
      while(randomWord !== null && markovChain.length < numWords){

        markovChain.push(randomWord);
        randomNumber = this.generateRandomInteger(this.markovMap[randomWord].length)
        randomWord = this.markovMap[randomWord][randomNumber];

      }

    }

    return markovChain;

  }

}

module.exports = {MarkovMachine}

// const markovInstance = new MarkovMachine('the cat in the hat');
// const markovChain = markovInstance.makeText(numWords = 50);
// console.log(`${markovChain.length}: ${markovChain.join(' ')}`);

/*  Further Study: JavaScript Generator Functions 
A generator function has the keyword `function` followed by an asterisk, `*`. For example,

```js
function* exampleGeneratorFunction(parameters) {

  yield expression;

}
```
So as long as there are yield statements, calling the next value on the generator function, `generatorFunction.next().value`, will continue to yield a value based on the expressoin. Otherwise, it will start yielding `undefined`js.

For example:
```js
// Source (Rehashed): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*#try_it
function* exampleGenerateMultipleOf10s(initial) {

  yield i;
  yield i+10;

}

const generatorAlias = exampleGenerateMultipleOf10s(10);

console.log(generatorAlias.next().value);
// 10
console.log(generatorAlias.next().value);
// 20
console.log(generatorAlias.next().value)
// undefined
```

Scope rules apply as usual.
*/