const returnMedian = (leftIndex, rightIndex) => {
	return Math.floor((leftIndex+rightIndex)/2);
}

function countZeroes(testArray) {

	// m, l, r = shifting middleIndex, leftIndex, rightIndex respectively.
	//binary search.
	//find the first 0.

	let l = 0;
	let r = testArray.length-1;
	let m = returnMedian(l, r);

	let zeroIndex = testArray.length;

	while(l <= r){

		let m = returnMedian(l, r);
		
		if(testArray[m] === 1){

			l = m+1;	// look right.

		}else{

			zeroIndex = m;	// zero found
			r = m-1;

		}
	
	}

	return testArray.length - zeroIndex;

}

module.exports = countZeroes