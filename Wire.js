/**
 * Wenn das Kabel "gelesen" wird, stellt es fest, dass es auch erst mal ein potentiell neues Signal geschrieben bekommt.
 */

function Wire() {
	this.receivers = new Array()
}

Wire.prototype.receive = function(currentData) {
	this.currentData = currentData;
	
	for (var i = 0; i < this.receivers.length; i++) {
		var receiver = this.receivers[i];
		if(receiver.startIndex && receiver.endIndex) {
			currentData = currentData.slice(receiver.startIndex, receiver.endIndex+1)
		}
		
		receiver.comp[receiver.funct].call(receiver.comp, currentData);
	}
}

/**
 * 
 */
Wire.prototype.addReceiver = function(component, funct, startIndex, endIndex) {
	this.receivers.push({comp: component, startIndex: startIndex, funct: funct, endIndex: endIndex})
}