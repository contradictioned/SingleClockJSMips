/**
 * calculates the numerical value of a given bitvector
 */
function bitVectorToValue(vector) {
	var value = 0;
	for(var i = vector.length - 1; i >= 0; i--) {
		value = value + vector[i] * Math.pow(2,vector.length - i - 1)
	}
	return value;
}

log = function(message) {
  if (typeof console != "undefined") {
    console.log(message)
  }
}