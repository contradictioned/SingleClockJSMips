/**
 * Bisher folgende Steuerleitungen:
 *  - RegDst
 *  - Jump
 *  - Branch
 *  - ALUOp
 *  - MemToReg
 *  - MemWrite
 *  - ALUSrc
 *  - RegWrite
 */
function Control() {
	
}

Control.prototype.receive = function(bitVector) {
  // R-type
  if(bitVector == [0,0,0,0,0,0]) {
		this.regDstWire.receive(1)
		this.regWriteWire.receive(1)
		this.aluSrcWire.receive(0)
		this.branchWire.receive(0)
		this.memWriteWire.receive(0)
		this.memToRegWire.receive(0)
		this.jumpWire.receive(0)
		this.aluOpWire.receive([1,0])
	}
	// lw
	if(bitVector == [1, 0, 0, 0, 1, 1]) {
		this.regDstWire.receive(0)
		this.regWriteWire.receive(1)
		this.aluSrcWire.receive(1)
		this.branchWire.receive(0)
		this.memWriteWire.receive(0)
		this.memToRegWire.receive(1)
		this.jumpWire.receive(0)
		this.aluOpWire.receive([0,0])
	}
	// sw
	if(bitVector == [1, 0, 1, 0, 1, 1]) {
		this.regDstWire.receive()
		this.regWriteWire.receive(0)
		this.aluSrcWire.receive(1)
		this.branchWire.receive(0)
		this.memWriteWire.receive(1)
		this.memToRegWire.receive()
		this.jumpWire.receive(0)
		this.aluOpWire.receive([0,0])
	}
	// beq
	if(bitVector == [0, 0, 0, 1, 0, 0]) {
		this.regDstWire.receive()
		this.regWriteWire.receive(0)
		this.aluSrcWire.receive(0)
		this.branchWire.receive(1)
		this.memWriteWire.receive(0)
		this.memToRegWire.receive()
		this.jumpWire.receive(0)
		this.aluOpWire.receive([0,1])
	}
	// j
	if(bitVector == [0, 0, 0, 0, 1, 0]) {
		this.regDstWire.receive()
		this.regWriteWire.receive(0)
		this.aluSrcWire.receive()
		this.branchWire.receive()
		this.memWriteWire.receive(0)
		this.memToRegWire.receive()
		this.jumpWire.receive(1)
		this.aluOpWire.receive()
	}

}