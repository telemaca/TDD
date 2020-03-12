// Calculadora de strings
const calcularString = (string, delimitador = ', ') => {

    const array = string.split(`${delimitador}`);
    let suma = 0;
    const negativos = [];

    for (let i = 0; i < array.length; i++) {

        if (Number(array[i]) < 0) {
            negativos.push(Number(array[i]))
        }
        else if (Number(array[i]) < 1000) {
            suma += Number(array[i]);
        }
    }

    if (negativos.length === 0) {
        return suma;
    }
    else {
        throw new Error(`No se pueden ingresar números negativos. Ingresó: ${negativos.join(' ')}`)
    }

}


// Movimiento en Tablero
const tablero = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
    ["9", "10", "11", "12"],
    ["13", "14", "15", "16"],
    ["17", "18", "19", "20"],
];

const coordenadas = [0, 2];
const movimiento = []

const moverElemento = (tablero, coordenadas, movimiento) => {
    
    let x = coordenadas[1];
    let y = coordenadas[0];

    if (y >= tablero.length || x >= tablero[y].length) {
        throw new Error(`Las coordenadas ingresadas no son válidas.`)
    } else {

        for (let i = 0; i < movimiento.length; i++) {
            switch (movimiento[i]) {
                case "ARRIBA": 
                    y === 0 ? y = tablero.length - 1 : y -= 1;
                break;
                case "ABAJO": 
                    y === tablero.length - 1 ? y = 0 : y += 1;
                    break;
                case "IZQUIERDA": 
                    x === 0 ? x = tablero[y].length - 1 : x -= 1;
                    break;
                case "DERECHA": 
                    x === tablero[y].length - 1 ? x = 0 : x += 1;
                    break;
                default:
                    throw new Error("Vuelva a intentarlo. Ingresó una palabra no válida.")
            }
        }
    }
    
    return tablero[y][x]
}

// Algoritmo de Luhn
const numeros = [4, 0, 1, 2, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 1]
const pasaAlgoritmo = (numeros) => {

    for (let i = numeros.length - 2; i >= 0; i -= 2) {
        numeros[i] = numeros[i] * 2;
    }

    let resultado = 0
    for (let j = 0; j < numeros.length; j++) {
        if (numeros[j] > 9) {
            numeros[j] -= 9
        }
        resultado += numeros[j]
    }

    return resultado % 10 === 0
}

// Crear una función que determine si una tarjeta es válida o no

// Debe permitir ingresar un string
// Debe verificar que el string sea un numero de Luhn valido
// Debe verificar que pertenezca a algún tipo de tarjeta, siguiendo las siguientes reglas:
// American Express: Comienza con 34 o 37, tiene 15 dígitos.
// Visa: Comienza con 4, tiene 13 o 16 dígitos.
// MasterCard: Comienza con 51, 52, 53, 54 o 55, tiene 16 dígitos.
// Debe devolver un string con el tipo de la tarjeta, o "invalid" si no es una tarjeta válida

const numeroTarjeta = "341373214152570"
const esTarjetaValida = (numeroTarjeta) => {
    const primeros2Digitos = numeroTarjeta.slice(0, 2);
    const numerosTarjeta = [];
    let tipoTarjeta = "";
    const esAmericanExpress = numeroTarjeta.length === 15 && primeros2Digitos == 34 || primeros2Digitos == 37;
    const esVisa = (numeroTarjeta.length === 16 && numeroTarjeta[0] == 4) || 
    (numeroTarjeta.length === 13 && numeroTarjeta[0] == 4);
    const esMasterCard = numeroTarjeta.length === 16 && (primeros2Digitos == 51 || 
        primeros2Digitos == 52 || 
        primeros2Digitos == 53 || 
        primeros2Digitos == 54 || 
        primeros2Digitos == 55);
    
    for (let i = 0; i < numeroTarjeta.length; i++) {
        numerosTarjeta.push(Number(numeroTarjeta[i]))
    }
    
    if (pasaAlgoritmo(numerosTarjeta)) {
        if (esAmericanExpress) {
            tipoTarjeta = "American Express";
        } else if (esVisa) {
            tipoTarjeta = "Visa"
        } else if (esMasterCard) {
            tipoTarjeta = "MasterCard"
        } else {
            throw new Error(`No ingresó una tarjeta válida.`)
        }
    } else {
        throw new Error(`No ingresó una tarjeta válida.`)
    }

    return tipoTarjeta
}
