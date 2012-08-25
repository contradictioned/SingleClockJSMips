function ConstGate(value) {
	this.value = value;
}

AndGate.prototype.next = function() {
	this.outWire.receive(this.value)
}