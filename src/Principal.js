/**
 * Main
 */
function Principal() {
}

Principal.proArchivo = function(archivo) {

	if (typeof window.FileReader === "undefined") {
		alert("No es soportado el 'File API', por tanto no se podrá cargar el archivo de matrices");
		return;
	}

	var file = archivo[0];

	var reader = new FileReader(), output;

	reader.onload = function(e) {
		output = document.getElementById("matrices");
		output.textContent = e.target.result;
	};
	reader.readAsText(file);
}

Principal.ejecutar = function(archivo, poblacion, algoritmo) {

	if (archivo.length <= 0 || poblacion.trim().length <= 0) {
		alert("Todos los campos son requeridos");
		return;
	} else {
		poblacion = parseInt(poblacion);
	}

	var dataQAP = new Data(archivo);
	try {
		dataQAP.leeArchivo();
	} catch (err) {
		Utiles.impresion("Excepción capturada: " + err.message, null, null,
				null, null, null);
	}

	var algGenetico = new AlgoritmoGenetico(dataQAP); // 44759294
	algGenetico.exeAlgGenetico(poblacion, algoritmo);
}