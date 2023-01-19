 selectAll();
 const pelicula = JSON.parse(localStorage.getItem('pelicula'));
 const tokenAPI = "iuwbefiugb4";
 const idAPI ="003";
 let intentos = 0;
 let aciertos = 0;
 let estado_victoria =false;

 let puntuacion = 0; // 10 puntos por acierto -8 por fallo
 let vidas = 6;
 let vidasOriginales = vidas;
 let palabraAdivinar = [];
 let palabraMostrar = []; //variable que contendrá la palabra con ("-")
 let teclasBloqueadas = [];
 let divTipo = document.querySelector('#pista');
 let divResultado = document.querySelector('#resultado').firstChild;
 let nodoIntentos = document.querySelector('#intentos');
 let nodoIntentosOriginales = document.querySelector('#intentosOriginales');
 let nodoPuntuacion = document.querySelector('#puntuacionH2');
 let nodoAltavoz = document.querySelector('#altavoz');
 
 // Variables para los sonidos
 var fallar = new Audio('../resources/sounds/fallo.mp3');
 var acertar = new Audio('../resources/sounds/Victoria.mp3');
 var victoria = new Audio('../resources/sounds/Victoria.mp3');
 var fondo = new Audio('../resources/sounds/musica_fondo.mp3');
 fondo.loop = true; // Hacemos que si termina la música de fondo se repita
 fondo.volume = 0.2; // Establecemos el volumen
 

 // FUNCION SUBI ESTADISTICAS DE LA PARTIDA
function subirEstadisticas() {
  var user = JSON.parse(localStorage.getItem('usuario'));
  var fecha = formatDate(new Date());
  var partidaResultados = new Partida(estado_victoria,fecha,intentos,aciertos,puntuacion);
  console.log(JSON.stringify(partidaResultados));
  fetch('http://alu7203.arkania.es:8080/api/analytics.php?username='+user.username+'&password='+user.pass+'&app='+idAPI+'&token='+tokenAPI+'&query=upload', {
    method: 'POST',
    
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partidaResultados)
  
  }).then((response) => response.json())
  .then((data) => console.log(data));
}


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

 /**
  * FUNCIION INICIAR PARTIDA:
  * Con esta funcion se comienza una partida, ya sea al entrar al html o bien por que hemos pulsado en volve a jugar.
  */
