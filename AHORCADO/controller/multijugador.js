selectAll();
const peliculaJ1 = JSON.parse(localStorage.getItem('peliculaJugador1'));
const peliculaJ2 = JSON.parse(localStorage.getItem('peliculaJugador2'));
let estado_victoriaJ1 =false;
let estado_victoriaJ2 =false;
let partidaJ1_acabada = false;
let partidaJ2_acabada = false;
let puntuacionJ1 = 0; // 10 puntos por acierto -8 por fallo
let puntuacionJ2 = 0; // 10 puntos por acierto -8 por fallo
let vidasJ1 = 6;
let vidasJ2 = 6;
let vidasOriginalesJ1 = vidasJ1;
let vidasOriginalesJ2 = vidasJ2;
let palabraAdivinarJ1 = [];
let palabraAdivinarJ2 = [];
let palabraMostrarJ1 = []; //variable que contendrá la palabra con ("-")
let palabraMostrarJ2 = []; //variable que contendrá la palabra con ("-")
let teclasBloqueadasJ1 = [];
let teclasBloqueadasJ2 = [];
let divResultadoJ1 = document.querySelector('#resultadoJ1').firstChild;
let divResultadoJ2 = document.querySelector('#resultadoJ2').firstChild;
let divTipoJ1 = document.querySelector('#pistaJ1');
let divTipoJ2 = document.querySelector('#pistaJ2');

let nodovidasJ1 = document.querySelector('#vidas_j1');
let nodovidasJ2 = document.querySelector('#vidas_j2');

let nodoPuntuacionJ1 = document.querySelector('#puntos_j1');
let nodoPuntuacionJ2 = document.querySelector('#puntos_j2');





function generarLetrasTeclado(divjugador) {
    if(divjugador == "botones_j1"){
        var divTeclas = document.getElementById(divjugador)
        for (let index = 65; index <= 78; index++) {
            divTeclas.innerHTML +=`<button type="button" class="tecla1" id="J1tecla${String.fromCharCode(index).toLowerCase()}" value="${String.fromCharCode(index)}" onclick="comprobarTecla('${String.fromCharCode(index).toLowerCase()}','jugador1');">${String.fromCharCode(index)}</button>`  
        }
        divTeclas.innerHTML +=`<button type="button" class="tecla1" id="J1teclañ" value="Ñ" onclick="comprobarTecla('ñ','jugador1');">Ñ</button>`
        for (let index = 79; index <= 90; index++) {
            divTeclas.innerHTML +=`<button type="button" class="tecla1" id="J1tecla${String.fromCharCode(index).toLowerCase()}" value="${String.fromCharCode(index)}" onclick="comprobarTecla('${String.fromCharCode(index).toLowerCase()}','jugador1');">${String.fromCharCode(index)}</button>`  
        }
    }else{
        var divTeclas = document.getElementById(divjugador)
    for (let index = 65; index <= 78; index++) {
        divTeclas.innerHTML +=`<button type="button" class="tecla2" id="J2tecla${String.fromCharCode(index).toLowerCase()}" value="${String.fromCharCode(index)}" onclick="comprobarTecla('${String.fromCharCode(index).toLowerCase()}','jugador2');">${String.fromCharCode(index)}</button>`  
    }
    divTeclas.innerHTML +=`<button type="button" class="tecla2" id="J2teclañ" value="Ñ" onclick="comprobarTecla('ñ','jugador2');">Ñ</button>`
    for (let index = 79; index <= 90; index++) {
        divTeclas.innerHTML +=`<button type="button" class="tecla2" id="J2tecla${String.fromCharCode(index).toLowerCase()}" value="${String.fromCharCode(index)}" onclick="comprobarTecla('${String.fromCharCode(index).toLowerCase()}','jugador2');">${String.fromCharCode(index)}</button>`  
    }
    }
    
}



