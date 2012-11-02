function ALU() {
	// BitVector
	this.op0 = undefined;
	this.op1 = undefined;
	this.ctrl = undefined;

	// Wire
	this.outWire = undefined;
	this.zeroWire = undefined;

	this.result = undefined;
	this.actionCounter = 0;
}

ALU.prototype.receiveOp0 = function(op) {
	if(op.length() != 32) {
		console.log(op)
		throw "ALU input not valid."
	}
	
	this.op0 = op;
	this.next();
}

ALU.prototype.receiveOp1 = function(op) {
	if(op.length() != 32) {
		console.log(op)
		throw "ALU input not valid."
	}

	this.op1 = op;
	this.next();
}

ALU.prototype.receiveCtrl = function(op) {
	if((op.length() != 3) || (op.equals([0,1,1]))) {
		console.log(op)
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
	console.log(this)

	switch(this.ctrl.toString()) {
		case "000":
			this.and();
			break;
		case "001":
			this.or();
			break;
		case "010":
			this.add();
			break;
		case "110":
			this.sub();
			break;
	}

	this.actionCounter = 0;
}

/**
 * On this.ctrl == [0,0,0] this.outWire is
 * sent the logical "and" of the two operands.
 */
ALU.prototype.and = function() {
	this.result = "";
	for(var i = 0; i < 31; i++) {
		this.result = Math.min(this.op0.get(i), this.op1.get(i)) + this.result;
	}
	this.outWire.receive(new BitVector(this.result));
}

/**
 * On this.ctrl == [0,0,1] this.outWire is
 * sent the logical "or" of the two operands.
 */
ALU.prototype.or = function() {
	this.result = "";
	for(var i = 0; i < 31; i++) {
		this.result = Math.max(this.op0.get(i), this.op1.get(i)) + this.result;
	}
	this.outWire.receive(new BitVector(this.result));
}

/**
 * On this.ctrl == [0,1,0] this.outWire is
 * sent the sum of the two operands.
 */
ALU.prototype.add = function() {
	// just cheating :)
	var op0int = this.op0.toInt();
	var op1int = this.op1.toInt();
	var result = (op0int + op1int).toString(2).split('');
	this.outWire.receive(result);
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
	// just cheating :)
	var op0int = this.op0.toInt();
	var op1int = this.op1.toInt();
	var result = (op0int - op1int).toString(2).split('');
	this.outWire.receive(result);
}

/**
 * On this.ctrl == [1,1,1] this.outWire is
 * sent [0,..,0,1] if op0 < op1,
 * else [0,...,0]
 */
ALU.prototype.lt = function() {
	// just cheating :)
	var op0int = bitVectorToValue(op0);
	var op1int = bitVectorToValue(op1)
	if(op0int < op1int) {
		var result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
	} else {
		var result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	}
	
	this.outWire.receive(result);
}