const mean = (dataArray) => {

    const sum = dataArray.reduce((previousValue, currentValue) => previousValue+currentValue);

    return sum/dataArray.length;

}

const median = (dataArray) => {

    // dataArray.sort();   // hm... [9, 5, 1, 11, 100] will be sorted as [1, 100, 11, 5, 9]
    dataArray.sort();
    console.log(dataArray); // maybe start the algos unit asap.
    if (dataArray.length % 2 == 0)
        return (dataArray[dataArray.length/2]+dataArray[-1+dataArray.length/2])/2;

    return dataArray[Math.floor(dataArray.length/2)];


}

const mode = (dataArray) => {
    
    const dataArraySet = new Set(dataArray);
    if(dataArray.length == dataArraySet.size)
        return null;
    
    // else, figure it out. (maybe recursively?)

}

module.exports = {
    mean,
    median,
    mode
};