function iniciarPartida(jugador) {

    if(jugador == "jugador1"){
        generarLetrasTeclado("botones_j1");
        var palabraAleatoriaJ1 = peliculaJ1.titulo;
        var tamaniopalabraAleatoriaJ1 = palabraAleatoriaJ1.length;
      
        for (var i = 0; i < tamaniopalabraAleatoriaJ1; i++) {
          if (!palabraAleatoriaJ1.charAt(i).match(/[a-zñA-ZÑ]/)) {
            palabraAdivinarJ1.push(palabraAleatoriaJ1.charAt(i));
            palabraMostrarJ1.push(palabraAleatoriaJ1.charAt(i));
          } else {
            palabraAdivinarJ1.push(palabraAleatoriaJ1.charAt(i).toLowerCase());
            palabraMostrarJ1.push("_");
          }
        }
        divTipoJ1.textContent = peliculaJ1.tipo;
        nodovidasJ1.textContent ="Vidas" + vidasOriginalesJ1;
        actualizarDatosPantalla("jugador1");
    }else{
        generarLetrasTeclado("botones_j2");
        var palabraAleatoriaJ2 = peliculaJ2.titulo;
        var tamaniopalabraAleatoriaJ2 = palabraAleatoriaJ2.length;
      
        for (var i = 0; i < tamaniopalabraAleatoriaJ2; i++) {
          if (!palabraAleatoriaJ2.charAt(i).match(/[a-zñA-ZÑ]/)) {
            palabraAdivinarJ2.push(palabraAleatoriaJ2.charAt(i));
            palabraMostrarJ2.push(palabraAleatoriaJ2.charAt(i));
          } else {
            palabraAdivinarJ2.push(palabraAleatoriaJ2.charAt(i).toLowerCase());
            palabraMostrarJ2.push("_");
          }
        }
        divTipoJ2.textContent = peliculaJ2.tipo;
        nodovidasJ2.textContent ="Vidas" + vidasOriginalesJ1;
        actualizarDatosPantalla("jugador2");

    }

   }

   function actualizarDatosPantalla(jugador) {
    if(jugador == "jugador1"){
        divResultadoJ1.textContent = palabraMostrarJ1.join(' ').toUpperCase();
        nodovidasJ1.textContent = vidasJ1 + " VIDAS";
        nodoPuntuacionJ1.textContent = puntuacionJ1 + " PUNTOS";
    }else{
        divResultadoJ2.textContent = palabraMostrarJ2.join(' ').toUpperCase();
        nodovidasJ2.textContent = vidasJ2 + " VIDAS";
        nodoPuntuacionJ2.textContent = puntuacionJ2 + " PUNTOS";
    }
    
  }

  function estadoPartida(jugador) {
    if(partidaJ1_acabada == true && partidaJ2_acabada == true){
        console.log("partida acabada");
    }else{
    if(jugador == "jugador1"){

        if (!palabraMostrarJ1.includes('_')) {
           bloquearTodasTeclas("jugador1")
           document.getElementById("nombrePelicula").textContent = peliculaJ1.titulo;
           document.getElementById("descripcionPelicula").textContent = peliculaJ1.descripcion;
           document.getElementById('imagenPelicula').src = peliculaJ1.imagen;
           document.getElementById("actoresPelicula").textContent ="Actores: "+ peliculaJ1.actor;
           document.getElementById("directorPelicula").textContent ="Director: "+ peliculaJ1.director;
           document.getElementById("fechaPelicula").textContent ="Fecha lanzamiento: "+ peliculaJ1.fecha;
           document.getElementById("aciertoModal").textContent = "Adivinastes la palabra Jugador 1";
           partidaJ1_acabada = true;
           abrirModalVictoria();
           estado_victoriaJ1 = true;
          }
          if (vidasJ1 == 0) {
            bloquearTodasTeclas("jugador1")
            palabraMostrarJ1 = palabraAdivinarJ1;
            document.getElementById("derrotaModal").textContent ="No adivinastes la palabra Jugador 1";
            document.getElementById("derrotaTitulo").textContent ="La palabra era "+ peliculaJ1.titulo;
            estado_victoriaJ1 = false;
            partidaJ1_acabada = true;
            abrirModalDerrota();
          }

    }else{
        if (!palabraMostrarJ2.includes('_')) {
            bloquearTodasTeclas("jugador2")
            document.getElementById("nombrePelicula").textContent = peliculaJ2.titulo;
            document.getElementById("descripcionPelicula").textContent = peliculaJ2.descripcion;
            document.getElementById('imagenPelicula').src = peliculaJ2.imagen;
            document.getElementById("actoresPelicula").textContent ="Actores: "+ peliculaJ2.actor;
            document.getElementById("directorPelicula").textContent ="Director: "+ peliculaJ2.director;
            document.getElementById("fechaPelicula").textContent ="Fecha lanzamiento: "+ peliculaJ2.fecha;
            document.getElementById("aciertoModal").textContent = "Adivinastes la palabra Jugador 2";
            partidaJ2_acabada = true;
            abrirModalVictoria();
            estado_victoriaJ2 = true;
           }
           if (vidasJ2 == 0) {
             bloquearTodasTeclas("jugador2")
             palabraMostrarJ1 = palabraAdivinarJ1;
             document.getElementById("derrotaModal").textContent ="No adivinastes la palabra Jugador 2";
             document.getElementById("derrotaTitulo").textContent ="La palabra era "+ peliculaJ2.titulo;
             estado_victoriaJ2 = false;
             partidaJ2_acabada = true;
             abrirModalDerrota();
           }

    }
    }
    
  }


function bloquearTodasTeclas(jugador) {
    if(jugador == "jugador1"){
        var teclas = document.querySelectorAll('button.tecla1');
        for (var i = 0; i < teclas.length; i++) {
          teclas[i].disabled = true;
          document.getElementById(teclas[i].id).className = "teclaDeshabilitada";
          teclasBloqueadasJ1.push(teclas[i].id);
        }
    }else{
        var teclas = document.querySelectorAll('button.tecla2');
        for (var i = 0; i < teclas.length; i++) {
          teclas[i].disabled = true;
          document.getElementById(teclas[i].id).className = "teclaDeshabilitada";
          teclasBloqueadasJ1.push(teclas[i].id);
        }
    }
}


