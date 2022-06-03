//variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timeInicial = 30;
let tiempoRegresivoId = null;


//apuntado documento HTML
let mostrarMovimientos = document.getElementById(`movimientos`);
let mostrarAciertos = document.getElementById(`aciertos`);
let mostrarTiempo = document.getElementById(`t-restante`);

//Numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort (()=>{return Math.random()-0.5});
//console.log(numeros);

//funciones

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;
        timer--;
        if (timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png">`;/*[i]*/
        tarjetaBloqueada.disabled = true;
    }
}

//Esta no se k pez
function girar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
}

function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    //console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        //console.log(tarjeta1);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png">`;

        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas ==2){
        tarjeta2 = document.getElementById(id);
        //console.log(tarjeta2);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png">`;

        //deshabilitar segundo boton
        tarjeta2.disabled = true;

        //incremento movimiento
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado){
            tarjetasDestapadas= 0;

            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML = `Genial! Solo demoraste ${timeInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }

            //mostrar valores y volver a mostrar
        } else {
            setTimeout(()=> {
                tarjeta1.innerHTML = ''; 
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
        
    }

    