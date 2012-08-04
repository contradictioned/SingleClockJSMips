/**
 * Wenn das Kabel "gelesen" wird, stellt es fest, dass es auch erst mal ein potentiell neues Signal geschrieben bekommt.
 */

function Wire() {
	this.receivers = new Array()
}

Wire.prototype.receive = function(currentData) {
	this.currentData = currentData;
	for (var i = 0; i < this.receivers.length; i++) {
		this.receivers.comp.send(currentData.slice(this.receivers.startIndex, this.receivers.endIndex));
	}
}

/**
 * 
 */
Wire.prototype.addReceiver = function(component, startIndex, endIndex) {
	receivers.push({comp: component, startIndex: startIndex, endIndex: endIndex})
}