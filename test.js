/**
 * The idea is, that every test file is just executed and might throw errors at will.
 */

var fs = require('fs');

console.log('Starting test suite');

var testFiles = getAllTestFiles('tests/');
console.log('Testing with those files:')
console.log(testFiles);

var passed = 0; // lol counters.. callbacks don't work that way
var errors = 0;
console.log();

// call all test functions
for(var i = 0; i < testFiles.length; i++) {
	fs.readFile(__dirname + '/' + testFiles[i], function (err, data) {
	    if (err) throw err;
	    var tests = []
	    eval(data.toString());
	    for(var j = 0; j < tests.length; j++) {
	    	try {
	    		tests[j]();
	    		passed++;
	    	} catch(e) {
	    		console.log("[FAILED] " + e);
	    		errors++;
	    	}
	    }
	});
}


/**
 * This function is intended to collect files that contain test functions.
 * It should point to the topmost directory containing test files.
 *
 * Adjust this method if you want e.g. just files with a suffix like 'Test.js'
 */
function getAllTestFiles(parent) {
	var entries = fs.readdirSync(parent);
	
	var files = [];
	for(var i = 0; i < entries.length; i++) {
		var entry = fs.statSync(parent + entries[i])

		if(entry.isFile()) {
			files.push(parent + entries[i]);
		}
		if(entry.isDirectory()) {
			files = files.concat(getAllTestFiles(parent + entries[i] + '/'));
		}
	}
	return files;
}