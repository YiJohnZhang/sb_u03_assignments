function findFloor(arr, x) {

	// let arr = testArray, x = testValue
	// arr is sorted/ find the "floor" of x, that being the closest member element smaller than that of x

	// so basically if I find a value smaller, save the index and move up and see if I can find a value closer, otherwise => larger & keep searching for a smaller value (search left)

	// let m, l, r = medianIndex, leftIndex, rightIndex respectively

	// handle trivial cases
	if(x < arr[0])
		return -1;	// it should be undefined, because there may be an array element < -1 unless arr elements are guaranteed positive in the spec.
	
	if(x > arr[arr.length - 1])
		return arr[arr.length -1];

	let l = 0;
	let r = arr.length - 1;
	let currentFloorIndex = -1;

	while(l <= r){

		let m = Math.floor((l+r)/2);

		if(x > arr[m]){
			currentFloorIndex = m;
			l = m + 1;
		}else if(x < arr[m]){
			r = m - 1;
		}else{
			l = m + 1;
		}

	}

	return arr[currentFloorIndex];

}

module.exports = findFloor