/**
 * Datos de entrada / salida
 */

var flujos = [], distancias = [], tamanho;

function obtTamanho() {
	return tamanho;
}

function leeArchivo() {
	try {

		var lineas = this.archivo.split("\n"), itemsA = [], itemsB = [], posA, posB;
		for (var h = lineas.length; h--;) {
			if (lineas[h].trim().length <= 0)
				lineas.splice(h, 1);
		}

		tamanho = parseInt(lineas[0].trim());
		flujos = [tamanho];
		distancias = [tamanho];

		for (var i = 0; i < tamanho; i++) {

			posA = i + 1;
			itemsA = lineas[posA].trim().split(" ");
			flujos[i] = new Array(tamanho);
			for (var j = 0; j < tamanho; j++)
				flujos[i][j] = itemsA[j];

			posB = i + 1 + tamanho;
			itemsB = lineas[posB].trim().split(" ");
			for (var k = itemsB.length; k--;) {
				if (itemsB[k].trim().length <= 0)
					itemsB.splice(k, 1);
			}
			distancias[i] = new Array(tamanho);
			for (var j = 0; j < tamanho; j++)
				distancias[i][j] = itemsB[j];
		}

	} catch (err) {
		Utiles.impresion("Excepción capturada: " + err.message, null, null,
				null, null, null);
	}
}

function Data(archivo) {
	this.archivo = archivo;
	this.leeArchivo = leeArchivo;
}