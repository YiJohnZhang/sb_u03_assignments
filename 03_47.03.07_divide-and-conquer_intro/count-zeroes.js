function countZeroes(testArray) {

	// m, l, r = shifting middleIndex, leftIndex, rightIndex respectively.
	//binary search.
	//find the first 0.

	let l = 0;
	let r = testArray.length-1;

	let zeroIndex = testArray.length;

	while(l <= r){

		let m = Math.floor((l+r)/2);
		
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