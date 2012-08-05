function ALU() {

}

ALU.prototype.receiveOp1 = function(op) {
	console.log("ALU hat ersten Operand empfangen:")
	console.log(op)
}

ALU.prototype.receiveOp2 = function(op) {
	console.log("ALU hat zweiten Operand empfangen:")
	console.log(op)
}