/**
 * Modellierung des Befehlsspeichers, hier nur als ganz einfaches Array von Strings, das eben abgearbeitet wird.
 * Fürs bessere Verständnis sind die Befehle im Assemblercode hinterlegt und werden hier erst übersetzt.
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
	var bitVector = this.decode(this.instructions[this.current]);
	this.outWire.receive(bitVector)

}

InstructionMemory.prototype.push = function(text) {
	this.instructions.push(text)
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
	// either we have a pair of brackets (LW, SW) or not
	if(rest.indexOf(',') != -1 && rest.indexOf('(') == -1) {
		var reg2 = rest.slice(0, rest.indexOf(','));
		rest = rest.slice(rest.indexOf(' ') + 1);
	} else if (rest.indexOf(',') != -1 && rest.indexOf('(') != -1) {
		var ls_offset = rest.slice(0, rest.indexOf('('));
		var reg2 = rest.slice(rest.indexOf('(') + 1, rest.indexOf(')'));
	}

	if(rest.indexOf('$') != -1) {
		var reg3 = rest;
		rest = undefined;
	}
	
	switch(instr){
		// Arithmetics ////////////////////////
		case "add":
			// add $rd, $rs, $rt  --  $rd <- $rs + $rt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,0,0,0]; // 32
			break;
		case "addu":
			// add $rd, $rs, $rt  --  $rd <- $rs + $rt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,0,0,1]; // 33
			break;
		case "addi":
			// add $rt, $rs, immediate  --  $rt <- $rs + immediate
			this.type = "I";
			var opcode = [0,0,1,0,0,0]; // 8
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		case "addiu":
			// add $rt, $rs, immediate  --  $rt <- $rs + immediate
			this.type = "I";
			var opcode = [0,0,1,0,0,1]; // 9
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		case "sub":
			// sub $rd, $rs, $rt  --  $rd <- $rs - $rt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,0,1,0]; // 34
			break;
		case "subu":
			// sub $rd, $rs, $rt  --  $rd <- $rs - $rt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,0,1,1]; // 35
			break;
		// Logical ////////////////////////
		case "and":
			// and $rd, $rs, $rt  --  $rd <- $rs & $rt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,1,0,0]; // 36
			break;
		case "andi":
			// andi $rt, $rs, immediate  --  $rt <- $rs & immediate
			this.type = "I";
			var opcode = [0,0,1,1,0,0]; // 12
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		case "or":
			// or $rd, $rs, $rt  --  $rd <- $rs | $rt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,1,0,1]; // 37
			break;
		case "ori":
			// ori $rt, $rs, immediate  --  $rt <- $rs | immediate
			this.type = "I";
			var opcode = [0,0,1,1,0,1]; // 13
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		case "nor":
			// nor $rd, $rs, $rt  --  $rd <- !($rs | $rt)
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,1,1,1]; // 39
			break;
		case "xor":
			// xor $rd, $rs, $rt  --  $rd <- $rs ⊻ $rt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,0,1,1,0]; // 38
			break;
		case "xori":
			// xori $rt, $rs, immediate  --  $rt <- $rs ⊻ immediate
			this.type = "I";
			var opcode = [0,0,1,1,1,0]; // 14
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		// Comparison ////////////////////////
		case "slt":
			// slt $rd, $rs, $rt  --  $rd = $rs < $rt ? 1 : 0
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,1,0,1,0];
			break;
		case "sltu":
			// sltu $rd, $rs, $rt  --  $rd = $rs < $rt ? 1 : 0
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg3);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [1,0,1,0,1,1];
			break;
		case "slti":
		  // slti $rt, $rs, immediate -- $rt = $rs < immediate ? 1 : 0
			this.type = "I";
			var opcode = [0,0,1,0,1,0]; // 10
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		case "sltiu":
			// slti $rt, $rs, immediate -- $rt = $rs < immediate ? 1 : 0
			this.type = "I";
			var opcode = [0,0,1,0,1,1]; // 11
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		// Shift ////////////////////////
		case "sll":
		  // sll $rd, $rt, shamt -- $rd <- $rt << shamt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = [0,0,0,0,0];
			var rt = this.decodeRegister(reg2);
			var rd = this.decodeRegister(reg1);
			var shamt = decodeShamt(rest);
			var funct = [0,0,0,0,0,0];
			break;
		case "sllv":
			// sll $rd, $rt, $rs -- $rd <- $rt << $rs
			this.type = "R";
			var opcode = [0,0,0,0,0,0]
			var rs = this.decodeRegister(reg3);
			var rt = this.decodeRegister(reg2);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [0,0,0,1,0,0]; // 4
			break;
		case "srl":
			// srl $rd, $rt, shamt -- $rd = $rt >> shamt
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rt = this.decodeRegister(reg2);
			var rd = this.decodeRegister(reg1);
			var shamt =decodeShamt(rest);
			var funct = [0,0,0,0,1,0]; // 2
			break;
		case "sra":
			// sra $rd, $rt, shamt -- $rd = $rt >> shamt
			this.type = "R";
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rt = this.decodeRegister(reg2);
			var rd = this.decodeRegister(reg1);
			var shamt =decodeShamt(rest);
			var funct = [0,0,0,0,1,1]; // 3
			break;
		case "srlv":
			// srlv $rd, $rt, $rs -- $rd <- $rt >> $rs
			this.type = "R";
			var opcode = [0,0,0,0,0,0]
			var rs = this.decodeRegister(reg3);
			var rt = this.decodeRegister(reg2);
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [0,0,0,1,1,0]; // 6
			break;
		// Branching ////////////////////////
		case "j":
			// j addr -- goto addr*4
			this.type = "J";
			var opcode = [0,0,0,0,1,0]; // 2
			var target = decodeTarget(rest);
			break;
		case "jr":
			// jr $rs -- goto $rs
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg1);
			var rt = [0,0,0,0,0];
			var rd = [0,0,0,0,0];
			var shamt = [0,0,0,0,0];
			var funct = [0,0,1,0,0,0]; // 8
			break;
		case "jal":
			// j addr -- goto addr*4
			this.type = "J";
			var opcode = [0,0,0,0,1,1]; // 3
			var target = decodeTarget(rest);
			break;
		case "beq":
			// beq $rs, $rt, immediate -- if $rs = $rt goto immediate * 4
			this.type = "I";
			var opcode = [0,0,0,1,0,0]; // 4
			var rs = this.decodeRegister(reg1);
			var rt = this.decodeRegister(reg2);
			var immediate = this.decodeImmediate(rest);
			break;
		case "bne":
			// beq $rs, $rt, immediate -- if $rs != $rt goto immediate * 4
			this.type = "I";
			var opcode = [0,0,0,1,0,1]; // 5
			var rs = this.decodeRegister(reg1);
			var rt = this.decodeRegister(reg2);
			var immediate = this.decodeImmediate(rest);
			break;
		// Data transport ////////////////////////
		case "lw":
			// lw $rt, immediate($rs) -- $rt <- MEM[$rs + immediate]
			this.type = "I";
			var opcode = [1,0,0,0,1,1]; // 35
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(ls_offset);
			break;
		case "sw":
			// sw $rt, immediate($rs) -- MEM[$rs + immediate] <- $rt
			this.type = "I";
			var opcode = [1,0,1,0,1,1]; // 43
			var rs = this.decodeRegister(reg2);
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(ls_offset);
			break;
		case "lui":
		  // lui $rt, immediate -- $rt <- immediate << 16
			this.type = "I";
			var opcode = [0,0,1,1,1,1];
			var rs = [0,0,0,0,0];
			var rt = this.decodeRegister(reg1);
			var immediate = this.decodeImmediate(rest);
			break;
		case "mfhi":
			// mfhi $rd -- $rd <- HI
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = [0,0,0,0,0];
			var rt = [0,0,0,0,0];
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [0,1,0,0,0,0]; // 16
			break;
		case "mflo":
			// mflo $rd -- $rd <- LO
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = [0,0,0,0,0];
			var rt = [0,0,0,0,0];
			var rd = this.decodeRegister(reg1);
			var shamt = [0,0,0,0,0];
			var funct = [0,1,0,0,1,0]; // 18
			break;
		case "mthi":
			// mthi $rs -- HI <- $rs
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg1);
			var rt = [0,0,0,0,0];
			var rd = [0,0,0,0,0];
			var shamt = [0,0,0,0,0];
			var funct = [0,1,0,0,0,1]; // 17
			break;
		case "mtlo":
			// mtlo $rs -- LO <- $rs
			this.type = "R";
			var opcode = [0,0,0,0,0,0];
			var rs = this.decodeRegister(reg1);
			var rt = [0,0,0,0,0];
			var rd = [0,0,0,0,0];
			var shamt = [0,0,0,0,0];
			var funct = [0,1,0,0,1,1]; // 19
			break;
		default:
			throw "Instruction not supported."
	}

	// now build the resulting bitvector according to the type
	switch(this.type) {
		case "R":
			this.binaryCode = opcode.concat(rs).concat(rt).concat(rd).concat(shamt).concat(funct);
			break;
		case "I":
			this.binaryCode = opcode.concat(rs).concat(rt).concat(immediate);
			break;
		case "J":
			this.binaryCode = opcode.concat(target);
			break;
	}

	// another validty check
	if (this.binaryCode.length != 32) {
		throw "Tried to decode `" + instruction + "` but binary length was not 32 but " + this.binaryCode.length;
	}

	return this.binaryCode;

}

/**
 * 
 */
