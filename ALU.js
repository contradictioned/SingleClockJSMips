function ALU() {
	this.op0 = undefined;
	this.op1 = undefined;
	this.ctrl = undefined;

	this.outWire = undefined;
	this.zeroWire = undefined;

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
	if(op.length != 3 || op == [0,1,1]) {
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

/**
 * On this.ctrl == [0,0,0] this.outWire is
 * sent the logical "and" of the two operands.
 */
ALU.prototype.and = function() {

}

/**
 * On this.ctrl == [0,0,1] this.outWire is
 * sent the logical "or" of the two operands.
 */
ALU.prototype.or = function() {
	
}

/**
 * On this.ctrl == [0,1,0] this.outWire is
 * sent the sum of the two operands.
 */
ALU.prototype.add = function() {
	
}

/**
 * On this.ctrl == [1,0,0] nothing happens.
 */
ALU.prototype.andn = function() {
	
}

/**
 * On this.ctrl == [1,0,0] nothing happens.
 */
ALU.prototype.orn = function() {
	
}

/**
 * On this.ctrl == [1,1,0] this.outWire is
 * set to "this.op0 - this.op1" and this.zeroWire
 * is sent accordingly.
 */
ALU.prototype.sub = function() {
	
}

/**
 * On this.ctrl == [1,1,1] this.outWire is
 * sent [0,..,0,1]
 */
ALU.prototype.lt = function() {
	
}