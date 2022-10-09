function findRotationCount(arr) {

	// aren't searching for a particular number
	// looking for the number of times an array has been rotated CCW (meaning successive end indices has been pushed to the first index)
	// periodicity: every n*testArray.length, it is 0 (DFT! :)))).
		// i am going to return the index of the smallest number % testArray.length.

	// let m, r, l = medianIndex, rightIndex, leftIndex

	// what min # should I take? first index. and maybe find the index of the smallest integer...?
		// ok so let's say I have [12, 5, 7, 9, 11]; i'll start with 12 being the smallest, if it is larger than median, median becomes largest and I search left; i end when 
		// i f i have [5, 7, 9, 11, 12]; i'll start with 5 being smallest, since 5 < 9; i'll search right for a smaller one, until I have exhausted until arr.len, then I return the index of the smallest number;
		// i'll have to keep track of the currentMin and the currentMinIndex;
	
	let currentMinimumIndex = 0;
	let currentMinimum = arr[currentMinimumIndex];

	let l = 0;
	let r = arr.length;

	while(l <= r){

		let m = Math.floor((l+r)/2);

		if(arr[m] < currentMinimum){
			currentMinimumIndex = m;
			currentMinimum = arr[currentMinimumIndex];
			//search left
			r = m - 1;
		}else{
			// geq, implying duplicate number sets, it works b/c currentMin index doesn't change yet
			l = m + 1;
		}

	}

	return currentMinimumIndex % arr.length;

}

// const testArray = [15, 18, 2, 3, 6, 12];
// findRotationCount(testArray);

module.exports = findRotationCount