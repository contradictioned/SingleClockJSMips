function InstructionMemory(instructionArray, offset) {
	if (instructionArray === undefined) {
		this.instructions = new Array();
	} else {
		this.instructions = instructionArray;
	}
	if (offset === undefined) {
		this.offset = 0;
	} else {
		this.offset = offset;
	}
	this.current = 0;
}
