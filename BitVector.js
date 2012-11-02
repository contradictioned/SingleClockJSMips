/**
 * The BitVector class cares about everything you need in your Bitrelated life.
 * 
 * As it is a BitVector, the internal structure is an array of 0s and 1s.
 * All operations react like bitvectors, even if future versions of this class
 * could use another internal representation.
 * The class is designed to be instanciated with several input types, see the
 * constructors.
 *
 * Internal Representation:
 * The BitVector is internally represented by an array as follows:
 * this.arr = [lsb, lsb+1, ..., msb-1, msb]
 * Therefore an input is encoded 'backwards' but can be accessed naturally as
 * array index = power of 2.
 * Example: 7 (base 10) = 0111 (base 2)
 *  => var bitvec = new BitVector(7);
 *     bitvec.get(0) // == 1
 *     bitvec.get(3) // == 0
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
 * 
 * Also options = {length: int} can be provided
 */
function BitVector(number, options) {
	this.arr = [];
	// case 1: the number is given as array
	if(number instanceof Array) {
		for(var i = 0; i < number.length; i++) {
			if(!(number[i] == 0 || number[i] == 1)) {
				throw "BitVector(array) expects array of {0,1}"
			} else {
				number[i] = parseInt(number[i])
			}
		}
		this.arr = number.reverse();
	}

	// case 2: the number is given as string
	// the javascript function parseInt detects the prefix 0x for hexadecimal
	if(typeof number == "string") {
		this.arr = parseInt(number).toString(2).split('').reverse();
	}
	
	// case 3: the number is given as integer
  if(typeof number == "number") {
  	this.arr = number.toString(2).split('').reverse();
  }

  if(options && options.size) {
  	// controlled ditch
  	if(options.size < this.arr.size) {
  		throw "The value of the BitVector is too big to fit in the requested size."
  	}
  }
}


/**
 * Checks for equality of BitVectors.
 * If the two BitVectors don't have the same lenght, they are considered unequal.
 */
BitVector.prototype.equals = function(op) {
  if(op instanceof BitVector) {
	if(op.length() != this.length()) {
		return false;
	}
	for(var i = 0; i < this.length(); i++) {
		if(op.get(i) != this.get(i)) {
			return false;
		}
	}
	return true;

  } else { // op is not a BitVector
  	return this.equals(new BitVector(op));
  }
}

/**
 * Returns the size of this BitVector
 */
BitVector.prototype.length = function() {
	return this.arr.length;
}

/**
 * Returns the BitVector as a string, MSB first, LSB last. i.e.:
 * new BitVector([0,1,0,1]) => "0101"
 */
BitVector.prototype.toString = function() {
  var res = ""
  for(var i = 0; i < this.arr.length; i++) {
  	res = this.get(i) + res;
  }
  return res;
}

/**
 * Gets element No index from the BitVector.
 * get(LSB) = get(0)
 */
BitVector.prototype.get = function(index) {
	return this.arr[index];
}

/**
 * Returns the integer value of the Bitvector
 */
BitVector.prototype.toInt = function() {
	var value = 0;
	for(var i = 0; i < this.length(); i++) {
		value = value + this.get(i) * Math.pow(2,i)
	}
	return value;
}


/********************** Tests ************************/
tests = []
function testBitVector() {
	var count = 0;
	for(var i = 0; i < tests.length; i++) {
		count = count + tests[i]()
	}
	console.log("Tests are finished, non errors in: " + count + " of " + tests.length)
}

// bitvector from array with {0,1} should be built
tests.push(function() {
	var right = [0,1,1,0]
	return 1;
})

// bitvector from array with {0,1,x} should not be built
tests.push(function() {
	var wrong = [0,1,2,0]
	try {
		new BitVector(wrong);
	} catch(e) {
		return 1;
	}
	throw "BitVector() accepted array with a 2 in it"
})

// bitvector from array with {"0", "1"} should be built
tests.push(function() {
	var right = [0,1,"1","0"]
	return 1;
})

// bitvector from array with {"0", "1", "x"} should not be built
tests.push(function() {
	var wrong1 = [0,1,"",0]
	var wrong2 = [0,1,"one",0]
	var wrong3 = [0,1,"2",0]
	var wrong4 = [0,1,"a",0]
	try {
		new BitVector(wrong1);
		new BitVector(wrong2);
		new BitVector(wrong3);
		new BitVector(wrong4);
	} catch(e) {
		return 1;
	}
	throw "BitVector() accepted array with a invalid char in it"
})
