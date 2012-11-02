/**
 * Multiplexer, der standardmäßig 32 bit breite Eingaben und eine 1 bit breite Steuerleitung braucht 
 */
function Multiplexer(size) {
	this.in1 = undefined;
	this.in2 = undefined;
	this.selected = undefined;

	this.size = 32;
	if (size != undefined) {
		this.size = size;
	}

	this.actionCounter = 0;
}

Multiplexer.prototype.receive0 = function(op) {
	if(op.length != this.size) {
		throw "Multiplexer input not valid."
	}

	this.in0 = op;
	this.next();
}

Multiplexer.prototype.receive1 = function(op) {
	if(op.length != this.size) {
		throw "Multiplexer input not valid."
	}

	this.in1 = op;
	this.next();
}

Multiplexer.prototype.receiveSwitch = function(op) {
	if(op.length != 1) {
		throw "Multiplexer control not valid."
	}

	this.selected = op;
	this.next();
}

Multiplexer.prototype.next = function() {
	this.actionCounter++;
	if(this.actionCounter != 3) {
		return;
	}

	console.log("Multiplexer[" + this.name + "] selected option" + this.selected)

	if(this.selected==0) {
		this.outWire.receive(this.in0)
	} else {
		this.outWire.receive(this.in1)
	}
	thisthis.actionCounter = 0;
}