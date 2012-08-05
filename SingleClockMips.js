/**
 * The configuration file if you will....
 */

var global = new Object();

// Komponenten initialisieren
global.instructionMemory = new InstructionMemory();
global.registerSet = new RegisterSet();
global.alu = new ALU();
global.memRegMulti = new Multiplexer();
global.control = new Control();

// instructionMemory -> registerSet
var memRegWire = new Wire();
global.instructionMemory.outWire = memRegWire;
memRegWire.addReceiver(global.registerSet, "receiveRsAddr", 6, 10);
memRegWire.addReceiver(global.registerSet, "receiveRtAddr", 11, 15);

// instructionMemory -> multiplexer -> registerSet
memRegWire.addReceiver(global.memRegMulti, "receive1", 11, 15);
memRegWire.addReceiver(global.memRegMulti, "receive2", 16, 20);
var multiRegWire = new Wire();
multiRegWire.addReceiver(global.registerSet, "receiveRdAddr")


// registerSet -> ALU
var rsAluWire = new Wire();
global.registerSet.rsWire = rsAluWire;
rsAluWire.addReceiver(global.alu, "receiveOp1", 0, 31)

// controll wires
var regDstWire = new Wire();
regDstWire.addReceiver(global.memRegMulti, "sel")

var regWriteWire = new Wire();
var aluSrcWire = new Wire();
var branchWire = new Wire();
var memWriteWire = new Wire();
var memToRegWire = new Wire();
var jumpWire = new Wire();
var aluOpWire = new Wire();


// mocks
global.instructionMemory.push("add $7, $1, $3");
global.instructionMemory.exec();