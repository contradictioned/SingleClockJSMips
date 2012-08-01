/**
 * Modellierung des Befehlsspeichers, hier nur als ganz einfaches Array von Strings, das eben abgearbeitet wird.
 */

/**
 * Erzeugt das Befehlsspeicher-Objekt, ggf. schon mit einer Liste von Befehlen sowie einem Offset, der Stumpf immer addiert wird.
 */
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

InstructionMemory.prototype.exec = function() {
	var bitString = decode(this.instructions[current]);
}