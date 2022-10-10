/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;	
		for (let val of vals) this.push(val);
	}	

	/** push(val): add new value to end of list. */	
	push(val) {

		const newNode = new Node(val);

		if(this.length == 0){		
			this.head = newNode;
			this.tail = newNode;
		}else{
			this.tail.next = newNode;
		}
		
		this.tail = newNode;
		this.length += 1;
		return;

	}

	/** unshift(val): add new value to start of list. */	
	unshift(val) {

		const newNode = new Node(val);
		newNode.next = this.head;

		if(this.length == 0)
			this.tail = newNode;
			// first operation is unshift

		if(this.length == 1)
			this.tail = this.head;	// implies there is 1 node already in the list
		
		this.head = newNode;
		this.length += 1;
		return;

	}

	/** pop(): return & remove last item. */	
	pop() {

		if(this.length == 0)
			return 'error: empty linked list'

		const selectedNodeValue = this.tail.val;

		let currentNode = this.head;

		while(currentNode){
			if(currentNode.next === this.tail){
				
				currentNode.next = null;
				this.tail = currentNode;

			}

			currentNode = currentNode.next;
		}

		this.length -= 1;

		if(this.length == 1)
			this.tail = this.head;

		if(this.length == 0){
			this.head = null;
			this.tail = null;	
		}

		return selectedNodeValue;

	}

	/** shift(): return & remove first item. */	
	shift() {

		const selectedNodeValue = this.head.val;
		this.head = this.head.next;

		this.length -= 1;

		if(this.length == 0)
			this.tail = this.head;
		
		return selectedNodeValue;

	}

	/** getAt(idx): get val at idx. */	
	getAt(idx) {

		if(idx > this.length)
			return 'error: out of bounds';

		if(idx == this.length)
			return this.tail.val;
			// funny, I tested this and `getAt` doesn't seem to shortcut to this one ._.

		let currentIndex = 0;
		let currentNode = this.head;
		while(currentIndex <= idx){

			if(currentIndex == idx)
				return currentNode.val;

			currentNode = currentNode.next;
			currentIndex += 1;
		}

		return;

	}

	/** setAt(idx, val): set val at idx to val */	
	setAt(idx, val) {

		if(idx > this.length)
			return 'error: out of bounds';

		if(idx == this.length)
			this.tail.val = val;

		let currentIndex = 0;
		let currentNode = this.head;
		while(currentIndex <= idx){

			if(currentIndex == idx)
				currentNode.val = val;

			currentNode = currentNode.next;
			currentIndex += 1;

		}

		return;

	}

	/** returns a node object at the current node index */
	middleLinkedListNodeUpdateHelper = (idx) => {

		let currentNode = this.head;
		let currentIndex = 0;

		while(currentIndex <= idx){

			if(currentIndex + 1 == idx){
				
				return currentNode;

			}

			currentIndex += 1;
			currentNode = currentNode.next;

		}

	}

	/** insertAt(idx, val): add node w/val before idx. */	
	insertAt(idx, val) {

		if(idx > this.length)
			return 'error: out of bounds';

		if(idx == 0){
			this.unshift(val);
			return;
		}
		
		if(idx == this.length){
			this.push(val);
			return;
		}

		const newNode = new Node(val);

		const currentNode = this.middleLinkedListNodeUpdateHelper(idx);
		newNode.next = currentNode.next;
		currentNode.next = newNode;

		this.length += 1;

		return;

	}

	/** removeAt(idx): return & remove item at idx, */	
	removeAt(idx) {

		if(idx > this.length)
			return 'error: out of bounds';

		if(idx == 0){
			this.shift();
			return;
		}
		
		if(idx == this.length){
			this.pop();
			return;
		}

		const currentNode = this.middleLinkedListNodeUpdateHelper(idx);
		const selectedNodeValue = currentNode.next.value;
		currentNode.next = curentNode.next.next;
		
		this.length -= 1;

		return selectedNodeValue;

	}

	/** average(): return an average of all values in the list. Documentation UPDATE to test returns 0 for empty lists. */	
	average() {

		if(this.length == 0)
			return 0;

		let currentNode = this.head;
		let sum = 0;
		while(currentNode){

			sum += currentNode.val;
			currentNode = currentNode.next;

		}

		return sum/this.length;
	
	}
}

module.exports = LinkedList;
