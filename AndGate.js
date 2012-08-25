function AndGate() {

}

AndGate.prototype.receive0 = function(op) {
	this.op0 = op;
	this.next();
}

AndGate.prototype.receive1 = function(op) {
	this.op1 = op;
	this.next();
}

AndGate.prototype.next = function() {
	// And action here
	this.outWire.receive()
}