const {Node, LinkedList} = require('./linked-list')

class BidirectionalNode extends Node{

	constructor(val){

		super(val);
		this.previous = null;
	}

}

class DoublyLinkedList extends LinkedList{

	constructor(vals = []){

		super(vals);

	}

	//LinkedList Overridden Methods
	// probably refactor insertAt, removeAt, push, shift, getAt, setAt so that it is easy to set previous node? for bidirectional node.
		// for example, 

	// New Methods
	pivotAbout(){

	}

	reverseInPlace(){

	}

	sortLinkedList(){

	}

}

// Circular Array Problem:
	// use an array as a representation

class CircularList extends LinkedList{

	constructor(vals = []){

		super(vals);
		this.arrayRepresentation = vals;
			// arrayRepresentation is the array representation of the linked list
			// after any linked list mutation run it from this.head to this.tail to update arrayRepresentation

	}

	getByIndex(index){

		return this.arrayRepresentation[index%this.length];

	}

}