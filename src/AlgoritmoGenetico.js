/**
 * Algoritmos genéticos simples: básico, baldwin, lamarck
 */
 
var afectados = 0.9, proMutacion = 0.3, proOptimizacion = 0.95;

function exeAlgGenetico(poblacion, algoritmo) {

	var fecha = new Date(); 
	Utiles.impresion('I', algoritmo, null, null, null, fecha);

	var aPoblacion = [], permutacion = [];

	for (var i = 0; i < poblacion; i++) {
		permutacion = Utiles.permutar(0, obtTamanho(), obtTamanho());
		aPoblacion[i] = new Cromosoma(permutacion, this.datos);
		aPoblacion[i].asiHerencia();
	}

	if (algoritmo != 'W')
		poblacion = aPoblacion.length;

	aPoblacion.sort(function(a, b) {
		return a.fitness - b.fitness
	});

	var operacion = new Operaciones(), fin = false, generaciones = 0, pobAnterior, mejor, probable;

	while (!fin) {

		generaciones++;

		pobAnterior = aPoblacion.length;

		mejor = aPoblacion[0].obtFitness();

		for (var i = 0; i < pobAnterior - 1; i++)
			operacion.cruce(aPoblacion, this.datos, aPoblacion[i],
					aPoblacion[i + 1]);
		
		var i = Math.floor(aPoblacion.length*afectados);
		for (i; i < aPoblacion.length; i++) {
			probable = Math.random();
			if (probable > proMutacion)
				operacion.muta(aPoblacion[i], this.datos);
		}

		if (algoritmo != 'B')
			for ( var c in aPoblacion) {
				probable = Math.random();
				if (probable > proOptimizacion)
					operacion.algVoraz(this.datos, aPoblacion[c]);
			}

		aPoblacion.sort(function(a, b) {
			return a.fitness - b.fitness
		});

		while (aPoblacion.length != poblacion)
			aPoblacion.splice(poblacion, 1);

		if (aPoblacion[0].obtFitness() >= mejor)
			fin = true;

		Utiles.impresion('D', 'L', aPoblacion[0].obtSolucion(), generaciones,
				aPoblacion[0].obtFitness(), null);
	}

	fecha = new Date();
	Utiles.impresion('F', 'L', aPoblacion[0].obtSolucion(), generaciones,
			aPoblacion[0].obtFitness(), fecha);
}

function AlgoritmoGenetico(datos) {
	this.datos = datos;
	this.exeAlgGenetico = exeAlgGenetico;
}
