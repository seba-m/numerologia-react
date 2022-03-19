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

function reducirAUnaCifra(numeros) {
    let suma = 0;

    let unDigito = false;

    while (!unDigito) {
        for (let i = 0; i < numeros.length; i++) {
            suma += parseInt(numeros[i]);
        }

        unDigito = (suma.toString().length === 1);

        if (!unDigito) {
            numeros = suma.toString().split('');
            suma = 0;
        }
    }

    return suma;
}

function verificarYe(letraAnterior = null, letra, letraSiguiente = null) {
    if (letra !== 'Y') return false;
    return (esVocal(letraAnterior) || esVocal(letraSiguiente))// || (esConsonante(letraAnterior) && esConsonante(letraSiguiente))
}

function verificarVocales(letraAnterior, letra, letraSiguiente) {
    return esVocal(letra) || verificarYe(letraAnterior, letra, letraSiguiente);
}

function numeroDelAlma(n) {
    let sistemaPitagorico = SistemaPitagorico();
    let nombre = n.toUpperCase().replace(/[^A-Z]/g, '').split('');
    let numeros = [];
    let letraAnterior, letraSiguiente = null;

    let letras2 = [];

    nombre.map((letra, index) => {
        letraAnterior = nombre[index - 1];
        letraSiguiente = nombre[index + 1];
        if (verificarVocales(letraAnterior, letra, letraSiguiente)) {
            letras2.push(letra)
            numeros.push(sistemaPitagorico[letra]);
        }
    });

    return reducirAUnaCifra(numeros);
}

function numeroDeLaPersonalidad(n) {
    let sistemaPitagorico = SistemaPitagorico();
    let nombre = n.toUpperCase().replace(/[^A-Z]/g, '').split('');
    let numero = [];
    let letraAnterior, letraSiguiente = null;

    nombre.map((letra, index) => {
        letraAnterior = nombre[index - 1];
        letraSiguiente = nombre[index + 1];
        if (!verificarVocales(letraAnterior, letra, letraSiguiente)) {
            numero.push(sistemaPitagorico[letra]);
        }
    });
    return reducirAUnaCifra(numero);
}

function numeroDelPoderDelNombre(n) {
    let total = [...numeroDelAlma(n).toString().split(), ...numeroDeLaPersonalidad(n).toString().split()]
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

function limpiarResultado(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

document.querySelector('#verificar').addEventListener('click', function () {
    var nombreElement = document.querySelector('#nombre');
    var resultadoElement = document.querySelector('#resultado');
    var fechaElement = document.querySelector('#fecha');

    limpiarResultado(resultadoElement);

    if (!nombreElement.value || nombreElement.value.length < 3 || !fechaElement.value) {
        //resultadoElement.innerHTML = "Ingrese un nombre completo y la fecha de nacimiento";

        let error = document.querySelector('#error');

        if (error) {
            return;
        }

        var p = document.createElement("p");
        p.innerHTML = "Ingrese un nombre completo y la fecha de nacimiento";
        p.id = "error";

        resultadoElement.appendChild(p);
    } else {
        let nombre = nombreElement.value.trim().normalize("NFD").replace(/[^a-zA-Z ]/g, "");
        let nombreSinNormalizar = nombreElement.value.trim();
        let fecha = new Date(parseDate(fechaElement.value));
        resultadoElement.innerHTML =
            "El nombre ingresado es: " + nombreSinNormalizar + "<br>" +
            "El número del alma es: " + numeroDelAlma(nombre) + "<br>" +
            "El número de la personalidad es: " + numeroDeLaPersonalidad(nombre) + "<br>" +
            "El número del poder del nombre es: " + numeroDelPoderDelNombre(nombre) + "<br>" +
            "El número de la fecha de nacimiento es: " + numeroDeLaFechaDeNacimiento(fecha) + "<br>" +
            "El número de la trayectoria de la vida es: " + numeroDeLaTrayectoriaDeLaVida(fecha) + "<br>" +
            "El número de la actitud es: " + numeroDeLaActitud(fecha) + "<br>"
    }
});

/*

<div class="accordion-item"></div>

<h2 class="accordion-header" id="headingOne">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
        aria-expanded="false" aria-controls="collapseOne">
        Accordion Item #1
    </button>
</h2>

<div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
    data-bs-parent="#accordionExample">
    <div class="accordion-body">
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="false" aria-controls="collapseOne">
            Accordion Item #1
        </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
        data-bs-parent="#accordionExample">
        <div class="accordion-body">
        </div>
    </div>
</div>
*/