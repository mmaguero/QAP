/**
 * Funciones Utiles
 */

var Utiles = function() {
	//
}

Utiles.permutar = function(min, max, tam) {
	var permutando = [], sig;

	for (var i = 0; i < tam; i++) {
		sig = Math.floor(Math.random() * (max - min)) + min;

		while (permutando.indexOf(sig) > -1)
			sig = Math.floor(Math.random() * (max - min)) + min;

		permutando.push(sig);
	}

	return permutando;
}

Utiles.calFitnessUtil = function(solucion, flujos, distancias) // array integer
{
	var fitness = 0, granjaA, granjaB, longitud = solucion.length;

	for (var i = 0; i < longitud; i++)
		for (var j = i; j < longitud; j++)
			if (i != j) {
				granjaA = solucion[i];
				granjaB = solucion[j];
				fitness += (distancias[i][j] * flujos[granjaA][granjaB]);
			}

	return 2 * fitness;
}

Utiles.cruzar = function(tamSolucion, corteA, corteB, padre1, padre2) {
	var hijo = [];

	for (var i = 0; i < tamSolucion; i++)
		hijo.push(-1);

	for (var i = corteA; i <= corteB; i++)
		hijo[i] = padre1[i];

	var uno = (corteB + 1) % tamSolucion;
	var dos = (corteB + 1) % tamSolucion;

	var idx;
	while (uno != corteA) {
		idx = hijo.indexOf(padre2[dos]);
		if (idx < 0) {
			hijo[uno] = padre2[dos];
			uno = (uno + 1) % tamSolucion;
		}

		dos = (dos + 1) % tamSolucion;
	}

	return hijo;
}

Utiles.impresion = function(lugar, algoritmo, solucion, generacion, fitness,
		fecha) {
    var salida;
	fecha = (fecha != null) ? fecha.getDate() + "/" + (fecha.getMonth() + 1)
			+ "/" + fecha.getFullYear() + " " + fecha.getHours() + ":"
			+ fecha.getMinutes() + ":" + fecha.getSeconds() + ":"
			+ fecha.getMilliseconds() : fecha;

	if (lugar == 'I') {
		salida+='<br><br><a href="Index.html" title="Se perderán los resultados al recargar la página">Volver</a>';
		salida+="<br>"
				+ ((algoritmo == 'B')
						? "<h3>Algoritmo Básico</h3>"
						: (algoritmo == 'L')
								? "<h3>Algoritmo inspirado en Lamarck</h3>"
								: "<h3>Algoritmo inspirado en Baldwin</h3>"
				+ "<small>Inicio " + fecha + "</small>");
	} else if (lugar == 'D')
		salida+="<p>Generación " + generacion + "</p>" + "<p>Fitness "
				+ fitness.toLocaleString() + "</p>";
	else if (lugar == 'F') {
		salida+="<hr>" + "<h4>Resultado</h4>" + "<small>Fin " + fecha
				+ "</small>" + "<p>Generaciones " + generacion + "</p>"
				+ "<p>Fitness " + fitness.toLocaleString() + "</p>";
		for ( var i in solucion)
			salida+=solucion[i] + "\t";
		salida+='<br><br><a href="Index.html" title="Se perderán los resultados al recargar la página">Volver</a>';
	} else {
		salida+="<p>" + lugar + "</p>";
		salida+='<br><br><a href="Index.html" title="Se perderán los resultados al recargar la página">Volver</a>';
	}
	document.writeln(salida); console.log(salida);
}