const returnMedian = (leftIndex, rightIndex) => {

    return Math.floor((leftIndex+rightIndex)/2);

}

function sortedFrequency(testArray, matchedValue) {

    // let m, l, r = medianIndex, leftIndex, rightIndex respectively; newL and newR to be a subsearch
    // d-n-c; regular bin search +
    // want to set l, r index to the first and last occurence of desired number

    /* TRY 1
    let startLeftIndex = 0;
    let endRightIndex = startLeftIndex;

    // set the left most value, 2log(N) => log(N^2)
    let l = 0;
    let r = returnMedian(l, returnMedian(l, testArray.length-1));
        // the first median to search is the right half of the array.
    
    while(l <= r){

        let m = returnMedian(l, r);

        if(testArray[m] < matchedValue){
            l = m+1;
        }else if(testArray[m] > matchedValue){
            r = m-1;
        }


    }

    // final algorithm = O(log(N^2) + 1) = O(2log(N) + 1) ~ O(log(N))

    while (l <= r){

        let m = Math.floor((l+r)/2);

        if(testArray[m] < matchedValue){

            l = m+1;

        }else if(testArray[m] > matchedValue){
            r = m-1;
        }

    }
    */

    /* TRY 2 session: first see if it exists: O(log(N)), reg bin search
    then find its first and last occurence. O(2log(N/2)) = O(2log(N) - 2log(2)) ~ O(log(N))

    let l = 0;
    let r = testArray.length - 1;
    let startLeftIndex = -1;
    let endRightIndex = -1;

    while(l <= r){

        let m = returnMedian(l, r);
        if(testArray[m] < matchedValue){

        }else if(testArray[m] > matchedValue){

        }else{
            
            if(m === testArray.length - 1)
                endRightIndex = m;  // only 1 because I use math.floor for finding th median

            if(m === 0){
                startLeftIndex = 0;
                endRIghtIndex = m;
            }

            if(m === testArray.length -1)
                return 1;   //because I use math.floor for finding th median
            
            

            startLeftIndex = m;
            endRightIndex = m+1;

        }
        
    }

    if(startLeftIndex === -1 && )
        return 0;
    */

    // hey, i can just test the worst case scenario that the entire array is the searched element, i.e. searching for '1', and [1, 1, 1, 1, 1]
    // can't think stragiht, so I need to be able to find the left-most value and right-most value. I need to establish a 
        // if array[m] < matchedValue, I need to shift median left
        // the idea is once I find array[m] === searched Value then I search within the current [l, r] to find more occurences
    
    let l = 0;
    let r = testArray.length - 1;
    let firstOccurenceIndex = -1;   //dummy variable to help me think
    let startLeftIndex = -1;
    let endRightIndex = -1;

    // console.log('===========')
    while(l <= r){

        let m = returnMedian(l, r);
        // console.log(m);
        if(testArray[m] < matchedValue){
            l = m+1;
        }else if(testArray[m] > matchedValue){
            r = m-1
        }else{

            //  [junk to the left, l, ..., m, ..., r, ..., junk to the right]

            // firstOccurenceIndex = m;
            // let newL = l;
            // let firstOccurenceR = m-1;
            // let firstOccurenceL = m+1;  // []
            // let newR = r;

            //  [junk to the left, l, ..., firstOccurenceR, m, firstOccurenceL, ..., r, ..., junk to the right]
            // now I find the first and last index to != matchedValue for both sides

            firstOccurenceIndex = m;
            startLeftIndex = l;
            endRightIndex = r;
            // console.log(`[${l}, ..., ${m}, ...${r}]`);
            break;

        }
        
    }

    // Handle Trivial Cases
    // ====================
    if(firstOccurenceIndex == -1)
        return -1;   // basically if l > r, the loop has been exhausted
    
    if(firstOccurenceIndex == testArray.length-1)
        return 1;   // because median is math.floor

    // handle the left
    l = startLeftIndex;
    r = firstOccurenceIndex - 1;
    while(l <= r){

        let m = returnMedian(l, r);
        console.log(m);

        if(testArray[m] == matchedValue){
            startLeftIndex = m;
            r = m-1;    //all values here are guaranteed to be less than or equal to matchedValue.
        }else{
            l = m+1;
        }

    }

    l = firstOccurenceIndex-1;
    r = endRightIndex;
    // console.log(`asdf: ${l}, ${r}`)
    while (l<=r){

        let m = returnMedian(l, r);

        if(testArray[m] == matchedValue){
            endRightIndex = m;
            l = m+1;
        }else{
            r = m-1;
        }

    }

    // console.log(`${startLeftIndex}, ${endRightIndex}`)

    return 1 + endRightIndex - startLeftIndex;  // because indexing starts at 0

}

module.exports = sortedFrequency