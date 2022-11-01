const divisas = [156, 154, 29, 180]

let otroMonto = "no"
do {
    let datoIngresado = Number(
        prompt(
            "\n Si desea convertir Pesos a Dolares ingrese 1 \n \Si desea convertir Pesos a Euros ingrese 2 \n \Si desea convertir Pesos a Reales ingrese 3 \n \Si desea convertir Pesos a Libra esterlina ingrese 4"
        )
    );
    let montoIngresado = Number(prompt("Ingrese el monto que desea convertir")); 

    function conversorMoneda() {
        let resultado = 0

        if (datoIngresado == 1) {
            resultado = montoIngresado * divisas [0]
        } else if (datoIngresado == 2) {
            resultado = montoIngresado * divisas [1]
        } else if (datoIngresado == 3) {
            resultado = montoIngresado * divisas [2]
        } else if (datoIngresado == 4) {    
            resultado = montoIngresado * divisas [3]
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


