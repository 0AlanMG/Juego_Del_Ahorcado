var screenWidth = 0;

const home = document.querySelector('.header__logo');
const sectionAcciones = document.querySelector('.acciones');
const sectionAgregarPalabra = document.querySelector('.agregar-palabra');
const sectionJuego = document.querySelector('.juego');
const ahorcado = document.querySelector('.juego__ahorcado');
const letrasCorrectas = document.querySelector('.juego__letras-correctas');
const letrasIncorrectas = document.querySelector('.juego__letras-incorrectas');
const resultado = document.querySelector('.juego__resultado');

const aviso = document.querySelector('.modal-body');
var accionAviso = "";

const letrasPermitidas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let palabrasSecretas = ['WYILJVAS'];//['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE', 'DIEZ'];
var palabraElegida = "";
var letrasPressCorrectas = [];
var letrasPressIncorrectas = [];
var intentoCorrecto = 0;
var intentoErroneo = 0;
var leerLetra = false;


var tecla_Presionada = document.querySelector('.tecla-presionada');

function inicializar(){
    screenWidth = $(window).width();

    /*Ahorcado Tamaño*/
    ahorcado.width = 300;
    ahorcado.height = 366;

    /*Ahorcado - Base*/
    const canvasCtx = ahorcado.getContext('2d');
    canvasCtx.strokeStyle = "#0A3871";
    canvasCtx.lineWidth = 4.5;
    canvasCtx.moveTo(3, 363);
    canvasCtx.lineTo(297, 363);
    canvasCtx.stroke();

    /*Juego*/
    letrasCorrectas.width = 200;

    if(screenWidth <= 450){
        resultado.height = 35;

        letrasCorrectas.height = 68;

        letrasIncorrectas.height = 38;
        letrasIncorrectas.width = 350;
    }else{
        resultado.height = 50;

        letrasCorrectas.height = 98;

        letrasIncorrectas.height = 42;
        letrasIncorrectas.width = 420;
    }

    resultado.width = 300;

    /*Juego Reiniciado*/
    palabraElegida = "";
    letrasPressCorrectas = [];
    letrasPressIncorrectas = [];
    intentoCorrecto = 0;
    intentoErroneo = 0;
    leerLetra = true;
    accionAviso = "";
}

function sortearPalabraSecreta(){
    inicializar();
    if(palabrasSecretas.length != 0){
        palabraElegida = palabrasSecretas[Math.floor(Math.random()*palabrasSecretas.length)];
        dibujarGuiones();
    }
    $('.tecla-presionada').focus();
}

function dibujarGuiones(){
    const canvasCtx = letrasCorrectas.getContext("2d");
    
    let guiones = palabraElegida.split('');
    let posicionX = 0;
    let guionLongitud = 0;

    if(screenWidth <= 450){
        guionLongitud = 50;
        letrasCorrectas.width = (guiones.length * (guionLongitud + 5)) - 5;
    }else{
        guionLongitud = 80;
        letrasCorrectas.width = (guiones.length * (guionLongitud + 10)) - 10;
    }
    
    canvasCtx.strokeStyle = "#0A3871";
    canvasCtx.lineWidth = 4;

    if(screenWidth <= 450){
        for(var i = 1; i <= guiones.length; i++){
            canvasCtx.moveTo(posicionX, 61);
            canvasCtx.lineTo(posicionX + guionLongitud, 61);
            canvasCtx.stroke();

            posicionX = posicionX + (guionLongitud + 5);
        }
    }else{
        for(var i = 1; i <= guiones.length; i++){
            canvasCtx.moveTo(posicionX, 91);
            canvasCtx.lineTo(posicionX + guionLongitud, 91);
            canvasCtx.stroke();
        
            posicionX = posicionX + (guionLongitud + 10);
        }
    }
}

function teclaPresionada(event){
    if(leerLetra){
        const currentCode = event.which || event.code;
        let currentKey = event.key;

        alert(currentCode);

        if (!currentKey) {
            currentKey = String.fromCharCode(currentCode);
        }
        str += currentKey;
        event.preventDefault();
        alert(str);

        if(palabraElegida != ""){
            if(letrasPermitidas.includes(letra)){
                verificarLetra(letra);
            }
        }
    }
}

function dibujarLetraCorrecta(letra){
    const canvasCtx = letrasCorrectas.getContext("2d");

    let letras = palabraElegida.split('');
    let posicionLetra = [];

    for(var i  = 0; i <= letras.length; i++){
        if(letras[i] == letra){
            posicionLetra.push(i);
        }
    }

    canvasCtx.fillStyle = "#0A3871";
    canvasCtx.textAlign = 'center';

    if(screenWidth <= 450){
        canvasCtx.font = "36px Init";

        for(var i = 0; i <= posicionLetra.length; i++){
            canvasCtx.fillText(letra, (posicionLetra[(i)] * 55) + 25, 45);
        }
    }else{
        canvasCtx.font = "72px Init";

        for(var i = 0; i <= posicionLetra.length; i++){
            canvasCtx.fillText(letra, (posicionLetra[(i)] * 90) + 40, 75);
        }
    }
}

