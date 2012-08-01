/**
 * Wenn das Kabel "gelesen" wird, stellt es fest, dass es auch erst mal ein potentiell neues Signal geschrieben bekommt.
 */

function Wire(componentFrom, componentTo) {
	this.componentFrom = componentFrom;
	this.componentTo = componentTo;
}

Wire.prototype.receive = function(currentData) {
	this.currentData = currentData;
	this.componentTo.setInput(currentData);
}