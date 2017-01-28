/**
 * Cromosoma de solución
 */

function obtSolucion() {
	return this.solucion;
}

function asiSolucion(solucion) {
	this.solucion = solucion;
}

function obtFitness() {
	return this.fitness;
}

function asiFitness(fitness) {
	this.fitness = fitness;
}

function obtHerencia() {
	return this.herencia;
}

function asiHerencia() {
	this.herencia = this.solucion.slice(0, this.solucion.length);
}

function calFitness(datos) {
	this.fitness = Utiles.calFitnessUtil(this.solucion, flujos, distancias);
}

function Cromosoma(solucion, datos) {
	this.solucion = solucion.slice(0, solucion.lenth);
	this.herencia;
	this.fitness;
	//
	this.obtSolucion = obtSolucion;
	this.asiSolucion = asiSolucion;
	this.obtFitness = obtFitness;
	this.asiFitness = asiFitness;
	this.obtHerencia = obtHerencia;
	this.asiHerencia = asiHerencia;
	this.calFitness = calFitness;
	//
	this.calFitness(datos);
}