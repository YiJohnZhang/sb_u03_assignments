const mean = (dataArray) => {

    const sum = dataArray.reduce((previousValue, currentValue) => previousValue+currentValue);

    return sum/dataArray.length;

}

const median = (dataArray) => {
    
    if (dataArray.length % 2 == 0)
        return (dataArray[dataArray.length/2]+dataArray[-1+dataArray.length/2])/2;

    return dataArray[Math.floor(dataArray/2)];


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