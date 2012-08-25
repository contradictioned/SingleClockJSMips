function Adder() {

}

Adder.prototype.receive0 = function(op) {
	this.op0 = op;
	this.next();
}

Adder.prototype.receive1 = function(op) {
	this.op1 = op;
	this.next();
}

Adder.prototype.next = function() {
	// Add action here
	this.outWire.receive()
}