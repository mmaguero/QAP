/**
 * Operaciones que implican una evolución
 */

function cruce(poblacion, datos, padre, madre) {
	var tamSolucion = padre.obtSolucion().length;

	var corteA = Math.floor(Math.random() * (tamSolucion - 1));
	var corteB = Math.floor(Math.random() * (tamSolucion - corteA)) + corteA;

	if (corteA == corteB)
		corteB++;

	var hijo = Utiles.cruzar(tamSolucion, corteA, corteB, padre.obtSolucion(), madre.obtSolucion());
	var hermano = Utiles.cruzar(tamSolucion, corteA, corteB, madre.obtSolucion(), padre.obtSolucion());

	var hijoAdd = new Cromosoma(hijo, datos);
	var hermanoAdd = new Cromosoma(hermano, datos);

	poblacion.push(hijoAdd);
	poblacion.push(hermanoAdd);
}

function muta(cromosoma, datos) {
	var tamSolucion = cromosoma.obtSolucion().length;

	var uno = Math.floor(Math.random() * (tamSolucion - 1));
	var dos = Math.floor(Math.random() * (tamSolucion - 1));

	var valorUno = cromosoma.obtSolucion()[uno];
	var valorDos = cromosoma.obtSolucion()[dos];

	cromosoma.obtSolucion()[uno] = valorDos;
	cromosoma.obtSolucion()[dos] = valorUno;

	cromosoma.asiHerencia();

	cromosoma.calFitness(datos);
}

function algVoraz(datos, cromosoma) {
	var mejor = cromosoma.obtFitness();
	var tamSolucion = cromosoma.obtSolucion().length;

	var modificar = false, croLocal, nueva, valorUno, valorDos;

	for (var i = 0; i < tamSolucion - 1; i++) {
		modificar = false;
		for (var j = i + 1; j < tamSolucion && !modificar; j++) {
			croLocal = new Cromosoma(cromosoma.obtSolucion().slice(0,
					tamSolucion), datos);

			valorUno = cromosoma.obtSolucion()[i];
			valorDos = cromosoma.obtSolucion()[j];

			croLocal.obtSolucion()[i] = valorDos;
			croLocal.obtSolucion()[j] = valorUno;

			croLocal.calFitness(datos);

			nueva = croLocal.obtFitness();

			if (nueva < mejor) {
				modificar = true;
				cromosoma.asiSolucion(croLocal.obtSolucion().slice(0,
						croLocal.obtSolucion().length));
				cromosoma.asiFitness(nueva);
				mejor = nueva;
			}
		}
	}
}

function Operaciones() {
	this.cruce = cruce;
	this.muta = muta;
	this.algVoraz = algVoraz;
}
