/**
 * Der Taktsignalgenerator. Modeliert ein flankengesteuertes Signal.
 */
function Clock() {
	this.registeredComponents = new Array();
}

/**
 * Registriert eine Komponente, die dann vom Takt ausgelöst wird.
 */
Clock.prototype.register = function(component) {
	if(component != undefined) {
		this.registeredComponents.push(component);
	}
}

/**
 * Die Cycle-Methode beschreibt einen neuen Zyklus in allen registrierten Komponenten.
 */
Clock.prototype.cycle = function() {
	for(var i = 0; i < registeredComponents.length; i++) {
		if(registeredComponents[i] != undefined) {
			this.registeredComponents[i].exec();
		}
	}
}