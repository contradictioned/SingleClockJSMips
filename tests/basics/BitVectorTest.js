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