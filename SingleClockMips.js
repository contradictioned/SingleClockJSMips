/**
 * The configuration file if you will....
 */

var global = new Object();

// Komponenten initialisieren
global.programCounter = new ProgramCounter();
global.instructionMemory = new InstructionMemory();
global.registerSet = new RegisterSet();
global.alu = new ALU();
global.aluCtrl = new AluCtrl();
global.memory = new Memory();
global.control = new Control();

global.instRegMulti = new Multiplexer();
global.regAluMulti = new Multiplexer();
global.memRegMulti = new Multiplexer();
global.branchMulti = new Multiplexer();
global.jumpMulti = new Multiplexer();

global.jumpShift = new Shift();
global.immediateShift = new Shift();

global.signExt = new SignExt();
global.pcInc = new Adder();
global.branchAdder = new Adder();

global.join = new Join();
global.andGate = new AndGate();
global.theFour = new ConstGate(4);


// Kabel, das aus dem Befehlsspeicher herausführt, Breite: 32 bit.
// Die Sortierung ist ein wenig bescheiden (anders als im Script).
// 
// Die Kabel laufen (vereinfacht) so:
// R-Typ: 
//   - 0..5 Opcode -> Control
//   - 6..10 RsAddr -> Registersatz
//   - 11..15 RtAddr -> Registersatz
//   - 16..20 RdAddr -> Registersatz
//   - 21..25 Shamt ->  ALU
//   - 26..31 Func -> ALU Control
// J-Typ:
//   - 0..5 Opcode -> Control
//   - 6..31 Address -> PC
// I-Typ:
//   - 0..5 Opcode -> Control
//   - 6..10 RsAddr -> Registersatz
//   - 11..15 RtAddr -> Registersatz
//   - 16..31 Immediate -> ÜBERALLHIN!
//
var instrMemWire = new Wire();
global.instructionMemory.outWire = instrMemWire;

// instructionMemory -> registerSet
instrMemWire.addReceiver(global.registerSet, "receiveRsAddr", 6, 10);
instrMemWire.addReceiver(global.registerSet, "receiveRtAddr", 11, 15);

// instructionMemory -> multiplexer -> registerSet
instrMemWire.addReceiver(global.instRegMulti, "receive0", 11, 15);
instrMemWire.addReceiver(global.instRegMulti, "receive1", 16, 20);
var multiRegWire = new Wire();
multiRegWire.addReceiver(global.registerSet, "receiveRdAddr")

// instructionMemory -> Control
instrMemWire.addReceiver(global.control, "receiveOpcode", 0, 5)

// instructionMemory -> jumpShift
instrMemWire.addReceiver(global.jumpShift, "receive", 6, 31)

// instructionMemory -> signExt
instrMemWire.addReceiver(global.signExt, "receive", 16, 31)

// instructionMemory -> aluCtrl
instrMemWire.addReceiver(global.aluCtrl, "receiveFunc", 26, 31)

// ENDE Befehlsspeicher


// Kabel, das aus der Control herausführt, Breite: 9 bit
//
// Die Kabel laufen (vereinfacht) so:
//   - 0 RegDst
//   - 1 Jump
//   - 2 Branch
//   - 3..4 ALUOp
//   - 5 MemToReg
//   - 6 MemWrite
//   - 7 ALUSrc
//   - 8 RegWrite
var controlWire = new Wire();
global.control.outWire = controlWire;
controlWire.addReceiver(global.instRegMulti, "receiveSwitch", 0);
controlWire.addReceiver(global.jumpMulti, "receiveSwitch", 1);
controlWire.addReceiver(global.andGate, "receive0", 2);
controlWire.addReceiver(global.aluCtrl, "receiveAluOp", 3, 4);
controlWire.addReceiver(global.memRegMulti, "receiveSwitch", 5);
controlWire.addReceiver(global.memory, "receiveMemWrite", 6);
controlWire.addReceiver(global.regAluMulti, "receiveSwitch", 7);
controlWire.addReceiver(global.registerSet, "receiveRegWrite", 8);

// ENDE Control


// Registersatz -> ALU
var rsAluWire = new Wire();
global.registerSet.rsWire = rsAluWire;
rsAluWire.addReceiver(global.alu, "receiveOp0", 0, 31);

var rtAluWire = new Wire();
global.registerSet.rtWire = rtAluWire;
rtAluWire.addReceiver(global.regAluMulti, "receive0");
rtAluWire.addReceiver(global.memory, "receiveData");

var multiAluWire = new Wire();
global.regAluMulti.outWire = multiAluWire;
multiAluWire.addReceiver(global.alu, "receiveOp1");

// ENDE Registersatz


// ALUCtrl
var aluCtrlWire = new Wire();
global.aluCtrl.outWire = aluCtrlWire;
aluCtrlWire.addReceiver(global.alu, "receiveCtrl");

// SignExtWire
var signExtWire = new Wire();
global.signExt.outWire = signExtWire;
signExtWire.addReceiver(global.immediateShift, "receive");

// ALU Outputs
var aluOutWire = new Wire();
global.alu.outWire = aluOutWire;
aluOutWire.addReceiver(global.memory, "receiveAdr");
aluOutWire.addReceiver(global.memRegMulti, "receive0");

var aluZeroWire = new Wire();
global.alu.zeroWire = aluZeroWire;
zeroWire.addReceiver(global.andGate, "receive1");

var branchMultiWire = new Wire();
global.andGate.outWire = branchMultiWire;
branchMultiWire.addReceiver(global.branchMulti, "receiveSwitch")

// ENDE ALU Outputs


// MemMulti
var dataWire = new Wire();
global.memory.outWire = dataWire;
dataWire.addReceiver(global.memRegMulti, "receive1");

var memRegWire = new Wire();
global.memRegMulti.outWire = memRegWire;
memRegWire.addReceiver(global.registerSet, "receiveRd");

// ENDE MemMulti

// immediate
var shiftedImmWire = new Wire();
global.immediateShift.outWire = shiftedImmWire;
shiftedImmWire.addReceiver(global.branchAdder, "receive1");

// PC out
var pcOutWire = new Wire();
global.programCounter.outWire = pcOutWire;
pcOutWire.addReceiver(global.pcInc, "receive1");
pcOutWire.addReceiver(global.instructionMemory, "receive");

// constant 4
var fourWire = new Wire();
global.theFour.outWire = fourWire;
fourWire.addReceiver(global.pcInc, "receive0");

// incremented pc
var incPcWire = new Wire();
global.pcInc.outWire = incPcWire;
incPcWire.addReceiver(global.branchAdder, "receive0");
incPcWire.addReceiver(global.branchMulti, "receive0");
incPcWire.addReceiver(global.join, "receive0");

// join
var shiftedJumpWire = new Wire();
global.jumpShift.outWire = shiftedJumpWire;
shiftedJumpWire.addReceiver(global.join, "receive1");

var joinedJumpWire = new Wire();
global.join.outWire = joinedJumpWire;
joinedJumpWire.addReceiver(global.jumpMulti, "receive0")

// branch wire
var branchWire = new Wire();
global.branchAdder.outWire = branchWire;
branchWire.addReceiver(global.branchMulti, "receive1");

var jumpWire = new Wire();
global.branchMulti.outWire = jumpWire;
jumpWire.addReceiver(global.jumpMulti, "receive0")

// feedback to pc
var pcWire = new Wire();
global.jumpMulti.outWire = pcWire;
pcWire.addReceiver(global.programCounter, "receive")


// mocks
//global.instructionMemory.push("add $7, $1, $3");
//global.instructionMemory.exec();