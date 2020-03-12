describe("calcularString()", (string) => {

    it("debería sumar 0, 1 o 2 números, y devolver su suma", () => {
        const string = "4, 7, 5";
        const resultado = calcularString(string)

        expect(resultado).to.equal(16)
    })
    it("debería devolver cero si el string se ingresa vacío", () => {
        const string = "";
        const resultado = calcularString(string)

        expect(resultado).to.equal(0)
    })

    it("debería aceptar una cantidad indefinida de números", () => {
        const string =  "4, 7, 5, 8, 40, 50, 20, 30";
        const resultado = calcularString(string)

        expect(resultado).to.equal(164)
    })
    it("debería aceptar un delimitador definido por el usuario", () => {
        const string =  "4 7 5 8 40 50 20 30";
        const string1 = "4-7-5-8-40-50-20-30";
        const resultado = calcularString(string,  ' ')
        const resultado1 = calcularString(string1, '-')

        expect(resultado).to.equal(164)
        expect(resultado1).to.equal(164)
    })

    it("debería tirar error si se le pasa un número negativo", () => {
        const string =  "4, -7, 5, 8, 40, 50, 20, 30";
        const fn = () => {
            calcularString(string)
        }
        expect(fn).to.throw(`No se pueden ingresar números negativos. Ingresó: -7`)
 
    })
    
    it("debería tirar en el error los números negativos si se le pasan varios números negativos", () => {
        const string =  "4, -7, 5, 8, 40, -50, 20, 30";
        const fn = () => {
            calcularString(string)
        }
        expect(fn).to.throw(`No se pueden ingresar números negativos. Ingresó: -7 -50`)
 
    })

    it("debería ignorar los valores mayores a 1000", () => {
        const string =  "4, 7, 5, 1008, 40, 50, 2220, 30";
        const resultado = calcularString(string)
        expect(resultado).to.equal(136)
 
    })
})


describe("moverElemento()", (tablero, coordenadas, movimiento) => {

    it("debería devolver las coordenadas correspondientes a la casilla a la que el usuario se movió", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];
        const coordenadas = [2, 2];
        const movimiento = ["ARRIBA"];
        const movimiento1 = ["ABAJO"];
        const movimiento2 = ["DERECHA"];
        const movimiento3 = ["IZQUIERDA"];

        expect(moverElemento(tablero, coordenadas, movimiento)).to.equal("7")
        expect(moverElemento(tablero, coordenadas, movimiento1)).to.equal("15")
        expect(moverElemento(tablero, coordenadas, movimiento2)).to.equal("12")
        expect(moverElemento(tablero, coordenadas, movimiento3)).to.equal("10")
    })

    it("debería pasar al otro lado si está en algún borde", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];
        const coordenadas1 = [0, 0];
        const coordenadas2 = [4, 3];
        const movimiento = ["ARRIBA"];
        const movimiento1 = ["ABAJO"];
        const movimiento2 = ["IZQUIERDA"];
        const movimiento3 = ["DERECHA"];
        
        expect(moverElemento(tablero, coordenadas1, movimiento)).to.equal("17")
        expect(moverElemento(tablero, coordenadas2, movimiento1)).to.equal("4")
        expect(moverElemento(tablero, coordenadas1, movimiento2)).to.equal("4")
        expect(moverElemento(tablero, coordenadas2, movimiento3)).to.equal("17")
    })

    it ("debería aceptar varios movimientos y devolver el resultado final de ese movimiento", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];
        const coordenadas = [1, 2];
        const movimiento1 = ["ARRIBA", "DERECHA", "ABAJO", "ABAJO", "IZQUIERDA"];
        const movimiento2 = ["IZQUIERDA", "IZQUIERDA", "ARRIBA", "ARRIBA", "DERECHA"];
                
        expect(moverElemento(tablero, coordenadas, movimiento1)).to.equal("11")
        expect(moverElemento(tablero, coordenadas, movimiento2)).to.equal("18")
    })

    it ("debería arrojar un error si un movimiento no es válido", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];
        const coordenadas = [1, 2];
        const movimiento = ["ARRIBA", "DEREHA", "ABAJO", "ABAJO", "IZQUIERDA"];

        const fn = () => {
            moverElemento(tablero, coordenadas, movimiento)
        }
                
        expect(fn).to.throw("Vuelva a intentarlo. Ingresó una palabra no válida.")
    })

    it ("debería arrojar un error si las coordenadas no son válidas", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];
        const coordenadas = [6, 2];
        const movimiento = ["ARRIBA", "DERECHA"];

        const fn = () => {
            moverElemento(tablero, coordenadas, movimiento)
        }

        expect(fn).to.throw(`Las coordenadas ingresadas no son válidas.`)
    })
})

describe("pasaAlgoritmo()", (numeros) => {
    it("debería devolver true si pasa el algoritmo de Luhn", () => {
        const numeros = [4, 0, 1, 2, 8, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 1]
        const numeros2 = [7,9,9,2,7,3,9,8,7,1,3]
        expect(pasaAlgoritmo(numeros)).to.be.true
        expect(pasaAlgoritmo(numeros2)).to.be.true
    })
    it("debería devolver false si NO pasa el algoritmo de Luhn", () => {
        const numeros = [4, 0, 1, 2, 5, 8, 8, 8, 2, 8, 8, 8, 1, 8, 9, 1]
        const numeros2 = [7,9,8,2,3,3,5,8,7,1,3]

        expect(pasaAlgoritmo(numeros)).to.be.false
        expect(pasaAlgoritmo(numeros2)).to.be.false
    })
})

describe ("esTarjetaValida()", (numeroTarjeta) => {
    it("debería validar una tarjeta American Express", () => {
        const numeroTarjeta1 = "341373214152570" //American Express
        
        expect(esTarjetaValida(numeroTarjeta1)).to.have.string('American Express')    
    })

    it("debería validar una tarjeta Visa", () => {
        const numeroTarjeta1 = "4716336328451435" //American Express
        
        expect(esTarjetaValida(numeroTarjeta1)).to.have.string('Visa')    
    })

    it("debería validar una tarjeta MasterCard", () => {
        const numeroTarjeta1 = "5271427343322216" //American Express
        
        expect(esTarjetaValida(numeroTarjeta1)).to.have.string('MasterCard')    
    })
})

