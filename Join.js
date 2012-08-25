function Join() {

}

Join.prototype.receive0 = function(op) {
	this.op0 = op;
	this.next();
}

Join.prototype.receive1 = function(op) {
	this.op1 = op;
	this.next();
}

Join.prototype.next = function() {
	// Join action here
	this.outWire.receive()
}