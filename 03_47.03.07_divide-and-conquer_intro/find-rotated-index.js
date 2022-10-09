const returnMedianCeiling = (leftValue, rightValue) => Math.ceil((leftValue+rightValue)/2);

function findRotatedIndex(arr, v) {
	// let arr = test array, v = value

	// search a rotated array for a valueToMatch
	// If the value is not found, return -1.

	// d-n-c
	// so basically, it adds the complexity for the first median searching; I know if the indexed value is too small, search the left (not the right); otherwise, search the right;
	// use math.ceiling given the nature of the data.
	// let m, l, r = median index, left index, right index.

	/*
	// initial query
	let l = 0;
	let r = arr.length;
	let m = returnMedianCeiling(l, r);

	if(v > arr[m]){
		console.log(arr[m] < v);
		// search the left
		r = m - 1;
	}else if(v < arr[m]){
		// search the right
		l = m + 1
	}else{
		return m;
	}

	// i forgot the es6 object swapping quirk

	console.log(`${l}, ${m}, ${r}`)

	while(l <= r){

		m = returnMedianCeiling(l, r);
		console.log(`${l}, ${m}, ${r}`)

		if(v > arr[m]){
			l = m + 1;
		}else if(v < arr[m]){
			r = m - 1;
		}else{
			return m;
		}

	}

	return -1;
		*/


	// try2: add extra information about the min of the large numbers and max of the small numbers
	const minLargeNumber = arr[0];
	const maxSmallNumber = arr[arr.length-1];

	// initial query
	let l = 0;
	let r = arr.length;
	let m = returnMedianCeiling(l, r);

	if(v >= minLargeNumber){
		console.log(arr[m] < v);
		// search the left
		r = m - 1;
	}else if(v <= maxSmallNumber){
		// search the right
		l = m + 1
	}else if(v == m){
		return m;
	}

	// i forgot the es6 object swapping quirk

	while(l <= r){

		m = returnMedianCeiling(l, r);

		if(v > arr[m]){
			l = m + 1;
		}else if(v < arr[m]){
			r = m - 1;
		}else{
			return m;
		}

	}

	return -1;

}

// const testArray = [6, 7, 8, 9, 1, 2, 3, 4];
// const testValue = 3;
// console.log(findRotatedIndex(testArray, testValue));

module.exports = findRotatedIndex