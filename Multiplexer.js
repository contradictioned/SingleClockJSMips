/**
 * We need just two inputs here :)
 */
function Multiplexer() {
	this.in1 = undefined;
	this.in2 = undefined;
	this.selected = undefined;
	this.actionCounter = 0;
}

Multiplexer.prototype.receive1 = function(op) {
	this.in1 = op;
	this.next();
}

Multiplexer.prototype.receive2 = function(op) {
	this.in2 = op;
	this.next();
}

Multiplexer.prototype.sel = function(op) {
	this.selected = op;
	this.next();
}

Multiplexer.prototype.next = function() {
	this.actionCounter++;
	if(this.actionCounter != 3) {
		return
	}

	console.log("Multiplexer[" + this.name + "] selected option" + this.selected)

	if(this.selected==0) {
		this.outwire.receive(this.in1)
	} else {
		this.outwire.receive(this.in2)
	}
}