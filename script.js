// let num1= Number (prompt("Ingrese un numero"))
// let num2= Number (prompt("Ingrese otro numero"))
// let resultado = sumar(num1, num2)
// console.log ("resultado: ", resultado)

// let resultadoFlecha = sumarFlecha(num1, num2)
// console.log("ResultadoFlecha: ", resultadoFlecha)

let otroMonto = "no"
do {
    let datoIngresado = Number(
        prompt(
            "Si desea convertir dólares a pesos argentinos ingrese 1  Si desea convertir pesos argentinos a dólares ingrese 2"
        )
    );
    let montoIngresado = Number(prompt("Ingrese el monto que desea convertir"));

    function conversorMoneda(dato, monto) {
        let dolar = 151
        let resultado = 0

        if (dato == 1) {
            resultado = monto * dolar
        } else if (dato == 2) {
            resultado = monto / dolar
        } else {
            resultado = "Ingrese una opcion correcta"
        }
        return resultado.toFixed(2) 
    }

    let resultado = conversorMoneda(datoIngresado, montoIngresado)
    alert(resultado + " $"); 
    otroMonto = prompt(
        "Si desea convertir otro valor ingrese si, de otra manera desestime este mensaje"
    );
} while (otroMonto == "si") 
