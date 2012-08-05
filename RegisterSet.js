function RegisterSet() {
	this.registers = [];
	this.rs = undefined;
	this.rt = undefined;
	this.rd = undefined;
	this.actionCounter = 0;

	//initialize
	for(var i = 0; i < 32; i++) {
		this.registers[i] = 0;
	}
}

RegisterSet.prototype.receiveRsAddr = function(rsAddr) {
	this.rs = this.registers[bitVectorToValue(rsAddr)];
	this.next();
}

RegisterSet.prototype.receiveRtAddr = function(rtAddr) {
	this.rt = this.registers[bitVectorToValue(rtAddr)];
	this.next();
}

RegisterSet.prototype.receiveRdAddr = function(rdAddr) {
	this.rd = this.registers[bitVectorToValue(rdAddr)];
	this.next();
}

RegisterSet.prototype.receiveRd = function(rd) {
	this.registers[bitVectorToValue(rdAddr)] = rd;
}

RegisterSet.prototype.next = function() {
	this.actionCounter++;
	if(this.actionCounter != 3) {
		return;
	}
	
}