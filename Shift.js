/**
 * Shifter, der um shamt Stellen nach Links shiftet
 */
function Shift(shamt, size) {
	this.shamt = shamt;
	this.size = 32;
	if (size != undefined) {
		this.size = size;
	}
}

Multiplexer.prototype.receive = function(op) {
	if(op.length != this.size) {
		throw "Shift input not valid."
	}

	// shamt 0en hinten anhängen
	for (var i = 0; i < this.size; i++) {
		op.push(0);
	}

	// shamt 0en vorne löschen
	op = op.slice(this.shamt, op.length);
	this.outWire.receive(op);
}