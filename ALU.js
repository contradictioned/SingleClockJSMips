function ALU() {
	this.op0 = undefined;
	this.op1 = undefined;
	this.ctrl = undefined;

	this.actionCounter = 0;
}

ALU.prototype.receiveOp0 = function(op) {
	if(op.length != 32) {
		throw "ALU input not valid."
	}
	
	this.op0 = op;
	this.next();
}

ALU.prototype.receiveOp1 = function(op) {
	if(op.length != 32) {
		throw "ALU input not valid."
	}

	this.op1 = op;
	this.next();
}

ALU.prototype.receiveCtrl = function(op) {
	if(op.length != 3) {
		throw "ALU control input not valid"
	}

	this.ctrl = op;
	this.next();
}

ALU.prototype.next = function() {
	this.actionCounter++;
	if(this.actionCounter != 3) {
		return;
	}

	console.log("ALU is doing serious busines.")


}