InstructionMemory.prototype.decodeShamt = function(shamt) {
	var bitVector = parseInt(shamt).toString(2).split("");

	while(bitVector.length < 5) {
		bitVector = [0].concat(bitVector);
	}

	if(bitVector.length != 5){
		throw "Shift amount length has to be 5 bits, but actual length is " + bitVector.length;
	}

	return bitVector
}

/**
 *
 */
InstructionMemory.prototype.decodeImmediate = function(immediate) {
	var bitVector = parseInt(immediate).toString(2).split("");

	while(bitVector.length < 16) {
		bitVector = [0].concat(bitVector);
	}

	if(bitVector.length != 16){
		throw "Immediate length has to be 16 bits, but actual length is " + bitVector.length;
	}

	return bitVector;
}

/**
 *
 */
InstructionMemory.prototype.decodeTarget = function(immediate) {
	var bitVector = parseInt(immediate).toString(2).split("");
	
	while(bitVector.length < 26) {
		bitVector = [0].concat(bitVector);
	}

	if(bitVector.length != 26) {
		throw "Target length has to be 26 bits, but actual length is " + bitVector.length;
	}

	return bitVector;
}

/**
 * Takes an register as a String (either by name $v0 or by number %15) and
 * returns an bitvector.
 */
InstructionMemory.prototype.decodeRegister = function(register) {
  switch(register) {
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
  throw "Register name " + register + " not known."
}