function comprobarTecla(letraUsuario,jugador) {
    if(jugador == "jugador1"){
        let regex = /^[A-Za-z\u00f1\u00d1]+$/;
        if(regex.test(letraUsuario)){
        for (var i = 0; i < palabraAdivinarJ1.length; i++) {
        if (letraUsuario == palabraAdivinarJ1[i]) {
            palabraMostrarJ1[i] = letraUsuario;    
            document.getElementById("J1tecla" + letraUsuario).disabled = true;
            document.getElementById("J1tecla" + letraUsuario).className = "teclaDeshabilitada";
            teclasBloqueadasJ1.push("J1tecla" + letraUsuario);
            puntuacionJ1 += 10;
        }
        }
    
        if (!palabraAdivinarJ1.includes(letraUsuario)) {
        if (vidasJ1 > 0) {
            vidasJ1 -= 1;
            puntuacionJ1 -= 8;
        }
        document.getElementById("J1tecla" + letraUsuario).disabled = true;
        document.getElementById("J1tecla" + letraUsuario).className = "teclaDeshabilitada";    
        teclasBloqueadasJ1.push("J1tecla" + letraUsuario);
        }
    
        estadoPartida("jugador1");
        actualizarDatosPantalla("jugador1");
        }
    }else{
        let regex = /^[A-Za-z\u00f1\u00d1]+$/;
        if(regex.test(letraUsuario)){
        for (var i = 0; i < palabraAdivinarJ2.length; i++) {
        if (letraUsuario == palabraAdivinarJ2[i]) {
            palabraMostrarJ2[i] = letraUsuario;    
            document.getElementById("J2tecla" + letraUsuario).disabled = true;
            document.getElementById("J2tecla" + letraUsuario).className = "teclaDeshabilitada";
            teclasBloqueadasJ2.push("J2tecla" + letraUsuario);
            puntuacionJ2 += 10;
        }
        }
    
        if (!palabraAdivinarJ2.includes(letraUsuario)) {
        if (vidasJ2 > 0) {
            vidasJ2 -= 1;
            puntuacionJ2 -= 8;
        }
        document.getElementById("J2tecla" + letraUsuario).disabled = true;
        document.getElementById("J2tecla" + letraUsuario).className = "teclaDeshabilitada";    
        teclasBloqueadasJ1.push("J2tecla" + letraUsuario);
        }
    
        estadoPartida("jugador2");
        actualizarDatosPantalla("jugador2");

        }
    }
    
}

function abrirModalPartidaTerminada() {
    if(estado_victoriaJ1 && estado_victoriaJ2){
        if(puntuacionJ1>puntuacionJ2){
            
            document.getElementById("finalizadaVictoria").textContent = "Victoria del Jugador 1"
        }else{
            document.getElementById("finalizadaVictoria").textContent = "Victoria del Jugador 2"
        }
    }else if(estado_victoriaJ1 && !estado_victoriaJ2){
        document.getElementById("finalizadaVictoria").textContent = "Victoria del Jugador 1"
    }else if(!estado_victoriaJ1 && estado_victoriaJ2){
        document.getElementById("finalizadaVictoria").textContent = "Victoria del Jugador 2"
    }else{
        if(puntuacionJ1>puntuacionJ2){
            document.getElementById("finalizadaVictoria").textContent = "Victoria del Jugador 1"
        }else{
            document.getElementById("finalizadaVictoria").textContent = "Victoria del Jugador 2"
        }
    }
    
    document.getElementById("resumenJ1").textContent = "Puntuacion total de letras adivinadas del jugador 1: "+puntuacionJ1;
    document.getElementById("resumenJ2").textContent = "Puntuacion total de letras adivinadas del jugador 2: "+puntuacionJ2;
    
    document.getElementById("solapaDiv").style.visibility = "visible";
    document.getElementById("contenedor-partida-finalizada").style.visibility = "visible";
  }

function abrirModalVictoria() {
    document.getElementById("solapaDiv").style.visibility = "visible";
    document.getElementById("contenedor-victoria").style.visibility = "visible";
  }
  
  function abrirModalDerrota() {
    document.getElementById("solapaDiv").style.visibility = "visible";
    document.getElementById("contenedor-derrota").style.visibility = "visible";
  }
  
  function cerrarModalVictoria() {
    if(partidaJ1_acabada == true && partidaJ2_acabada == true){
        console.log("partida acabada");
        abrirModalPartidaTerminada();
    }
    document.getElementById("solapaDiv").style.visibility = "hidden";
    document.getElementById("contenedor-victoria").style.visibility = "hidden";

  }
  
  function cerrarModalDerrota() {
    if(partidaJ1_acabada == true && partidaJ2_acabada == true){
        console.log("partida acabada");
        abrirModalPartidaTerminada();
    }
    document.getElementById("solapaDiv").style.visibility = "hidden";
    document.getElementById("contenedor-derrota").style.visibility = "hidden";
  }

  function cerrarModalPartidaTerminada() {
    
    document.getElementById("solapaDiv").style.visibility = "hidden";
    document.getElementById("contenedor-partida-finalizada").style.visibility = "hidden";

  }


   iniciarPartida("jugador1");
   iniciarPartida("jugador2");



