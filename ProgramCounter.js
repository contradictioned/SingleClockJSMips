function ProgramCounter(init) {
	this.value = 1000;
	if(init != undefined) {
		this.value = init;
	}
}

ProgramCounter.prototype.receive = function(op) {
	if(op.length != 32) {
		throw "Program counter input not valid."
	}

	this.value = op;
	this.outWire.receive(op);
}