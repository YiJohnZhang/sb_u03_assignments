const markov = require('./markov');

const TEST_STRING_1 = 'the cat in the hat';
let markovInstance1;
let markovString1_Array;
const markovInstance1Length = Math.floor(Math.random()*20);

const TEST_STRING_2 = 'So I will eat them in a box\nAnd I will eat them with a fox\nAnd I will eat them in a house\nAnd I will eat them with a mouse\nAnd I will eat them here and there';
let markovInstance2;
let markovString2_Array;
let markovInstance2Length = Math.floor(Math.random()*20);;

const markovSplit = (text) => {
    // regex split on space and line break characters; remove space.
    const words = text.split(/[ \r\n]+/);
    return words.filter((element) => element !== "");
}


beforeAll(() => {

    markovInstance1 = new markov.MarkovMachine(TEST_STRING_1);
    // markovInstance1Length = Math.floor(Math.random(90));
        // took me 40 minutes to debug that i wrote random int generator wrong. ._.
    markovString1_Array = markovInstance1.makeText(numWords = markovInstance1Length);
    // console.log(markovString1_Array)

    markovInstance2 = new markov.MarkovMachine(TEST_STRING_2);
    // markovInstance2Length = Math.floor(Math.random(500));
    markovString2_Array = markovInstance2.makeText(numWords = markovInstance2Length);
    
});

describe('test generated markov string properties for TEST_STRING_1', () => {

    test('test the markov string content', () => {

        // console.log(markovString1_Array);
        const markovString1 = markovString1_Array.join(' ');
        // console.log(markovString1)
        const markovString1_wordSetArray = [...new Set(markovSplit(markovString1))];
        
        // console.log(markovString1_wordSetArray)
        // console.log(markovInstance1.wordSetArray)
        
        // the implementation of expect.arrayContaining is confusing
            // https://jestjs.io/docs/expect#expectarraycontainingarray
        const expectedSetArray = markovInstance1.wordSetArray;
        expect(expectedSetArray).toEqual(expect.arrayContaining(markovString1_wordSetArray));
        // expect(markovInstance1.wordSetArray).toContain(markovString1_wordSetArray);

    });

    test('test the markov string word length', () => {

        // console.log(markovString1_Array)
        // console.log(markovString1_Array.length)
        expect(markovString1_Array.length).toEqual(markovInstance1Length);

    });

});

describe('test generated markov string properties for TEST_STRING_2', () => {

    test('test the markov string content', () => {

        const markovString2 = markovString2_Array.join(' ');
        const markovString2_wordSetArray = [...new Set(markovSplit(markovString2))];

        const expectedSetArray = markovInstance2.wordSetArray;
        expect(markovString2_wordSetArray).not.toEqual(expect.arrayContaining(expectedSetArray));
    });

    test('test the markov string word length', () => {

        expect(markovString2_Array.length).toEqual(markovInstance2Length);

    });

});