function dibujarLetraIncorrecta(letra){
    const canvasCtx = letrasIncorrectas.getContext("2d");

    canvasCtx.clearRect(0, 0, letrasIncorrectas.width, letrasIncorrectas.height);
    canvasCtx.textAlign = 'center';
    canvasCtx.fillStyle = "#495057";

    letrasPressIncorrectas.push(letra);

    if(screenWidth <= 450){
        canvasCtx.font = "32px Init";

        for(var i = 0; i < letrasPressIncorrectas.length; i++){
            canvasCtx.fillText(letrasPressIncorrectas.join('  '), letrasIncorrectas.width/2, 32);
        }
    }else{
        canvasCtx.font = "36px Init";

        for(var i = 0; i < letrasPressIncorrectas.length; i++){
            canvasCtx.fillText(letrasPressIncorrectas.join('  '), letrasIncorrectas.width/2, 36);
        }
    }
}

function dibujarAhorcado(){
    const canvasCtx = ahorcado.getContext("2d");

    canvasCtx.strokeStyle = "#0A3871";
    canvasCtx.lineWidth = 4.5;
    
    if(intentoErroneo == 1){
        /*Mastil*/
        canvasCtx.moveTo(56, 363);
        canvasCtx.lineTo(56, 3);
        canvasCtx.stroke();
    }
    if(intentoErroneo == 2){
        /*Techo*/
        canvasCtx.moveTo(53, 3);
        canvasCtx.lineTo(233, 3);
        canvasCtx.stroke();
    }

    if(intentoErroneo == 3){
        /*Lazo*/
        canvasCtx.moveTo(230.75, 3);
        canvasCtx.lineTo(230.75, 52.5);
        canvasCtx.stroke();
    }
    if(intentoErroneo == 4){
        /*Cabeza*/
        canvasCtx.beginPath();
        canvasCtx.arc(230.75, 84, 31.5, 0, 2 * Math.PI);
        canvasCtx.stroke();
    }
    if(intentoErroneo == 5){
        /*Tronco*/
        canvasCtx.moveTo(230.75, 115.5);
        canvasCtx.lineTo(230.75, 250.5);
        canvasCtx.stroke();
    }
    if(intentoErroneo == 6){
        /*Pierna Izquierda*/
        canvasCtx.moveTo(230.75, 250.5);
        canvasCtx.lineTo(199.25, 322.5);
        canvasCtx.stroke();
    }
    if(intentoErroneo == 7){
        /*Pierna Derecha*/
        canvasCtx.moveTo(230.75, 250.5);
        canvasCtx.lineTo(262.25, 322.5);
        canvasCtx.stroke();
    }
    if(intentoErroneo == 8){
        /*Brazo Izquierdo*/
        canvasCtx.moveTo(230.75, 115.5);
        canvasCtx.lineTo(199.25, 187.5);
        canvasCtx.stroke();
    }
    if(intentoErroneo == 9){
        /*Brazo Derecho*/
        canvasCtx.moveTo(230.75, 115.5);
        canvasCtx.lineTo(262.25, 187.5);
        canvasCtx.stroke();
    }
}

function verificarLetra(letra){
    if(palabraElegida.includes(letra)){
        dibujarLetraCorrecta(letra);

        if(!letrasPressCorrectas.includes(letra)){
            letrasPressCorrectas.push(letra);

            intentoCorrecto = intentoCorrecto + 1;
        }

        verificarGanador();
    }
    else{
        if(!letrasPressIncorrectas.includes(letra)){

            dibujarLetraIncorrecta(letra);

            intentoErroneo = intentoErroneo + 1;
        }

        dibujarAhorcado();
        verificarFinJuego();
    }
}

function verificarFinJuego(){
    if(intentoErroneo == 9){
        dibujarFinJuego();
        leerLetra = false;
    }
}

function dibujarFinJuego(){
    const canvasCtx = resultado.getContext("2d");

    canvasCtx.fillStyle = "red";
    canvasCtx.textAlign = 'center';

    if(screenWidth <= 450){
        canvasCtx.font = "25px Arial";
        canvasCtx.fillText("Fin Del Juego!", resultado.width/2, 25);
    }else{
        canvasCtx.font = "40px Arial";
    }
}

function verificarGanador(){
    if(intentoCorrecto == new Set(palabraElegida).size){
        dibujarGanaste();
        leerLetra = false;
    }
}

