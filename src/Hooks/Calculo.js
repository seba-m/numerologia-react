const vocales = ['A', 'E', 'I', 'O', 'U'];

const SistemaPitagorico = () => {
	let diccionario = {};
	let j = 1;
	for (let i = 65; i <= 90; i++) {
		diccionario[String.fromCharCode(i)] = j;
		j = (j++ >= 9) ? 1 : j++;
	}
	return diccionario;
}

function parseDate(input) {
	let parts = input.split('-');
	return new Date(parts[0], parts[1] - 1, parts[2]);
}

function esVocal(letra) {
	return letra && vocales.includes(letra);
}

function esConsonante(letra) {
	return !esVocal(letra);
}

class Paso {
	constructor(numero, suma, resultado) {
		this.numero = numero;
		this.suma = suma;
		this.resultado = resultado;
	}
}

class LetraPitagorica {
	constructor(letra, valor) {
		this.letra = letra;
		this.valor = valor;
	}
}

function reducirAUnaCifra(numeros) {
	let suma = 0, paso = 1;
	let unDigito = false;
	let pasos = []

	while (!unDigito) {
		for (let i = 0; i < numeros.length; i++) {
			suma += parseInt(numeros[i]);
		}

		unDigito = (suma.toString().length === 1);

		pasos.push(new Paso(paso, numeros.filter((n) => n > 0).join(' + '), suma))

		if (!unDigito) {
			numeros = suma.toString().split('');
			suma = 0;
			paso++;
		}
	}
	return { suma: suma, pasos: pasos };
}

function verificarYe(letraAnterior = null, letra, letraSiguiente = null, consonante = false) {
	if (letra !== 'Y') return false;
	return (esVocal(letraAnterior) || esVocal(letraSiguiente)) || (consonante && (esConsonante(letraAnterior) && esConsonante(letraSiguiente)))
}

function verificarVocales(letraAnterior, letra, letraSiguiente) {
	return esVocal(letra) || verificarYe(letraAnterior, letra, letraSiguiente);
}

function numeroDelAlma(n) {
	let sistemaPitagorico = SistemaPitagorico();
	let nombre = n.toUpperCase().replace(/[^A-Z]/g, '').split('');
	let letraAnterior, letraSiguiente = null;
	let letras = [];

	return [reducirAUnaCifra(
		nombre.map((letra, index) => {
			letraAnterior = nombre[index - 1];
			letraSiguiente = nombre[index + 1];
			if (verificarVocales(letraAnterior, letra, letraSiguiente)) {
				letras.push(new LetraPitagorica(letra.toLowerCase(), sistemaPitagorico[letra]));
				return sistemaPitagorico[letra];
			}
			else return 0;
		})
	), letras];
}

function numeroDeLaPersonalidad(n) {
	let sistemaPitagorico = SistemaPitagorico();
	let nombre = n.toUpperCase().replace(/[^A-Z]/g, '').split('');
	let letraAnterior, letraSiguiente = null;
	let letras = [];

	return [reducirAUnaCifra(
		nombre.map((letra, index) => {
			letraAnterior = nombre[index - 1];
			letraSiguiente = nombre[index + 1];
			if (!verificarVocales(letraAnterior, letra, letraSiguiente)) {
				letras.push(new LetraPitagorica(letra.toLowerCase(), sistemaPitagorico[letra]));
				return sistemaPitagorico[letra];
			}
			else return 0;
		})
	), letras];
}

function numeroDelPoderDelNombre(n) {
	let total = [...numeroDelAlma(n)[0].suma.toString().split(), ...numeroDeLaPersonalidad(n)[0].suma.toString().split()]
	return reducirAUnaCifra(total);
}

function numeroDeLaFechaDeNacimiento(f) {
	return reducirAUnaCifra(f.getDate().toString().split(''));
}

function numeroDeLaTrayectoriaDeLaVida(f) {
	let dia = f.getDate().toString().split('');
	let mes = (f.getMonth() + 1).toString().split('');
	let year = f.getFullYear().toString().split('');

	let fechas = [...dia, ...mes, ...year];

	return reducirAUnaCifra(fechas);
}

function numeroDeLaActitud(f) {
	let dia = f.getDate().toString().split('');
	let mes = (f.getMonth() + 1).toString().split('');

	let fechas = [...dia, ...mes];

	return reducirAUnaCifra(fechas);
}

class Numeros {
	constructor(nombre, numero, pasos, letrasPitagoricas = null) {
		this.nombre = nombre;
		this.numero = numero;
		this.pasos = pasos;
		this.letrasPitagoricas = letrasPitagoricas;
		this.id = '_' + Math.random().toString(36).substring(2, 9);
	}
}

export function Calculo(n, f) {
	let nombre = n?.trim().normalize("NFD").replace(/[^a-zA-Z ]/g, "");
	//let nombreSinNormalizar = n.value.trim();
	let fecha = new Date(parseDate(f));

	let alma = numeroDelAlma(nombre);
	let personalidad = numeroDeLaPersonalidad(nombre);
	let poder = numeroDelPoderDelNombre(nombre);
	let fechaNacimiento = numeroDeLaFechaDeNacimiento(fecha);
	let trayectoria = numeroDeLaTrayectoriaDeLaVida(fecha);
	let actitud = numeroDeLaActitud(fecha);

	return [
		new Numeros("Número Del Alma", alma[0].suma, alma[0].pasos, alma[1]),
		new Numeros("Número De La Personalidad", personalidad[0].suma, personalidad[0].pasos, personalidad[1]),
		new Numeros("Número Del Poder Del Nombre", poder.suma, poder.pasos),
		new Numeros("Número De La Fecha De Nacimiento", fechaNacimiento.suma, fechaNacimiento.pasos),
		new Numeros("Número De La Trayectoria De La Vida", trayectoria.suma, trayectoria.pasos),
		new Numeros("Número De La Actitud", actitud.suma, actitud.pasos)
	]
}