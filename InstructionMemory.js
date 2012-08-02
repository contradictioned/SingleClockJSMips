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
	var bitVector = this.decode(this.instructions[current]);
}

/**
 * Translates a MIPS assembly code into an bitstring where instruction is an Bitvektor
 *
 */
InstructionMemory.prototype.decode = function(instruction) {
	// extracts the name of the instruction
	var instr = instruction.slice(0, instruction.indexOf(' '));
	var rest = instruction.slice(instruction.indexOf(' ') + 1);

	// parse registers and let a rest
	if(rest.indexOf(',') != -1) {
		var reg1 = rest.slice(0, rest.indexOf(','));
		rest = rest.slice(rest.indexOf(' ') + 1);
	}
	if(rest.indexOf(',') != -1) {
		var reg2 = rest.slice(0, rest.indexOf(','));
		rest = rest.slice(rest.indexOf(' ') + 1);
	}
	if(rest.indexOf('$') != -1) {
		var reg3 = rest;
		rest = undefined;
	}
	console.log("instr: " + instr);
	console.log("reg1: " + reg1);
	console.log("reg2: " + reg2);
	console.log("reg3: " + reg3);
	console.log("rest: " + rest);

	// Arithmetik

	if (instr === "add") {
		this.type = "R"
		var opcode = [0,0,0,0,0,0];
		var rs = decodeRegister(reg2);
		var rt = decodeRegister(reg3);
		var rd = decodeRegister(reg1);
		var shamt = [0,0,0,0,0];
		var funct = [1,0,0,0,0,0]; // 32
	}
	if (instr === "addu") {
		
	}
	if (instr === "addi") {
		
	}
	if (instr === "addiu") {
		
	}
	if (instr === "sub") {
		
	}
	if (instr === "subu") {
		
	}

}

/**
 * Takes an register as a String (either by name $v0 or by number %15) and
 * returns an bitvector.
 */
InstructionMemory.prototype.decodeRegister = function(register) {
  switch(reg) {
		case "$0":
		case "$zero":
			return [0,0,0,0,0];
			break;
		case "$1":
		case "$at":
			return [0,0,0,0,1];
			break;
		case "$2":
		case "$v0":
			return [0,0,0,1,0];
			break;
		case "$3":
		case "$v1":
			return [0,0,0,1,1];
			break;
		case "$4":
		case "$a0":
			return [0,0,1,0,0];
			break;
		case "$5":
		case "$a1":
			return [0,0,1,0,1];
			break;
		case "$6":
		case "$a2":
			return [0,0,1,1,0];
			break;
		case "$7":
		case "$a3":
			return [0,0,1,1,1];
			break;
		case "$8":
		case "$t0":
			return [0,1,0,0,0];
			break;
		case "$9":
		case "$t1":
			return [0,1,0,0,1];
			break;
		case "$10":
		case "$t2":
			return [0,1,0,1,0];
			break;
		case "$11":
		case "$t3":
			return [0,1,0,1,1];
			break;
		case "$12":
		case "$t4":
			return [0,1,1,0,0];
			break;
		case "$13":
		case "$t5":
			return [0,1,1,0,1];
			break;
		case "$14":
		case "$t6":
			return [0,1,1,1,0];
			break;
		case "$15":
		case "$t7":
			return [0,1,1,1,1];
			break;
		case "$16":
		case "$s0":
			return [1,0,0,0,0];
			break;
		case "$17":
		case "$s1":
			return [1,0,0,0,1];
			break;
		case "$18":
		case "$s2":
			return [1,0,0,1,0];
			break;
		case "$19":
		case "$s3":
			return [1,0,0,1,1];
			break;
		case "$20":
		case "$s4":
			return [1,0,1,0,0];
			break;
		case "$21":
		case "$s5":
			return [1,0,1,0,1];
			break;
		case "$22":
		case "$s6":
			return [1,0,1,1,0];
			break;
		case "$23":
		case "$s7":
			return [1,0,1,1,1];
			break;
		case "$24":
		case "$t8":
			return [1,1,0,0,0];
			break;
		case "$25":
		case "$t9":
			return [1,1,0,0,1];
			break;
		case "$26":
		case "$k0":
			return [1,1,0,1,0];
			break;
		case "$27":
		case "$k1":
			return [1,1,0,1,1];
			break;
		case "$28":
		case "$gp":
			return [1,1,1,0,0];
			break;
		case "$29":
		case "$sp":
			return [1,1,1,0,1];
			break;
		case "$30":
		case "$fp":
			return [1,1,1,1,0];
			break;
		case "$31":
		case "$ra":
			return [1,1,1,1,1];
			break;
  }
}