function dibujarGanaste(){
    const canvasCtx = resultado.getContext("2d");

    if(screenWidth <= 450){
        resultado.height = 65;
    }else{
        resultado.height = 90;
    }

    canvasCtx.fillStyle = "green";
    canvasCtx.textAlign = 'center';

    if(screenWidth <= 450){
        canvasCtx.font = "25px Arial";
        canvasCtx.fillText("Ganaste, ", resultado.width/2, 25);
        canvasCtx.fillText("Felicidades!", resultado.width/2, 50);
    }else{
        canvasCtx.font = "40px Arial";
        canvasCtx.fillText("Ganaste, ", resultado.width/2, 40);
        canvasCtx.fillText("Felicidades!", resultado.width/2, 80);
    }
}

function btnGuardarPalabra(){
    let nuevaPalabra = document.querySelector('.agregar-palabra__palabra').value;
    
    const modalFooter = document.querySelector('.modal-footer');

    if(nuevaPalabra != ""){
        nuevaPalabra = nuevaPalabra.replace(' ', '').toUpperCase();
        
        if(nuevaPalabra.length <= 8){

            const validacion = new RegExp(/^[A-Z]+$/);

            if(validacion.test(nuevaPalabra)){

                if(!palabrasSecretas.includes(nuevaPalabra)){
                    palabrasSecretas.push(nuevaPalabra);
                    sortearPalabraSecreta();
                
                    sectionAcciones.style.display = 'none';
                    sectionAgregarPalabra.style.display = 'none';
                    document.querySelector('.agregar-palabra__palabra').value = "";
                    sectionJuego.style.display = 'flex';
                }
            }
            else{
                inicializar();

                modalFooter.innerHTML = "<button class='avisos__boton-ok' data-bs-dismiss='modal'>OK</button>";
                aviso.innerHTML = "<p>Caracter invalido, solo letras</p>";
            
                $("#avisos").modal("show");
            }
        }else{
            modalFooter.innerHTML = "<button class='avisos__boton-ok' data-bs-dismiss='modal'>OK</button>";
            aviso.innerHTML = "<p>Palabra demasiado larga, Max. 8 letras</p>";
        
            $("#avisos").modal("show");
        }
    }else{
        modalFooter.innerHTML = "<button class='avisos__boton-ok' data-bs-dismiss='modal'>OK</button>";
        aviso.innerHTML = "<p>No hay palabra para agregar</p>";
        
        $("#avisos").modal("show");
    }
}

/*Section Acciones*/
function btnIniciar(){
    sectionAcciones.style.display = 'none';
    sectionAgregarPalabra.style.display = 'none';
    sectionJuego.style.display = 'flex';

    sortearPalabraSecreta();
}

function btnAgregarNuevaPalabra(){
    sectionAcciones.style.display = 'none';
    sectionJuego.style.display = 'none';
    sectionAgregarPalabra.style.display = 'flex';
}

/*Section Agregar Palabra*/
function btnCancelar(){
    sectionAgregarPalabra.style.display = 'none';
    sectionJuego.style.display = 'none';
    document.querySelector('.agregar-palabra__palabra').value = "";

    sectionAcciones.style.display = 'flex';
}

/*Section Avisos*/
function accionesAvisos(){
    if(accionAviso == "desistir"){
        accionDesistir();
    }
    if(accionAviso == "reiniciar"){
        sortearPalabraSecreta();
    }
}

/*Section Juego*/
function btnNuevoJuego(){
    const modalFooter = document.querySelector('.modal-footer');
    
    accionAviso = "reiniciar";
    aviso.innerHTML = "<p>¿Desea reiniciar el juego?</p>"

    if(intentoErroneo < 9 && intentoCorrecto < new Set(palabraElegida).size){
        modalFooter.innerHTML = "<button class='avisos__boton-si' data-bs-dismiss='modal' onclick='accionesAvisos()'>Si</button><button class='avisos__boton-no' data-bs-dismiss='modal' onclick='btnAvisosNo()'>No</button>";
        $("#avisos").modal("show");
        leerLetra = false;
    }else{
        accionesAvisos();
    }
}

function btnDesistir(){
    const modalFooter = document.querySelector('.modal-footer');

    accionAviso = "desistir";
    aviso.innerHTML = "<p>¿Desea terminar el juego?</p>";

    if(intentoErroneo < 9 && intentoCorrecto < new Set(palabraElegida).size){
        modalFooter.innerHTML = "<button class='avisos__boton-si' data-bs-dismiss='modal' onclick='accionesAvisos()'>Si</button><button class='avisos__boton-no' data-bs-dismiss='modal' onclick='btnAvisosNo()'>No</button>";
        $("#avisos").modal("show");
        leerLetra = false;
    }else{
        accionesAvisos();
    }
}

function accionDesistir(){
    sectionAgregarPalabra.style.display = 'none';
    sectionJuego.style.display = 'none';
    sectionAcciones.style.display = 'flex';

    inicializar();
}

function btnAvisosNo(){
    leerLetra = true;
}

home.addEventListener('click', () => {
    btnDesistir();
});

document.addEventListener('keypress', (event) => {
    alert('Abrio');
    teclaPresionada(event);
});