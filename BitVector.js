/**
 * The BitVector class cares about everything you need in your Bitrelated life.
 * 
 * As it is a BitVector, the internal structure is an array of 0s and 1s.
 * All operations react like bitvectors, even if future versions of this class
 * could use another internal representation.
 * The class is designed to be instanciated with several input types, see the
 * constructors.
 */

/**
 * The constructor can be used in several ways.
 * If just one parameter is given, the base is guessed. Otherwise see below.
 * If no options are given, the length is minimal.
 *
   * new Bitvector([0,0,1,0]) – interpretes the array's elements as bits,
     arr[0] is the MSB, arr[length-1] is the LSB
   * new Bitvector("8231") – interpretes the string as a decimal number
   * new Bitvector("0x8231") – interpretes the string as a hexacedicmal number
   * new Bitvector(5634) – interpretes the integer as a decimal number
 */
function BitVector(number) {
	this.arr = [];
	// case 1: the number is given as array
	if(number instanceof Array) {
		this.arr = number;
	}

	// case 2: the number is given as string
	// the javascript function parseInt detects the prefix 0x for hexadecimal
	if(typeof number == "string") {
		this.arr = parseInt(number).toString(2).split('');
	}
	
	// case 3: the number is given as integer
  if(typeof number == "number") {
  	this.arr = number.toString(2).split('');
  }
}

/**
 * This constructor takes also an object of options. The first parameter is the
 * number like in the constructor above.
 * The second parameter provides hints how the number has to be interpreted or
 * how the BitVector has to be built.
 * 
 * options = {base: int, length: int}
 */
function BitVector(number, options) {
	this.arr = []

}



/********************** Tests ************************/
tests = []
function testBitVector() {
	for(var i = 0; i < tests.length; i++) {
		tests[i]()
	}
}

tests.push(function() {
	console.log("as")
})
tests.push(function() {
	console.log("df")
})