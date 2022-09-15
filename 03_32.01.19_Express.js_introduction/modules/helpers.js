const mean = (dataArray) => {

    const sum = dataArray.reduce((previousValue, currentValue) => previousValue+currentValue);

    return sum/dataArray.length;

}

const median = (dataArray) => {

    // dataArray.sort();   // hm... [9, 5, 1, 11, 100] will be sorted as [1, 100, 11, 5, 9]
    dataArray.sort();
    // console.log(dataArray); // maybe start the algos unit asap.
    // constructing BST is too much for this assignment O(nlogn + n) ~ O(nlogn) ._.
    if (dataArray.length % 2 == 0)
        return (dataArray[dataArray.length/2]+dataArray[-1+dataArray.length/2])/2;

    return dataArray[Math.floor(dataArray.length/2)];


}

const mode = (dataArray) => {

    let dataArraySet = new Set(dataArray);
    // O(n) ~ O(n); all are unique numbers
    let dataArrayCounterObject = {};

    dataArraySet.forEach((element) => {
        dataArrayCounterObject[element] = 0;
    });
    // so far O(2n) ~ O(n)

    // while(dataArray){

    //     dataArray = null;
    // }
    // nah, recursively popping found numbers will also include searching, yielding nlog(n)

    dataArray.forEach((element) => dataArrayCounterObject[element] += 1);
    // so far O(3n) ~ O(n)

    // // console.log(dataArrayCounterObject);
    // // funny enough that an object automatically sorts it. LOL

    let maxInstancesCount = 2;
    let modeSet = []

    for(number of Object.keys(dataArrayCounterObject)){

        if (dataArrayCounterObject[number] < maxInstancesCount){
            delete dataArrayCounterObject[number];
        }else if(dataArrayCounterObject[number] > maxInstancesCount){
            modeSet = [];   // wipe it
            modeSet.push(Number(number));
        }else{
            // if ==
            modeSet.push(Number(number));
        }
        
    }
    // O(4n) ~ O(n)
    
    // if(!modeSet){
    //     return 'no mode in this set';
    // }

    return modeSet;

}

module.exports = {
    mean,
    median,
    mode
};