function iniciarPartida() {
  generarLetrasTeclado();
  
   // Almacenamos el titulo de la pelicula aleatoria en palabraAleatoria cogiendo la palabra cogiendo la pelicula de la localstorage
   var palabraAleatoria = pelicula.titulo;
 
   // Guardamos en tamanioPalabraAleatoria el tamaño de la pelicula aleatoria
   var tamanioPalabraAleatoria = palabraAleatoria.length;
 
   // Guardamos en palabraAdivinar (array) cada uno de los caracteres de la palabra aleatoria
   // En palabra mostrar guardaremos tantos guiones como caracteres tiene la palabra aleatoria
   for (var i = 0; i < tamanioPalabraAleatoria; i++) {
     // Si el caracter elegido no es una letra...
     if (!palabraAleatoria.charAt(i).match(/[a-zñA-ZÑ]/)) {
       // Introducimos en la lista de la palabraAdivinar y palabraMostrar el caracter
       palabraAdivinar.push(palabraAleatoria.charAt(i));
       palabraMostrar.push(palabraAleatoria.charAt(i));
       // Si lo es...
     } else {
       // Introducimos el caracter en palabraAdivinar y un guión en palabraMostrar
       palabraAdivinar.push(palabraAleatoria.charAt(i).toLowerCase());
       palabraMostrar.push("_");
     }
   }
   //Añadimos el tipo de nuestro array
   divTipo.textContent = pelicula.tipo;
 
   // Mostramos el máximo de números errores con nodoIntentosOriginales.textContent
   nodoIntentosOriginales.textContent = vidasOriginales;
   // Llamamos a actualizarDatosPantalla() para refrescar los datos en la pantalla
   actualizarDatosPantalla();
 }
 
 /**
  * FUNCIION ACTUALIZAR DATOS PANTALLA:
  * Función para mostrar por pantalla todos los cambios que se producen en el juego
  */
 function actualizarDatosPantalla() {
   // Pasamos palabraMostrar a un String y separamos cada posición con un espacio con el método join()
   // Luego lo mostramos en el div resultado con divResultado.textContent y en mayúsculas
   divResultado.textContent = palabraMostrar.join(' ').toUpperCase();
 
   // Mostramos el números de intentos actuales con nodoIntentos.textContent
   nodoIntentos.textContent = vidas;

   // Mostramos la puntuación del usuario
   nodoPuntuacion.textContent = puntuacion + " PUNTOS";
 }


 /**
  * FUNCION LETRAS TECLADO:
  * Funcion que genera los botones para cada letra
  */
 function generarLetrasTeclado() {
    var divTeclas = document.getElementById('contenedorTeclas')
    for (let index = 65; index <= 78; index++) {
        divTeclas.innerHTML +=`<button type="button" class="tecla" id="tecla${String.fromCharCode(index).toLowerCase()}" value="${String.fromCharCode(index)}" onclick="comprobarTecla('${String.fromCharCode(index).toLowerCase()}');">${String.fromCharCode(index)}</button>`  
    }
    divTeclas.innerHTML +=`<button type="button" class="tecla" id="teclañ" value="Ñ" onclick="comprobarTecla('ñ');">Ñ</button>`
    for (let index = 79; index <= 90; index++) {
        divTeclas.innerHTML +=`<button type="button" class="tecla" id="tecla${String.fromCharCode(index).toLowerCase()}" value="${String.fromCharCode(index)}" onclick="comprobarTecla('${String.fromCharCode(index).toLowerCase()}');">${String.fromCharCode(index)}</button>`  
    }
 }
  
 /**
  * Función que captura la tecla pulsada mediante el teclado físico,
  * comprueba que no se haya pulsado todavía y se la pasa a la función
  * comprobarTecla
  */
 function cogerTecladoFisico(evObject) {
   var capturado = String.fromCharCode(evObject.which);
   if (!teclasBloqueadas.includes("tecla" + capturado)) {
     comprobarTecla(capturado);
   }
 }
 
 /**
  * Función para comprobar si la tecla pulsada es correcta
  */
 function comprobarTecla(letraUsuario) {
  let regex = /^[A-Za-z\u00f1\u00d1]+$/;
  //Comprobamos que solo introducimos letras
  if(regex.test(letraUsuario)){
    intentos+=1;
   // Recorremos todo el array de la palabra a adivinar comparando cada posición con la letra del usuario
   for (var i = 0; i < palabraAdivinar.length; i++) {
     // Si la letra del usuario es igual a la letra en i posición, la guardamos en i posición de palabraMostrar
     if (letraUsuario == palabraAdivinar[i]) {
       acertar.load();
       acertar.play();
       aciertos+=1;
       palabraMostrar[i] = letraUsuario;
 
       // Bloqueamos la tecla deshabilitando el botón y cambiando su clase
       document.getElementById("tecla" + letraUsuario).disabled = true;
       document.getElementById("tecla" + letraUsuario).className = "teclaDeshabilitada";
 
       // Añadimos la tecla a un array para posteriormente trabajar con ellas
       teclasBloqueadas.push("tecla" + letraUsuario);
       puntuacion += 10;
     }
   }
 
   // Si no está la letra....
   if (!palabraAdivinar.includes(letraUsuario)) {
     // Restamos un intento
     if (vidas > 0) {
       fallar.load();
       fallar.play();
       vidas -= 1;
       puntuacion -= 8;
     }
 
     // Dependiendo del fallo, mostramos una imagen u otra
     if (vidas == 5) {
       document.getElementById('imagen').src = '../resources/images/cabeza.png';
     } else if (vidas == 4) {
       document.getElementById('imagen').src = '../resources/images/cuerpo.png';
     } else if (vidas == 3) {
       document.getElementById('imagen').src = '../resources/images/brazoIzq.png';
     } else if (vidas == 2) {
       document.getElementById('imagen').src = '../resources/images/brazoDer.png';
     } else if (vidas == 1) {
       document.getElementById('imagen').src = '../resources/images/piernaIzq.png';
     } else if (vidas == 0) {
       document.getElementById('imagen').src = '../resources/images/piernaDer.png';
     }
 
     // Bloqueamos la tecla deshabilitando el botón y cambiando su clase
     document.getElementById("tecla" + letraUsuario).disabled = true;
     document.getElementById("tecla" + letraUsuario).className = "teclaDeshabilitada";
 
     // Añadimos la tecla a un array para posteriormente trabajar con ellas
     teclasBloqueadas.push("tecla" + letraUsuario);
   }
 
   estadoPartida();
   actualizarDatosPantalla();
  }
 }
 
 /**
  * Función para comprobar si ya ha acabado el juego
  */
 function estadoPartida() {
   // Si no quedan guiones...
   if (!palabraMostrar.includes('_')) {
     // Bloqueamos todas las teclas para que el usuario no pueda clickar las restantes
     bloquearTodasTeclas()
 
    document.getElementById('imagen').src = '../resources/images/victoria.png';
    document.getElementById("nombrePelicula").textContent = pelicula.titulo;
    document.getElementById("descripcionPelicula").textContent = pelicula.descripcion;
    document.getElementById('imagenPelicula').src = pelicula.imagen;
    document.getElementById("actoresPelicula").textContent ="Actores: "+ pelicula.actor;
    document.getElementById("directorPelicula").textContent ="Director: "+ pelicula.director;
    document.getElementById("fechaPelicula").textContent ="Fecha lanzamiento: "+ pelicula.fecha;
    abrirModalVictoria();
    victoria.load();
    victoria.play();
    estado_victoria = true;
    subirEstadisticas();

   }
 
   // Si no quedan intentos lanzamos una alerta
   if (vidas == 0) {
     // Bloqueamos todas las teclas para que el usuario no pueda clickar las restantes
     bloquearTodasTeclas()
 
     // Igualamos palabraMostrar a palabraAdivinar para mostrar la palabra
     // a encontrar cuando hayamos perdido
     palabraMostrar = palabraAdivinar;
     document.getElementById("derrotaTitulo").textContent ="La palabra era "+ pelicula.titulo;
     estado_victoria = false;
     abrirModalDerrota();
     subirEstadisticas();
    
   }
 }
 
 /**
  * Función para bloquear todas las teclas del teclado, la usaremos cuando finalice la partida
  */
 function bloquearTodasTeclas() {
   // Guardamos en un array todos los botones con la clase tecla
   var teclas = document.querySelectorAll('button.tecla');
 
   // Recorremos la lista y vamos deshabilitando las teclas, cambiando su estilo
   // y las añadimos a la lista de teclas bloqueadas
   for (var i = 0; i < teclas.length; i++) {
     teclas[i].disabled = true;
     document.getElementById(teclas[i].id).className = "teclaDeshabilitada";
     teclasBloqueadas.push(teclas[i].id);
   }
 }
 
 
 
 /**
  * Función para activar la música de fondo, por defecto no se reproduce
  */
 function controlMusicaFondo() {
   // Si la música no está pausada...
   if (!fondo.paused) {
     // Paramos la música
     fondo.pause();
 
     // Cambiamos la imagen del altavoz
     nodoAltavoz.src = '../resources/images/volume-mute.png';
     // Si no está parada
   } else {
     // Reproducimos la música
     fondo.play();
 
     // Cambiamos la imagen del altavoz
     nodoAltavoz.src = '../resources/images/volume.png';
   }
 }
 
 // Al cargar la página hacemos que capture el evento de tecla pulsada
 window.onload = function() {
    //document.onkeydown = cogerTecladoFisico;
    document.onkeypress = cogerTecladoFisico;
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
  document.getElementById("solapaDiv").style.visibility = "hidden";
  document.getElementById("contenedor-victoria").style.visibility = "hidden";
}

function cerrarModalDerrota() {
  document.getElementById("solapaDiv").style.visibility = "hidden";
  document.getElementById("contenedor-derrota").style.visibility = "hidden";
}


 // Llamamos a iniciarPartida() para iniciar la partida
 iniciarPartida();